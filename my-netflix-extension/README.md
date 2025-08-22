# Netflix Subtitle Downloader - Step 2 Complete

This Chrome extension downloads subtitles from Netflix episodes and movies using JSON hijacking to intercept Netflix's subtitle API.

## Files Created

- `manifest.json` - Extension configuration (Manifest V3)
- `popup.html` - Popup interface
- `popup.css` - Styling for the popup
- `popup.js` - Popup functionality and communication
- `content-script.js` - Netflix page detection and content script logic
- `page-script.js` - **NEW** - Core subtitle extraction using JSON hijacking

## How to Test

### 1. Load the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" and select the `my-netflix-extension` folder
4. The extension should appear in your extensions list

### 2. Test Netflix Detection
1. Go to Netflix homepage (`netflix.com`) - extension should NOT activate
2. Go to a Netflix episode/movie page (`netflix.com/watch/*`) - extension should activate
3. Open browser console (F12) to see detection messages

### 3. Test Subtitle Extraction
1. Click the extension icon in your toolbar
2. On Netflix episode page: Should show "Found: [Title]" and available subtitle languages
3. Select a subtitle language from the dropdown
4. Click "Download" to download the SRT file

## Expected Console Messages

When on a Netflix episode page, you should see:
```
Netflix Subtitle Downloader: Content script loaded
Netflix Subtitle Downloader: On Netflix episode page, injecting page script
Netflix Subtitle Downloader: Page script loaded
Netflix Subtitle Downloader: Injecting WebVTT format into request
Netflix Subtitle Downloader: Captured Netflix API response
Netflix Subtitle Downloader: Extracting tracks for movie ID: [ID]
Netflix Subtitle Downloader: Available tracks updated: [tracks]
```

## Current Functionality (Step 2)

✅ Netflix page detection  
✅ Episode/movie page detection  
✅ JSON hijacking for subtitle extraction  
✅ Subtitle track discovery and caching  
✅ WebVTT to SRT conversion  
✅ Subtitle download functionality  
✅ Popup interface with language selection  
✅ Communication between all components  

## Technical Implementation

### JSON Hijacking
- **API Interception**: Hijacks `JSON.stringify` and `JSON.parse` to intercept Netflix API calls
- **WebVTT Injection**: Injects `webvtt-lssdh-ios8` format into Netflix profile requests
- **Data Capture**: Captures subtitle track metadata from API responses
- **Caching**: Implements track and WebVTT blob caching for performance

### Communication Flow
1. **Content Script** → Injects **Page Script** into Netflix page
2. **Page Script** → Hijacks JSON methods and captures subtitle data
3. **Page Script** → Sends subtitle tracks to **Content Script** via `window.postMessage`
4. **Content Script** → Forwards data to **Popup** via `chrome.tabs.sendMessage`
5. **Popup** → Displays available languages and handles download requests

### Subtitle Processing
- **Format Support**: WebVTT to SRT conversion
- **Text Processing**: Handles HTML tags, RTL text direction
- **File Naming**: Automatic filename generation with movie ID and language
- **Download**: Blob-based file download with proper MIME types

## Troubleshooting

- If you see "Could not establish connection" error, refresh the Netflix page
- Make sure you're on a Netflix episode page (URL contains `/watch/`)
- Check browser console for detailed error messages
- If no subtitles appear, wait a few seconds for Netflix to load subtitle data
- Some Netflix content may not have available subtitles

## Known Limitations

- Only works on Netflix episode/movie pages (not homepage or browse pages)
- Requires Netflix to have subtitle tracks available for the content
- Depends on Netflix's current API structure (may break with updates)
- Download happens in the page context (not extension context)

## Next Steps (Future Enhancements)

- Add subtitle preview functionality
- Support for forced narratives and special subtitle types
- Better error handling for API changes
- Keyboard shortcuts for quick access
- Settings panel for user preferences
