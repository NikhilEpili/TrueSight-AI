/* global chrome */

let contextSelectedText = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'NEWSCHECK_FROM_CONTEXT') {
    contextSelectedText = (message.payload?.text || '').trim();
    sendResponse({ ok: true });
  }
});

// Helpers to extract page info
function getPageTextFallback() {
  const title = document.title || '';
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  return `${title}\n${metaDescription}`.trim() || document.body?.innerText?.slice(0, 2000) || '';
}

function getSelectedText() {
  const sel = window.getSelection()?.toString() || '';
  return sel.trim();
}

// Expose API for popup.js via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'NEWSCHECK_GET_TEXT') {
    const fromSelection = contextSelectedText || getSelectedText();
    const text = fromSelection || getPageTextFallback();
    // Clear once consumed if came from context menu
    contextSelectedText = '';
    sendResponse({ text });
  }
});


