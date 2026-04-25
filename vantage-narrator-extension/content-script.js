// ============================================================
// Vantage Narrator — Content Script (DOM Interceptor)
// ============================================================
// Runs on every page. Scans for images missing alt-text,
// captures video frames, and speaks AI descriptions via TTS.
// ============================================================

(() => {
  'use strict';

  // ── State ──────────────────────────────────────────────────
  const processedImages = new WeakSet();
  let features = { imageDescriber: true, videoNarrator: true, spatialSummary: true };
  let speechRate = 1.0;
  let isProcessing = false;
  let sessionStats = { imagesDescribed: 0, videosDescribed: 0, layoutsSummarized: 0 };

  // ── Load Settings ──────────────────────────────────────────
  function loadSettings() {
    chrome.storage.local.get(['features', 'speechRate', 'sessionStats'], (result) => {
      if (result.features) features = result.features;
      if (result.speechRate) speechRate = result.speechRate;
      if (result.sessionStats) sessionStats = result.sessionStats;
    });
  }
  loadSettings();

  // Listen for settings changes in real-time
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.features) features = changes.features.newValue;
    if (changes.speechRate) speechRate = changes.speechRate.newValue;
  });

  // ── TTS Engine ─────────────────────────────────────────────
  function speak(text, prefix = '') {
    const fullText = prefix + text;

    // Try chrome.tts first (more robust for extensions)
    if (chrome.tts) {
      chrome.tts.stop();
      chrome.tts.speak(fullText, {
        rate: speechRate,
        enqueue: false,
        onEvent: (event) => {
          if (event.type === 'error') {
            console.warn('[Vantage] chrome.tts error, falling back to speechSynthesis');
            fallbackSpeak(fullText);
          }
        }
      });
    } else {
      fallbackSpeak(fullText);
    }
  }

  function fallbackSpeak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }

  // ── Image Analysis ─────────────────────────────────────────
  function isFilenameAlt(alt) {
    if (!alt) return true;
    // Detect filenames like "IMG_1234.jpg" or "upload_final_v2.png"
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff?)(\?.*)?$/i.test(alt.trim())
      || /^(image|img|photo|pic|graphic|untitled|screenshot|screen shot|dsc|dcim)/i.test(alt.trim())
      || /^[\d_\-]+$/i.test(alt.trim());
  }

  function needsDescription(img) {
    // Skip tiny images (probably tracking pixels or icons)
    if (img.naturalWidth < 50 || img.naturalHeight < 50) return false;
    // Skip images that are visually hidden
    if (img.offsetWidth === 0 || img.offsetHeight === 0) return false;
    // Skip decorative images explicitly marked
    if (img.getAttribute('role') === 'presentation') return false;
    if (img.getAttribute('aria-hidden') === 'true') return false;

    const alt = img.getAttribute('alt');
    // alt="" is intentionally decorative — respect that
    if (alt === '') return false;
    // No alt attribute at all, or it looks like a filename
    if (alt === null || isFilenameAlt(alt)) return true;

    return false;
  }

  async function fetchImageAsBase64(img) {
    try {
      // Method 1: Use canvas (works for same-origin or CORS-enabled images)
      const canvas = document.createElement('canvas');
      canvas.width = Math.min(img.naturalWidth, 1024);
      canvas.height = Math.min(img.naturalHeight, 1024);

      // Scale down if needed
      const scale = Math.min(1024 / img.naturalWidth, 1024 / img.naturalHeight, 1);
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch (e) {
      // Method 2: If tainted canvas, fetch the URL directly via extension context
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (fetchError) {
        console.warn('[Vantage] Could not fetch image:', fetchError);
        return null;
      }
    }
  }

  // ── Throttled Crawler & Priority ───────────────────────────
  let crawlerInterval = null;
  const CRAWL_DELAY = 12000; // 12 seconds per image (Stay safely under 15 RPM)
  const COOLDOWN_DELAY = 2000; // 2s cooldown for manual focus to stop mashing
  let lastRequestTime = 0;

  async function startCrawler() {
    if (crawlerInterval) return;
    crawlerInterval = setInterval(async () => {
      if (!features.imageDescriber || isProcessing) return;

      // Find THE NEXT image that needs description
      const img = Array.from(document.querySelectorAll('img')).find(needsDescription);
      if (img) {
        console.log('[Vantage] Background crawling next image...');
        await describeImage(img);
      }
    }, CRAWL_DELAY);
  }

  // ── Image Analysis ─────────────────────────────────────────
  async function describeImage(img, isPriority = false) {
    if (processedImages.has(img)) return true;
    
    // Cooldown check for manual triggers
    const now = Date.now();
    if (isPriority && (now - lastRequestTime < COOLDOWN_DELAY)) return false;
    
    isProcessing = true;
    lastRequestTime = now;
    img.style.outline = '2px dashed rgba(0, 212, 255, 0.4)';

    const base64 = await fetchImageAsBase64(img);
    if (!base64) {
      isProcessing = false;
      processedImages.add(img); // Don't try again if it fails fetch
      return false;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'DESCRIBE_IMAGE',
        imageData: base64
      });

      if (response?.success) {
        img.setAttribute('alt', response.description);
        img.setAttribute('data-vantage-described', 'true');
        img.style.outline = '2px solid rgba(0, 212, 255, 0.6)';
        processedImages.add(img);
        sessionStats.imagesDescribed++;
        chrome.storage.local.set({ sessionStats });
        if (isPriority) speak(response.description);
        return true;
      } else if (response?.error === 'SERVICE_BUSY') {
        if (isPriority) speak('Vantage is currently busy across the web. Retrying in a moment.');
        return false;
      }
    } catch (error) {
      console.error('[Vantage] Error:', error);
    } finally {
      isProcessing = false;
      img.style.outline = ''; // Clean up visual status
    }
    return false;
  }

  // ── Event Handlers ─────────────────────────────────────────
  function scanImages() {
    // Just start the crawler, it will handle the rest slowly
    startCrawler();
  }

  document.addEventListener('focusin', async (e) => {
    if (!features.imageDescriber) return;
    const img = e.target.tagName === 'IMG' ? e.target : e.target.querySelector?.('img');
    
    if (img) {
      if (img.hasAttribute('data-vantage-described')) {
        speak(img.getAttribute('alt'));
      } else if (needsDescription(img)) {
        speak('Analyzing image...');
        await describeImage(img, true);
      }
    }
  });

  // ── MutationObserver (Watch for Dynamic Content) ───────────
  const observer = new MutationObserver((mutations) => {
    if (!features.imageDescriber) return;

    let hasNewImages = false;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.tagName === 'IMG' || node.querySelectorAll?.('img').length > 0) {
          hasNewImages = true;
          break;
        }
      }
      if (hasNewImages) break;
    }

    if (hasNewImages) {
      // Debounce: wait 500ms before scanning
      clearTimeout(window._vantageDebounce);
      window._vantageDebounce = setTimeout(scanImages, 500);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // ── Video Frame Capture ────────────────────────────────────
  function captureVideoFrame() {
    const video = document.querySelector('video');
    if (!video || video.paused) {
      speak('No playing video found on this page.');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      // Cap at 720p for performance
      const scale = Math.min(1280 / video.videoWidth, 720 / video.videoHeight, 1);
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frameData = canvas.toDataURL('image/jpeg', 0.7);

      speak('Analyzing video frame...');

      chrome.runtime.sendMessage({
        type: 'DESCRIBE_VIDEO_FRAME',
        frameData
      }, (response) => {
        if (response?.success) {
          speak(response.description);
          sessionStats.videosDescribed++;
          chrome.storage.local.set({ sessionStats });
        } else {
          speak(response?.error === 'NO_API_KEY'
            ? 'Please set your API key in the Vantage Narrator extension popup.'
            : 'Could not describe the video frame.');
        }
      });
    } catch (error) {
      console.error('[Vantage] Video capture error:', error);
      speak('Could not capture the video frame due to security restrictions.');
    }
  }

  // ── Describe Focused Element ──────────────────────────────
  function describeFocusedElement() {
    const focused = document.activeElement;

    // If focused on or near a video, describe the frame
    if (focused?.tagName === 'VIDEO' || focused?.querySelector?.('video') || document.querySelector('video.html5-main-video')) {
      if (features.videoNarrator) {
        captureVideoFrame();
      } else {
        speak('Video narrator is disabled in settings.');
      }
      return;
    }

    // If focused on an image, describe it
    if (focused?.tagName === 'IMG') {
      if (features.imageDescriber) {
        processedImages.delete(focused); // Force re-describe
        describeImage(focused).then(() => {
          const alt = focused.getAttribute('alt');
          if (alt) speak(alt);
        });
      }
      return;
    }

    // If nothing specific is focused, try to describe the nearest image
    const nearestImg = focused?.querySelector?.('img') || focused?.closest?.('a')?.querySelector?.('img');
    if (nearestImg) {
      processedImages.delete(nearestImg);
      describeImage(nearestImg).then(() => {
        const alt = nearestImg.getAttribute('alt');
        if (alt) speak(alt);
      });
      return;
    }

    // For YouTube specifically — find the main video player
    const ytVideo = document.querySelector('video.html5-main-video') || document.querySelector('#movie_player video');
    if (ytVideo && !ytVideo.paused) {
      captureVideoFrame();
      return;
    }

    speak('No image or video is currently focused. Tab to an image or play a video, then press Alt+D.');
  }

  // ── Focus Handler (Announce Described Images) ─────────────
  document.addEventListener('focusin', (e) => {
    if (!features.imageDescriber) return;
    const img = e.target.tagName === 'IMG' ? e.target : e.target.querySelector?.('img');
    if (img && img.hasAttribute('data-vantage-described')) {
      speak(img.getAttribute('alt'));
    }
  });

  // ── Message Handler (from Service Worker) ──────────────────
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SPEAK_DESCRIPTION') {
      speak(message.description, message.prefix || '');
      sendResponse({ success: true });
    }

    if (message.type === 'DESCRIBE_FOCUSED') {
      describeFocusedElement();
      sendResponse({ success: true });
    }

    if (message.type === 'SCAN_NOW') {
      scanImages();
      sendResponse({ success: true });
    }
  });

  // ── Initial Scan ──────────────────────────────────────────
  // Wait a moment for the page to settle, then scan
  setTimeout(scanImages, 2000);

  console.log('[Vantage Narrator] Content script loaded. Alt+S = Spatial Summary, Alt+D = Describe Element');
})();
