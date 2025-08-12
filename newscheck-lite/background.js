/* global chrome */

const CONTEXT_MENU_ID = 'newscheck-lite-context';
let latestContextText = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'TrueSight Verifier',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID || !tab?.id) return;

  try {
    // Prefer the selection provided by the context menu info
    let text = (info.selectionText || '').trim();
    if (!text) {
      // Fallback: ask page to read current selection
      const [{ result: selectedText } = {}] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection()?.toString() || ''
      });
      text = (selectedText || '').trim();
    }

    // Keep a copy in background for the popup to retrieve even if it's opened in its own window
    latestContextText = text;

    // Send a message to the active tab's content script to store the text temporarily
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: 'NEWSCHECK_FROM_CONTEXT',
        payload: { text }
      },
      async () => {
        // Try to open the toolbar popup (works when pinned and supported)
        let opened = false;
        if (chrome.action?.openPopup) {
          try {
            await chrome.action.openPopup();
            opened = true;
          } catch (_) {
            opened = false;
          }
        }
        // Fallback: open a small popup window if toolbar popup didn't open
        if (!opened) {
          try {
            await chrome.windows.create({
              url: chrome.runtime.getURL('popup.html'),
              type: 'popup',
              width: 380,
              height: 360,
              focused: true
            });
          } catch (_) {
            // ignore
          }
        }
      }
    );
  } catch (err) {
    console.error('NewsCheck Lite context error:', err);
  }
});

// Allow popup to retrieve any pending context text without needing the page tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'NEWSCHECK_POPUP_NEEDS_CONTEXT') {
    const text = latestContextText || '';
    // clear after one read
    latestContextText = '';
    sendResponse({ text });
  }
});


