// popup.js — Settings UI controller

const $ = id => document.getElementById(id);

const els = {
  toggleEnabled:    $('toggle-enabled'),
  statusDot:        $('status-dot'),
  statusText:       $('status-text'),
  radioOllama:      $('radio-ollama'),
  radioOpenrouter:  $('radio-openrouter'),
  ollamaConfig:     $('ollama-config'),
  openrouterConfig: $('openrouter-config'),
  ollamaUrl:        $('ollama-url'),
  ollamaModel:      $('ollama-model'),
  openrouterKey:    $('openrouter-key'),
  openrouterModel:  $('openrouter-model'),
  saveBtn:          $('save-btn'),
  saveFeedback:     $('save-feedback'),
};

// ── Load and render saved config ────────────────────────────
async function loadConfig() {
  const config = await chrome.storage.sync.get({
    enabled:           true,
    method:            'ollama',
    ollamaUrl:         'http://localhost:11434',
    ollamaModel:       'llava',
    openrouterApiKey:  '',
    openrouterModel:   'google/gemini-flash-1.5',
  });

  els.toggleEnabled.checked = config.enabled;
  els.ollamaUrl.value        = config.ollamaUrl;
  els.ollamaModel.value      = config.ollamaModel;
  els.openrouterKey.value    = config.openrouterApiKey;
  els.openrouterModel.value  = config.openrouterModel;

  (config.method === 'openrouter' ? els.radioOpenrouter : els.radioOllama).checked = true;
  updateMethodUI(config.method);
}

// ── Sync status from active YouTube tab ─────────────────────
async function syncStatus() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url?.includes('youtube.com')) {
      setStatus('inactive', 'Not on YouTube');
      return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, { action: 'GET_STATUS' });
    if (!response) throw new Error('No response');

    if (!response.enabled) {
      setStatus('inactive', 'Disabled');
    } else if (response.attached && response.audioOk) {
      setStatus('active', response.describing ? 'Narrating…' : 'Listening for silence');
    } else if (response.attached) {
      setStatus('warning', 'Video found — audio hook limited');
    } else {
      setStatus('warning', 'Waiting for video to load');
    }
  } catch (_) {
    setStatus('inactive', 'Not active on this page');
  }
}

function setStatus(type, text) {
  els.statusDot.className = `dot dot--${type}`;
  els.statusText.textContent = text;
}

// ── Method toggle UI ────────────────────────────────────────
function updateMethodUI(method) {
  const isOllama = method === 'ollama';
  els.ollamaConfig.classList.toggle('hidden', !isOllama);
  els.openrouterConfig.classList.toggle('hidden', isOllama);
}

els.radioOllama.addEventListener('change',      () => updateMethodUI('ollama'));
els.radioOpenrouter.addEventListener('change',  () => updateMethodUI('openrouter'));

// ── Enable/disable toggle ───────────────────────────────────
els.toggleEnabled.addEventListener('change', async () => {
  const enabled = els.toggleEnabled.checked;
  await chrome.storage.sync.set({ enabled });

  // Notify the content script in the active tab immediately
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.url?.includes('youtube.com')) {
      chrome.tabs.sendMessage(tab.id, { action: 'SET_ENABLED', value: enabled });
    }
  } catch (_) {}

  syncStatus();
});

// ── Save button ─────────────────────────────────────────────
els.saveBtn.addEventListener('click', async () => {
  const method = els.radioOpenrouter.checked ? 'openrouter' : 'ollama';

  await chrome.storage.sync.set({
    method,
    ollamaUrl:        els.ollamaUrl.value.trim() || 'http://localhost:11434',
    ollamaModel:      els.ollamaModel.value.trim() || 'llava',
    openrouterApiKey: els.openrouterKey.value.trim(),
    openrouterModel:  els.openrouterModel.value,
  });

  els.saveFeedback.classList.remove('hidden');
  setTimeout(() => els.saveFeedback.classList.add('hidden'), 2000);
});

// ── Init ────────────────────────────────────────────────────
loadConfig();
syncStatus();
setInterval(syncStatus, 3000); // poll status every 3 s while popup is open
