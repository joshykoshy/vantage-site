// ============================================================
// Vantage Narrator — Offscreen Document Script
// ============================================================
// Provides a DOM environment for canvas-based image processing
// that can't be done in the service worker.
// ============================================================

const canvas = document.getElementById('processing-canvas');
const ctx = canvas.getContext('2d');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RESIZE_IMAGE') {
    resizeImage(message.dataUrl, message.maxWidth, message.maxHeight)
      .then(result => sendResponse({ success: true, dataUrl: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (message.type === 'PROCESS_SCREENSHOT') {
    processScreenshot(message.dataUrl)
      .then(result => sendResponse({ success: true, dataUrl: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

async function resizeImage(dataUrl, maxWidth = 1024, maxHeight = 1024) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => reject(new Error('Failed to load image for resizing'));
    img.src = dataUrl;
  });
}

async function processScreenshot(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Increase resolution to 1920px for better text readability
      const maxWidth = 1920;
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Increase quality to 0.85 for clearer text
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => reject(new Error('Failed to process screenshot'));
    img.src = dataUrl;
  });
}
