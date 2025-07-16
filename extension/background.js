chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "verify-text",
    title: "Verify with TrueSight (Text)",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "verify-image",
    title: "Verify with TrueSight (Image)",
    contexts: ["image"]
  });
  chrome.contextMenus.create({
    id: "verify-page",
    title: "Verify with TrueSight (Page/URL)",
    contexts: ["page"]
  });
});

// Helper to show notification
function showNotification(message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon128.png",
    title: "TrueSight Result",
    message: message
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "verify-text") {
    chrome.tabs.sendMessage(tab.id, { action: "getSelectedText" }, async (response) => {
      if (response && response.text) {
        try {
          const result = await fetch("http://localhost:8000/api/verify/text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: response.text })
          }).then(res => res.json());
          showNotification(result.verdict || JSON.stringify(result));
        } catch (e) {
          showNotification("Error: " + e.message);
        }
      } else {
        showNotification("No text selected.");
      }
    });
  } else if (info.menuItemId === "verify-image") {
    try {
      const imageUrl = info.srcUrl;
      const blob = await fetch(imageUrl).then(r => r.blob());
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");
      const result = await fetch("http://localhost:8000/api/verify/image", {
        method: "POST",
        body: formData
      }).then(res => res.json());
      showNotification(result.verdict || JSON.stringify(result));
    } catch (e) {
      showNotification("Error: " + e.message);
    }
  } else if (info.menuItemId === "verify-page") {
    try {
      const pageUrl = info.pageUrl;
      const result = await fetch("http://localhost:8000/api/verify/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pageUrl })
      }).then(res => res.json());
      showNotification(result.verdict || JSON.stringify(result));
    } catch (e) {
      showNotification("Error: " + e.message);
    }
  }
});

