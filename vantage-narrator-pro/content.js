// ─────────────────────────────────────────────────────────────
// content.js — Vantage Narrator Pro
// Runs in the YouTube tab's isolated content script world.
// ─────────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ── Guard: prevent double-injection on hot reloads ──────────
  if (window.__VANTAGE_ACTIVE__) return;
  window.__VANTAGE_ACTIVE__ = true;

  // ── Configuration constants ─────────────────────────────────
  const CFG = {
    // dB level below which we consider audio "silent".
    // Full silence is -Infinity. Quiet dialogue is around -30 to -20 dB.
    // -45 dB catches true gaps without triggering on ambient sound.
    SILENCE_THRESHOLD_DB:     -45,

    // Audio must stay below threshold for this long before we act.
    SILENCE_DURATION_MS:     2500,

    // Minimum gap between successive AI descriptions.
    // Prevents hammering the API or spamming speech on a slow-talker gap.
    DESCRIPTION_COOLDOWN_MS: 8000,

    // dB level above which we consider audio "resumed" (for TTS interrupt).
    // Slightly higher than SILENCE_THRESHOLD to create hysteresis.
    RESUME_THRESHOLD_DB:     -35,

    // How often the silence detection loop samples the AnalyserNode (ms).
    ANALYSIS_INTERVAL_MS:    100,

    // Hard safety cap on any single TTS utterance length.
    MAX_TTS_DURATION_MS:     7000,
  };

  // ── Module state ────────────────────────────────────────────
  let audioCtx      = null;
  let analyser      = null;
  let sourceNode    = null;
  let videoEl       = null;

  let silenceStart      = null;   // timestamp when current silence began
  let lastDescTime      = 0;      // timestamp of last successful description
  let isDescribing      = false;  // true while TTS is speaking
  let analysisTimer     = null;   // setInterval handle for silence loop
  let ttsTimeoutId      = null;   // safety-cap setTimeout handle
  let isEnabled         = true;   // reflects popup toggle

  // ── Utility: convert AnalyserNode output to approximate dB ──
  //
  // getByteFrequencyData() returns Uint8Array values in [0, 255].
  // 255 maps to 0 dBFS; 0 maps to -Infinity.
  // We average all bins (full-spectrum energy) and convert.
  //
  function getVolumeDb() {
    if (!analyser) return -Infinity;
    const buf = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(buf);
    let sum = 0;
    for (let i = 0; i < buf.length; i++) sum += buf[i];
    const avg = sum / buf.length;
    if (avg === 0) return -Infinity;
    return 20 * Math.log10(avg / 255);
  }

  // ── AudioContext setup ───────────────────────────────────────
  //
  // We create one AudioContext per video, connect:
  //   MediaElementSource → AnalyserNode → AudioDestination
  //
  // The AnalyserNode taps the audio stream without modifying it.
  // Audio continues playing to the user's speakers normally.
  //
  // CORS note: createMediaElementSource() can throw if the browser
  // enforces strict CORS on the video element. Wrapped in try/catch;
  // see fallback strategy below.
  //
  function setupAudioPipeline(video) {
    teardown();

    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser  = audioCtx.createAnalyser();
      analyser.fftSize               = 2048;
      analyser.smoothingTimeConstant = 0.8;  // smooths out momentary spikes

      sourceNode = audioCtx.createMediaElementSource(video);
      sourceNode.connect(analyser);
      analyser.connect(audioCtx.destination);

      console.info('[Vantage] Audio pipeline connected via MediaElementSource.');
      return true;
    } catch (err) {
      console.warn('[Vantage] MediaElementSource failed — using muted/volume fallback.', err);
      // FALLBACK: We lose fine-grained dB analysis but can still detect
      // explicit mutes and volume=0 situations. Silence detection will be
      // coarser but the rest of the flow remains intact.
      audioCtx = null;
      analyser  = null;
      sourceNode = null;
      return false;
    }
  }

  // ── Fallback volume check (when AudioContext fails) ─────────
  //
  // Returns a pseudo-dB: -Infinity for muted/volume-0, 0 for playing.
  // Very coarse — but keeps the extension partially functional.
  //
  function getFallbackVolumeDb(video) {
    if (!video || video.paused || video.muted || video.volume === 0) {
      return -Infinity;
    }
    // Can't know actual dB without AnalyserNode — return a value
    // above threshold so silence detection never fires.
    return 0;
  }

  // ── Silence detection loop ───────────────────────────────────
  //
  // Runs on a fixed interval. Each tick:
  //  1. Reads current volume.
  //  2. If silent and silence has persisted long enough → trigger.
  //  3. If audio resumes while TTS is playing → interrupt TTS.
  //
  function startAnalysis() {
    if (analysisTimer) clearInterval(analysisTimer);
    silenceStart = null;

    analysisTimer = setInterval(() => {
      if (!videoEl || videoEl.paused || !isEnabled) {
        silenceStart = null;
        return;
      }

      const db = analyser
        ? getVolumeDb()
        : getFallbackVolumeDb(videoEl);

      const now = Date.now();

      if (db < CFG.SILENCE_THRESHOLD_DB) {
        // ── Silent branch ──────────────────────────────────────
        if (!silenceStart) {
          silenceStart = now;
        } else {
          const silenceDuration = now - silenceStart;
          const cooldownElapsed = now - lastDescTime >= CFG.DESCRIPTION_COOLDOWN_MS;

          if (
            silenceDuration  >= CFG.SILENCE_DURATION_MS &&
            cooldownElapsed  &&
            !isDescribing
          ) {
            silenceStart = null; // reset so we don't retrigger immediately
            triggerDescription();
          }
        }
      } else {
        // ── Audio active branch ────────────────────────────────
        silenceStart = null;

        // If TTS is currently speaking and real audio has come back,
        // interrupt immediately so narration doesn't talk over dialogue.
        if (isDescribing && db > CFG.RESUME_THRESHOLD_DB) {
          console.info('[Vantage] Audio resumed — interrupting TTS.');
          stopTTS();
        }
      }
    }, CFG.ANALYSIS_INTERVAL_MS);
  }

  function stopAnalysis() {
    if (analysisTimer) { clearInterval(analysisTimer); analysisTimer = null; }
  }

  // ── Teardown ─────────────────────────────────────────────────
  function teardown() {
    stopAnalysis();
    stopTTS();
    if (sourceNode)  { try { sourceNode.disconnect();  } catch (_) {} sourceNode = null; }
    if (analyser)    { try { analyser.disconnect();    } catch (_) {} analyser   = null; }
    if (audioCtx)    { try { audioCtx.close();         } catch (_) {} audioCtx   = null; }
  }

  // ── Frame capture + description trigger ─────────────────────
  //
  // Sends a message to the background service worker, which:
  //  1. Calls captureVisibleTab() — captures the full tab as JPEG.
  //  2. Forwards the base64 image to the configured AI (Ollama or OpenRouter).
  //  3. Returns { description: "..." }.
  //
  async function triggerDescription() {
    if (isDescribing) return;
    isDescribing  = true;
    lastDescTime  = Date.now();

    console.info('[Vantage] Silence threshold met — requesting AI description.');

    try {
      const response = await chrome.runtime.sendMessage({ action: 'CAPTURE_AND_DESCRIBE' });

      if (response?.description) {
        speakDescription(response.description);
      } else {
        console.warn('[Vantage] No description returned.', response);
        isDescribing = false;
      }
    } catch (err) {
      console.error('[Vantage] Background message failed:', err);
      isDescribing = false;
    }
  }

  // ── Text-to-Speech narration ─────────────────────────────────
  //
  // Uses the Web Speech API (window.speechSynthesis).
  // We call getVoices() lazily since it populates asynchronously.
  //
  let cachedVoice = null;

  function getBestVoice() {
    if (cachedVoice) return cachedVoice;
    const voices = window.speechSynthesis.getVoices();
    // Prefer Google's high-quality online voice, then any en-US voice.
    cachedVoice =
      voices.find(v => v.name === 'Google US English') ||
      voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
      voices.find(v => v.lang === 'en-US') ||
      voices[0] ||
      null;
    return cachedVoice;
  }

  // Repopulate voice cache when voices change (browser async load).
  window.speechSynthesis.onvoiceschanged = () => { cachedVoice = null; };

  function speakDescription(text) {
    stopTTS();

    const utterance        = new SpeechSynthesisUtterance(text);
    utterance.rate         = 1.05;    // slightly faster than default — concise delivery
    utterance.pitch        = 1.0;
    utterance.volume       = 0.95;
    const voice            = getBestVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      isDescribing = false;
      if (ttsTimeoutId) { clearTimeout(ttsTimeoutId); ttsTimeoutId = null; }
    };
    utterance.onerror = (e) => {
      console.warn('[Vantage] TTS error:', e.error);
      isDescribing = false;
    };

    window.speechSynthesis.speak(utterance);
    console.info(`[Vantage] TTS → "${text}"`);

    // Safety cap: cancel TTS if it somehow runs too long
    ttsTimeoutId = setTimeout(() => {
      if (isDescribing) {
        console.info('[Vantage] TTS safety cap reached — cancelling.');
        stopTTS();
      }
    }, CFG.MAX_TTS_DURATION_MS);
  }

  function stopTTS() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    isDescribing = false;
    if (ttsTimeoutId) { clearTimeout(ttsTimeoutId); ttsTimeoutId = null; }
  }

  // ── Video element detection ──────────────────────────────────
  //
  // YouTube uses several selectors depending on the page context.
  // We try from most specific to least specific.
  //
  function findVideo() {
    return (
      document.querySelector('video.html5-main-video') ||
      document.querySelector('#movie_player video') ||
      document.querySelector('.html5-video-container video') ||
      document.querySelector('video')
    );
  }

  // ── Attach to video ──────────────────────────────────────────
  //
  // Called on initial load and after every SPA navigation.
  // Returns true if successfully attached.
  //
  function attachToVideo() {
    const video = findVideo();
    if (!video) return false;

    // Already attached to this exact element? No-op.
    if (video === videoEl && audioCtx?.state === 'running') {
      return true;
    }

    videoEl = video;
    const ok = setupAudioPipeline(video);

    if (ok || videoEl) {
      // Even if AudioContext failed, start analysis (uses fallback).
      startAnalysis();
    }

    return true;
  }

  // Retry attach with exponential-ish backoff (YouTube renders async).
  function retryAttach(attempts = 5, delay = 800) {
    if (attempts === 0) {
      console.warn('[Vantage] Gave up finding video element after retries.');
      return;
    }
    setTimeout(() => {
      if (!attachToVideo()) retryAttach(attempts - 1, delay + 400);
    }, delay);
  }

  // ── YouTube SPA navigation detection ────────────────────────
  //
  // Three independent detection strategies for resilience:
  //
  //  A) YouTube's own event — most reliable when available.
  //  B) pushState intercept — catches programmatic navigation.
  //  C) MutationObserver  — catches DOM changes as last resort.
  //
  // All three call the same handler to avoid double-triggering
  // we wrap the re-init in a debounced function.
  //
  let navDebounceTimer = null;

  function onNavigationDetected() {
    if (navDebounceTimer) clearTimeout(navDebounceTimer);
    navDebounceTimer = setTimeout(() => {
      console.info('[Vantage] Navigation detected — reinitialising audio pipeline.');
      teardown();
      retryAttach();
    }, 600); // YouTube needs ~500 ms to insert the new video element
  }

  // A) YouTube's custom navigation event (fires after new page is painted)
  document.addEventListener('yt-navigate-finish', onNavigationDetected);

  // B) History API intercept for pushState
  //    We patch the native function once and dispatch a custom event.
  if (!window.__VANTAGE_PUSHSTATE_PATCHED__) {
    window.__VANTAGE_PUSHSTATE_PATCHED__ = true;
    const originalPushState = history.pushState.bind(history);
    history.pushState = function (...args) {
      originalPushState(...args);
      window.dispatchEvent(new CustomEvent('vantage:pushstate'));
    };
  }
  window.addEventListener('vantage:pushstate', onNavigationDetected);
  window.addEventListener('popstate', onNavigationDetected);

  // C) MutationObserver watching for new <video> elements
  const videoObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (
          node.nodeName  === 'VIDEO' ||
          (node.querySelector && node.querySelector('video'))
        ) {
          console.info('[Vantage] New <video> element detected in DOM.');
          onNavigationDetected();
          return;
        }
      }
    }
  });
  videoObserver.observe(document.documentElement, { childList: true, subtree: true });

  // ── AudioContext autoplay policy compliance ──────────────────
  //
  // Browsers suspend AudioContext until a user gesture occurs.
  // We listen for any click and resume the context if needed.
  //
  document.addEventListener('click', () => {
    if (audioCtx?.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }, { passive: true });

  // ── Message bus: popup <-> content script ───────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === 'GET_STATUS') {
      sendResponse({
        enabled:     isEnabled,
        attached:    !!videoEl,
        audioOk:     audioCtx?.state === 'running',
        describing:  isDescribing,
      });
      return true;
    }

    if (msg.action === 'SET_ENABLED') {
      isEnabled = msg.value;
      if (!isEnabled) {
        stopAnalysis();
        stopTTS();
      } else {
        startAnalysis();
      }
    }
  });

  // ── Extension state from storage ────────────────────────────
  chrome.storage.sync.get(['enabled'], (result) => {
    isEnabled = result.enabled !== false; // default: enabled
    if (isEnabled) {
      console.info('[Vantage Narrator Pro] Initialising...');
      retryAttach();
    }
  });

})(); // end IIFE
