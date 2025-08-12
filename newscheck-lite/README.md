## NewsCheck Lite (Chrome Extension - Manifest V3)

A minimal Chrome extension that sends selected text or the current page's title/description to a local server for a quick authenticity check, displaying a verdict and reason in the popup.

### Files
- `manifest.json`: MV3 manifest with permissions and background service worker
- `background.js`: Registers context menu and relays selected text
- `content.js`: Returns selected text or page info to popup
- `popup.html`, `popup.js`, `styles.css`: Simple UI and logic to call the server

### Mock Server
Located in `../mock-server`. It exposes `POST http://localhost:3000/api/check` returning a mock verdict.

### Setup
1. Install and run the mock server:
   ```bash
   cd ../mock-server
   npm install
   npm start
   ```

2. Load the extension in Chrome:
   - Open `chrome://extensions`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `newscheck-lite` folder

3. Use it:
   - Highlight text on any page, right-click → "Check authenticity". Click the extension icon to open the popup and see the result.
   - Or click the extension icon on any article page to check the title/description.

### Notes
- Ensure the mock server is running on `http://localhost:3000` before using the extension.
- All heavy processing is server-side and currently mocked; replace the `/api/check` implementation later with your real API.


