// ============================================================
// Vantage Narrator — Popup Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('api-key-input');
  const saveKeyBtn = document.getElementById('save-key-btn');
  const keyStatus = document.getElementById('key-status');
  const statusIndicator = document.getElementById('status-indicator');

  const toggleImage = document.getElementById('toggle-image');
  const toggleVideo = document.getElementById('toggle-video');
  const toggleSpatial = document.getElementById('toggle-spatial');

  const speechRateSlider = document.getElementById('speech-rate');
  const rateValue = document.getElementById('rate-value');

  const statImages = document.getElementById('stat-images');
  const statVideos = document.getElementById('stat-videos');
  const statLayouts = document.getElementById('stat-layouts');

  // ── Load Saved Settings ────────────────────────────────
  chrome.storage.local.get(['apiKey', 'features', 'speechRate', 'sessionStats'], (result) => {
    // API Key
    if (result.apiKey) {
      apiKeyInput.value = '••••••••••••••••••••';
      apiKeyInput.dataset.saved = 'true';
      setStatus('active', 'API key configured');
    } else {
      setStatus('inactive', '');
    }

    // Feature toggles
    if (result.features) {
      toggleImage.checked = result.features.imageDescriber;
      toggleVideo.checked = result.features.videoNarrator;
      toggleSpatial.checked = result.features.spatialSummary;
    }

    // Speech rate
    if (result.speechRate) {
      speechRateSlider.value = result.speechRate;
      rateValue.textContent = `${result.speechRate}×`;
    }

    // Stats
    if (result.sessionStats) {
      statImages.textContent = result.sessionStats.imagesDescribed || 0;
      statVideos.textContent = result.sessionStats.videosDescribed || 0;
      statLayouts.textContent = result.sessionStats.layoutsSummarized || 0;
    }
  });

  // ── Save API Key ───────────────────────────────────────
  saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (!key || key === '••••••••••••••••••••') {
      showKeyStatus('Please enter a valid API key.', 'error');
      return;
    }

    // Quick validation: Gemini API keys typically start with 'AI'
    if (key.length < 20) {
      showKeyStatus('That key looks too short.', 'error');
      return;
    }

    chrome.storage.local.set({ apiKey: key }, () => {
      apiKeyInput.value = '••••••••••••••••••••';
      apiKeyInput.dataset.saved = 'true';
      showKeyStatus('API key saved successfully!', 'success');
      setStatus('active', 'API key configured');

      // Notify any active tab content scripts to re-scan
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'SCAN_NOW' }).catch(() => {});
        }
      });
    });
  });

  // Clear saved key indicator when user starts typing
  apiKeyInput.addEventListener('focus', () => {
    if (apiKeyInput.dataset.saved === 'true') {
      apiKeyInput.value = '';
      apiKeyInput.dataset.saved = 'false';
    }
  });

  // Allow Enter to save
  apiKeyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveKeyBtn.click();
  });

  // ── Feature Toggles ───────────────────────────────────
  function saveFeatures() {
    const features = {
      imageDescriber: toggleImage.checked,
      videoNarrator: toggleVideo.checked,
      spatialSummary: toggleSpatial.checked
    };
    chrome.storage.local.set({ features });
  }

  toggleImage.addEventListener('change', saveFeatures);
  toggleVideo.addEventListener('change', saveFeatures);
  toggleSpatial.addEventListener('change', saveFeatures);

  // ── Speech Rate ────────────────────────────────────────
  speechRateSlider.addEventListener('input', () => {
    const rate = parseFloat(speechRateSlider.value);
    rateValue.textContent = `${rate.toFixed(1)}×`;
    chrome.storage.local.set({ speechRate: rate });
  });

  // ── Helpers ────────────────────────────────────────────
  function showKeyStatus(msg, type) {
    keyStatus.textContent = msg;
    keyStatus.className = `key-status ${type}`;
    setTimeout(() => {
      keyStatus.textContent = '';
      keyStatus.className = 'key-status';
    }, 3000);
  }

  function setStatus(state, title) {
    statusIndicator.className = `status-dot status-${state}`;
    statusIndicator.title = title;
  }

  // ── Auto-refresh Stats ─────────────────────────────────
  // Poll stats every second while popup is open
  setInterval(() => {
    chrome.storage.local.get(['sessionStats'], (result) => {
      if (result.sessionStats) {
        statImages.textContent = result.sessionStats.imagesDescribed || 0;
        statVideos.textContent = result.sessionStats.videosDescribed || 0;
        statLayouts.textContent = result.sessionStats.layoutsSummarized || 0;
      }
    });
  }, 1000);
});
