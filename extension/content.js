// Create and inject result overlay
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'truesight-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    max-height: 80vh;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    overflow-y: auto;
    display: none;
  `;
  document.body.appendChild(overlay);
  return overlay;
}

// Create loading spinner
function createSpinner() {
  const spinner = document.createElement('div');
  spinner.id = 'truesight-spinner';
  spinner.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 10000;
    display: none;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(spinner);
  return spinner;
}

// Show analysis result
function showResult(result) {
  const overlay = document.getElementById('truesight-overlay') || createOverlay();
  
  overlay.innerHTML = `
    <div style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600;">TrueSight Analysis</h2>
        <button id="truesight-close" style="background: none; border: none; cursor: pointer; font-size: 20px;">&times;</button>
      </div>
      
      <div style="padding: 12px; background: ${result.is_fake ? '#fee2e2' : '#dcfce7'}; border-radius: 4px; margin-bottom: 16px;">
        <p style="margin: 0; color: ${result.is_fake ? '#991b1b' : '#166534'}; font-weight: 500;">
          ${result.is_fake ? '⚠️ Potential Misinformation' : '✓ No Issues Detected'}
        </p>
        <p style="margin: 4px 0 0 0; font-size: 14px;">
          Confidence: ${(result.confidence * 100).toFixed(1)}%
        </p>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">Analysis</h3>
        <p style="margin: 0; font-size: 14px;">${result.explanation}</p>
      </div>
      
      ${result.warnings && result.warnings.length > 0 ? `
        <div style="margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">Warnings</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
            ${result.warnings.map(warning => `<li style="color: #991b1b;">${warning}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${result.sources && result.sources.length > 0 ? `
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">Sources</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
            ${result.sources.map(source => `
              <li><a href="${source}" target="_blank" style="color: #4f46e5;">${source}</a></li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
  
  overlay.style.display = 'block';
  
  document.getElementById('truesight-close').addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

// Show error message
function showError(message) {
  const overlay = document.getElementById('truesight-overlay') || createOverlay();
  
  overlay.innerHTML = `
    <div style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 600;">Error</h2>
        <button id="truesight-close" style="background: none; border: none; cursor: pointer; font-size: 20px;">&times;</button>
      </div>
      
      <div style="padding: 12px; background: #fee2e2; border-radius: 4px;">
        <p style="margin: 0; color: #991b1b;">${message}</p>
      </div>
    </div>
  `;
  
  overlay.style.display = 'block';
  
  document.getElementById('truesight-close').addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

// Handle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const spinner = document.getElementById('truesight-spinner') || createSpinner();
  
  if (request.action === 'verify-text') {
    spinner.style.display = 'block';
    chrome.runtime.sendMessage({
      action: 'analyze-text',
      text: request.text
    });
  }
  else if (request.action === 'show-result') {
    spinner.style.display = 'none';
    showResult(request.result);
  }
  else if (request.action === 'show-error') {
    spinner.style.display = 'none';
    showError(request.error);
  }
}); 