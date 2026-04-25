// ─────────────────────────────────────────────────────────────
// background.js — Vantage Narrator Pro Service Worker
// Handles privileged operations: tab capture + AI API calls.
// ─────────────────────────────────────────────────────────────

'use strict';

// ── Default configuration ───────────────────────────────────
//
// Stored in chrome.storage.sync so the popup can update them
// and the service worker reads the latest on each request.
//
const DEFAULTS = {
  enabled:            true,
  method:             'ollama',                // 'ollama' | 'openrouter'
  ollamaUrl:          'http://localhost:11434',
  ollamaModel:        'llava',
  openrouterApiKey:   '',
  openrouterModel:    'google/gemini-flash-1.5',
  prompt: (
    'You are an audio describer for blind and visually impaired viewers. ' +
    'In exactly one short sentence, describe the most important visual action ' +
    'happening in this video frame. Be concise, specific, and start with a verb.'
  ),
};

// ── Utility: load config from storage ───────────────────────
function loadConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULTS, (items) => resolve(items));
  });
}

// ── Main message handler ─────────────────────────────────────
//
// Content script sends { action: 'CAPTURE_AND_DESCRIBE' }.
// We must return true from the listener to keep the channel
// open for the async response.
//
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== 'CAPTURE_AND_DESCRIBE') return false;

  const tabId = sender.tab?.id;
  if (!tabId) {
    sendResponse({ error: 'No tab ID available.' });
    return false;
  }

  handleCaptureAndDescribe(tabId)
    .then(result => sendResponse(result))
    .catch(err => {
      console.error('[Vantage BG]', err);
      sendResponse({ error: err.message });
    });

  return true; // keep channel open for async response
});

// ── Step 1: Capture the visible tab ─────────────────────────
//
// captureVisibleTab() takes a screenshot of the entire rendered
// viewport at the compositor layer — completely bypasses all
// CORS restrictions that would block canvas-based frame extraction.
//
// Returns a data URL: "data:image/jpeg;base64,..."
//
function captureTab(tabId) {
  return new Promise((resolve, reject) => {
    // We need the windowId. Get it from the tab object.
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError || !tab) {
        return reject(new Error(`Tab lookup failed: ${chrome.runtime.lastError?.message}`));
      }

      chrome.tabs.captureVisibleTab(
        tab.windowId,
        { format: 'jpeg', quality: 65 },  // JPEG 65% quality — good enough for VLMs, smaller payload
        (dataUrl) => {
          if (chrome.runtime.lastError) {
            return reject(new Error(`captureVisibleTab failed: ${chrome.runtime.lastError.message}`));
          }
          resolve(dataUrl);
        }
      );
    });
  });
}

// ── Orchestrator ─────────────────────────────────────────────
async function handleCaptureAndDescribe(tabId) {
  const [imageDataUrl, config] = await Promise.all([
    captureTab(tabId),
    loadConfig(),
  ]);

  // Strip the data-URL header to get the raw base64 string.
  // Ollama expects the raw base64; OpenRouter accepts the full data URL.
  const base64Image = imageDataUrl.split(',')[1];

  let description;
  if (config.method === 'ollama') {
    description = await describeWithOllama(base64Image, config);
  } else {
    description = await describeWithOpenRouter(imageDataUrl, config);
  }

  return { description };
}

// ── Method A: Ollama (local, zero-latency) ───────────────────
//
// POST to the local Ollama instance.
// The `images` array holds raw base64 strings (no data-URL prefix).
// `stream: false` makes Ollama return the full response at once
// rather than streaming tokens — simpler for our use case.
//
async function describeWithOllama(base64Image, config) {
  const url = `${config.ollamaUrl.replace(/\/$/, '')}/api/generate`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:  config.ollamaModel,
      prompt: config.prompt,
      images: [base64Image],
      stream: false,
    }),
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    throw new Error(`Ollama ${resp.status}: ${body.slice(0, 120)}`);
  }

  const data = await resp.json();

  // Ollama returns { response: "...", done: true, ... }
  const text = data.response?.trim();
  if (!text) throw new Error('Ollama returned an empty response.');

  return sanitizeDescription(text);
}

// ── Method B: OpenRouter (cloud, high fidelity) ──────────────
//
// OpenRouter exposes an OpenAI-compatible messages endpoint.
// Vision models expect the image as an image_url content block.
// We pass the full data URL (including MIME prefix) which most
// OpenRouter vision models accept directly.
//
async function describeWithOpenRouter(imageDataUrl, config) {
  if (!config.openrouterApiKey) {
    throw new Error('OpenRouter API key not set. Configure it in the extension popup.');
  }

  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'HTTP-Referer':  'chrome-extension://vantage-narrator-pro',
      'X-Title':       'Vantage Narrator Pro',
    },
    body: JSON.stringify({
      model: config.openrouterModel,
      max_tokens: 80,
      messages: [
        {
          role: 'user',
          content: [
            {
              type:      'image_url',
              image_url: { url: imageDataUrl, detail: 'low' }, // 'low' = faster + cheaper for single-sentence answers
            },
            {
              type: 'text',
              text: config.prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    throw new Error(`OpenRouter ${resp.status}: ${body.slice(0, 200)}`);
  }

  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('OpenRouter returned an empty response.');

  return sanitizeDescription(text);
}

// ── Sanitize AI output before sending to TTS ────────────────
//
// AI models sometimes return markdown, extra whitespace, or
// multi-sentence responses despite the prompt asking for one sentence.
// We strip formatting and take only the first sentence.
//
function sanitizeDescription(text) {
  return text
    .replace(/[*_`#]/g, '')           // strip markdown characters
    .replace(/\s+/g, ' ')             // collapse whitespace
    .trim()
    .split(/(?<=[.!?])\s+/)[0]        // take first sentence only
    .trim();
}
