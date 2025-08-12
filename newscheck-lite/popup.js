/* global chrome */

// Point to FastAPI backend
const API_URL = 'http://localhost:8000/api/news/text';

const verdictEl = document.getElementById('verdict');
const reasonEl = document.getElementById('reason');
const retryBtn = document.getElementById('retry');

function setUI(verdict, reason) {
  verdictEl.textContent = verdict || 'Unclear';
  reasonEl.textContent = reason || 'No explanation available.';

  verdictEl.classList.remove('true', 'false', 'unclear');
  const cls = (verdict || 'Unclear').toLowerCase();
  if (cls === 'true') verdictEl.classList.add('true');
  else if (cls === 'false') verdictEl.classList.add('false');
  else verdictEl.classList.add('unclear');
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getTextFromPage() {
  // First, ask background if there is context text queued (works even if opened as a separate window)
  const fromBackground = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'NEWSCHECK_POPUP_NEEDS_CONTEXT' }, (resp) => {
      resolve(resp?.text || '');
    });
  });
  if (fromBackground) return fromBackground;

  // Otherwise talk to the active tab's content script
  const tab = await getActiveTab();
  if (!tab?.id) return '';
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tab.id, { type: 'NEWSCHECK_GET_TEXT' }, (resp) => {
      resolve(resp?.text || '');
    });
  });
}

async function checkText(text) {
  const payload = { text: (text || '').slice(0, 5000) };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Server error');
  const data = await res.json();
  // Map backend response (is_fake, confidence, explanation) to verdict and reason
  const verdict = data?.is_fake === true ? 'False' : data?.is_fake === false ? 'True' : 'Unclear';
  const confidencePct = typeof data?.confidence === 'number' ? Math.round(data.confidence * 100) : undefined;
  const reason = data?.explanation ? `${data.explanation}${confidencePct != null ? ` (Confidence: ${confidencePct}%)` : ''}` : 'No explanation available.';
  return { verdict, reason };
}

async function runCheck() {
  setUI('Unclear', 'Analyzing…');
  try {
    const text = await getTextFromPage();
    if (!text) throw new Error('No text found on page.');
    const result = await checkText(text);
    setUI(result.verdict, result.reason);
  } catch (e) {
    console.error(e);
    setUI('Unclear', 'Failed to analyze. Ensure mock server is running.');
  }
}

retryBtn.addEventListener('click', runCheck);

// Run on popup open
runCheck();


