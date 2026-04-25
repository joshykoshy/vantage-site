// ============================================================
// Vantage Narrator — Service Worker (API Bridge)
// ============================================================
// Handles all Gemini Vision API calls, screenshot capture,
// and command routing. No DOM access here — that's the
// content script's job.
// ============================================================

const GEMINI_MODEL = 'gemini-2.5-flash';

// ── Prompts ──────────────────────────────────────────────────
const PROMPTS = {
  image: `Concise accessibility description (max 15 words). Focus on key action/subject. No filler.`,

  video: `One-sentence action description (max 15 words). What is happening right now?`,

  spatial: `Identity the website and summarize the main headline or content visible. Then, briefly list layout (Nav, Search, Main section). Use simple conversational language. Max 50 words.`
};

// ── Gemini API Call ──────────────────────────────────────────
async function callGeminiVision(base64Image, mimeType, promptType) {
  const result = await chrome.storage.local.get(['apiKey']);
  const apiKey = result.apiKey;

  if (!apiKey) throw new Error('NO_API_KEY');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const cleanBase64 = base64Image.replace(/^data:[^;]+;base64,/, '');

  const payload = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeType || 'image/jpeg', data: cleanBase64 } },
        { text: PROMPTS[promptType] || PROMPTS.image }
      ]
    }],
    generationConfig: { maxOutputTokens: 60, temperature: 0.2 }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.status === 503 || response.status === 429) {
      throw new Error('SERVICE_BUSY');
    }

    if (!response.ok) throw new Error(`API_ERROR_${response.status}`);

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      if (data.promptFeedback?.blockReason) {
        throw new Error(`SAFETY_BLOCKED: ${data.promptFeedback.blockReason}`);
      }
      throw new Error('EMPTY_RESPONSE');
    }

    const text = data.candidates[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('NO_TEXT_IN_RESPONSE');

    return text.trim();
  } catch (err) {
    console.error('[Vantage SW] API Error:', err);
    throw err;
  }
}

// ── Screenshot Capture ───────────────────────────────────────
async function captureScreenshot() {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 70 }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(dataUrl);
      }
    });
  });
}

// ── Message Handler ──────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'DESCRIBE_IMAGE') {
    callGeminiVision(message.imageData, message.mimeType, 'image')
      .then(description => sendResponse({ success: true, description }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }

  if (message.type === 'DESCRIBE_VIDEO_FRAME') {
    callGeminiVision(message.frameData, 'image/png', 'video')
      .then(description => sendResponse({ success: true, description }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (message.type === 'SPATIAL_SUMMARY') {
    (async () => {
      try {
        const screenshot = await captureScreenshot();
        const description = await callGeminiVision(screenshot, 'image/jpeg', 'spatial');
        sendResponse({ success: true, description });
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true;
  }

  if (message.type === 'CHECK_API_KEY') {
    chrome.storage.local.get(['apiKey'], (result) => {
      sendResponse({ hasKey: !!result.apiKey });
    });
    return true;
  }
});

// ── Command Handler (Keyboard Shortcuts) ─────────────────────
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  if (command === 'spatial-summary') {
    // Capture screenshot from service worker, then send to content script
    try {
      const screenshot = await captureScreenshot();
      const description = await callGeminiVision(screenshot, 'image/jpeg', 'spatial');
      chrome.tabs.sendMessage(tab.id, {
        type: 'SPEAK_DESCRIPTION',
        description,
        prefix: 'Page layout: '
      });
    } catch (error) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'SPEAK_DESCRIPTION',
        description: `Error: ${error.message === 'NO_API_KEY' ? 'Please set your API key in the Vantage Narrator extension popup.' : error.message}`
      });
    }
  }

  if (command === 'describe-element') {
    chrome.tabs.sendMessage(tab.id, { type: 'DESCRIBE_FOCUSED' });
  }
});

// ── Install Handler ──────────────────────────────────────────
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default preferences
    chrome.storage.local.set({
      features: {
        imageDescriber: true,
        videoNarrator: true,
        spatialSummary: true
      },
      speechRate: 1.0,
      sessionStats: { imagesDescribed: 0, videosDescribed: 0, layoutsSummarized: 0 }
    });
    console.log('[Vantage Narrator] Extension installed. Please set your API key.');
  }
});
