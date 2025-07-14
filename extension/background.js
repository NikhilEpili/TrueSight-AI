// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'verify-selection',
    title: 'Verify with TrueSight',
    contexts: ['selection']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'verify-selection') {
    // Send selected text to content script
    chrome.tabs.sendMessage(tab.id, {
      action: 'verify-text',
      text: info.selectionText
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyze-text') {
    // Send text to backend API
    fetch('http://localhost:8000/api/news/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: request.text
      })
    })
    .then(response => response.json())
    .then(result => {
      // Send result back to content script
      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'show-result',
        result: result
      });
    })
    .catch(error => {
      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'show-error',
        error: error.message
      });
    });
  }
}); 