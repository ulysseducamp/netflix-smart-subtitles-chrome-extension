# Netflix Subtitle Downloader - Master Documentation

## Project Overview

This project is a Chrome extension designed to download subtitles from Netflix episodes and movies. The project consists of two main components:

1. **Active Development**: `my-netflix-extension/` - A new Chrome extension being developed from scratch
2. **Reference Implementation**: `reference/subadub/` - An existing, working Netflix subtitle extension (Subadub) used as reference

### Key Objectives
- Create a Chrome extension that can detect Netflix episode/movie pages
- Extract available subtitle tracks from Netflix's API
- Provide a user-friendly interface for subtitle selection and download
- Convert subtitles to SRT format for easy use
- Support multiple languages and subtitle types

### Current Status
- **Step 1**: ✅ Complete - Basic extension structure with Netflix page detection
- **Step 2**: ✅ Complete - Subtitle extraction and download functionality with immediate injection approach

## Tech Stack & Dependencies

### Chrome Extension Framework
- **Manifest Version**: 3 (required for Chrome 138+)
- **Browser Support**: Chrome/Chromium-based browsers
- **No External Dependencies**: Pure JavaScript, HTML, CSS

### Key Technologies
- **JavaScript**: ES6+ features, async/await, DOM manipulation
- **HTML5**: Popup interface, content script injection
- **CSS3**: Modern styling with flexbox, transitions
- **Chrome Extension APIs**: `chrome.tabs`, `chrome.runtime`, `chrome.storage`

## Project Architecture

### Folder Structure
```
prototype-extension-v6/
├── my-netflix-extension/          # Active development
│   ├── manifest.json             # Extension configuration (Manifest V3)
│   ├── popup.html               # Popup interface
│   ├── popup.css                # Styling for popup
│   ├── popup.js                 # Popup functionality & communication
│   ├── content-script.js        # Netflix page detection & content logic
│   └── README.md                # Development documentation
├── reference/                    # Reference implementation
│   └── subadub/                 # Subadub extension (working example)
│       ├── dist/                # Built extension files
│       │   ├── manifest.json    # Manifest V3 configuration
│       │   ├── content_script.js # Content script bridge
│       │   └── page_script.js   # Main functionality (injected)
│       ├── README.md            # Project documentation
│       └── archive.sh           # Build script
└── MASTER_DOC.md               # This file
```

### Core Module Interactions

#### Active Extension (`my-netflix-extension/`)
1. **Popup Interface** (`popup.html` + `popup.js`)
   - Communicates with content script via `chrome.tabs.sendMessage`
   - Handles user interactions and status display
   - Manages extension state and error handling

2. **Content Script** (`content-script.js`)
   - Injected into Netflix pages
   - Detects episode/movie pages using URL patterns and DOM elements
   - Responds to popup requests with page status and title information

3. **Manifest** (`manifest.json`)
   - Defines permissions, content script injection rules
   - Configures popup interface and extension metadata

#### Reference Extension (`reference/subadub/`)
1. **Content Script Bridge** (`content_script.js`)
   - Minimal script that injects main functionality
   - Serves as bridge between extension and page context

2. **Page Script** (`page_script.js`)
   - Contains all core functionality
   - Hijacks JSON methods to intercept Netflix API calls
   - Manages subtitle extraction, caching, and download

## Key Components & Files

### Active Extension Components

#### `manifest.json`
- **Purpose**: Extension configuration and permissions
- **Key Features**: Manifest V3, Netflix host permissions, popup configuration
- **Critical Settings**: Content script injection on Netflix pages

#### `content-script.js`
- **Purpose**: Netflix page detection and communication bridge with immediate injection
- **Key Functions**:
  - `injectPageScript()`: Immediately injects page script without polling
  - `getNetflixTitle()`: Extracts video title from DOM
  - `handlePopupMessage()`: Handles popup communication
- **Injection Strategy**: Immediate injection using Subadub's approach (`document.head.insertBefore`)

#### `popup.js`
- **Purpose**: Popup interface management and user interaction
- **Key Functions**:
  - `checkNetflixPage()`: Validates current page and communicates with content script
  - `showStatus()`: Displays user feedback messages
  - `handleDownloadClick()`: Handles download button interactions
- **Communication**: Uses `chrome.tabs.query` and `chrome.tabs.sendMessage`

#### `popup.html` + `popup.css`
- **Purpose**: User interface for subtitle selection and download
- **Features**: Dropdown for subtitle selection, download button, status messages
- **Styling**: Modern, clean interface with responsive design

### Reference Extension Components

#### `page_script.js` (Subadub)
- **Purpose**: Core subtitle extraction and processing logic
- **Key Techniques**:
  - JSON method hijacking (`JSON.stringify`, `JSON.parse`)
  - Netflix API interception via profile injection
  - WebVTT to SRT conversion
  - Subtitle caching and management
- **Critical Constants**:
  - `WEBVTT_FMT = 'webvtt-lssdh-ios8'`
  - `NETFLIX_PROFILES`: Array of Netflix content profiles
  - `POLL_INTERVAL_MS = 500`: Detection polling frequency

## Current Features

### ✅ Implemented (Step 1)

#### Netflix Page Detection
- **URL Pattern Detection**: Identifies `netflix.com/watch/*` URLs
- **DOM Element Validation**: Checks for video player and Netflix player container
- **Title Extraction**: Multiple fallback methods for getting video titles
- **Console Logging**: Comprehensive debugging output

#### Extension Infrastructure
- **Manifest V3 Compliance**: Compatible with Chrome 138+
- **Popup Interface**: Clean, functional UI with status feedback
- **Content Script Injection**: Automatic injection on Netflix pages
- **Error Handling**: Graceful handling of connection and detection errors

#### Communication System
- **Popup ↔ Content Script**: Bidirectional messaging via Chrome APIs
- **Status Management**: Real-time feedback for user actions
- **Error Recovery**: Automatic retry and user guidance

### ✅ Implemented (Step 2)

#### Immediate Injection System
- **Subadub-Inspired Approach**: Immediate page script injection without polling
- **JSON Hijacking**: Immediate interception of Netflix API calls
- **No Readiness Checks**: Inject first, ask questions later strategy
- **Robust Cache Management**: Persistent subtitle caching without aggressive clearing

#### Subtitle Extraction
- **API Interception**: Netflix subtitle API monitoring via JSON.parse/stringify hijacking
- **Track Discovery**: Available subtitle language detection from `timedtexttracks`
- **Format Support**: WebVTT and SRT format handling
- **Language Support**: Multiple subtitle language options with filtering

#### Download Functionality
- **SRT Conversion**: WebVTT to SRT format conversion with proper timestamps
- **File Generation**: Proper SRT file creation with intelligent naming
- **Download Trigger**: Automatic file download with blob-based mechanism
- **Caching**: Subtitle data caching for performance (trackListCache + webvttCache)

## Pending Tasks & Roadmap

### ✅ Completed (Step 2 Implementation)

#### Subtitle Extraction System
- [x] Implement JSON method hijacking (like Subadub)
- [x] Add Netflix profile injection for API interception
- [x] Create subtitle track discovery logic
- [x] Implement WebVTT format detection and parsing
- [x] Add subtitle language and type filtering

#### User Interface Enhancements
- [x] Populate dropdown with available subtitle tracks
- [x] Add language selection and preview functionality
- [x] Implement subtitle format selection (SRT, VTT)
- [x] Add download progress indicators
- [x] Create subtitle preview functionality

#### Download System
- [x] Implement WebVTT to SRT conversion
- [x] Add proper timestamp formatting
- [x] Create intelligent file naming system
- [x] Implement blob-based download mechanism
- [x] Add download error handling and retry logic

### 🔧 Technical Improvements

#### Code Quality
- [ ] Add comprehensive error handling for API failures
- [ ] Implement subtitle data validation
- [ ] Add retry mechanisms for network requests
- [ ] Create proper logging and debugging system
- [ ] Add unit tests for core functions

#### Performance Optimization
- [ ] Implement subtitle caching system
- [ ] Add lazy loading for subtitle data
- [ ] Optimize DOM queries and event handling
- [ ] Add memory management for large subtitle files

#### User Experience
- [ ] Add keyboard shortcuts (like Subadub's 'S' and 'C' keys)
- [ ] Implement auto-hide functionality for UI elements
- [ ] Add subtitle display overlay (optional feature)
- [ ] Create settings panel for user preferences

### 🐛 Known Issues

#### Current Limitations
- ~~Extension only detects pages but doesn't extract subtitles yet~~ ✅ **RESOLVED**
- ~~No subtitle data caching implemented~~ ✅ **RESOLVED**
- Limited error recovery for network issues
- No support for forced narratives or special subtitle types (intentionally filtered out)

#### Potential Challenges
- Netflix API changes could break subtitle extraction
- JSON hijacking technique might be blocked in future
- DOM structure dependencies could break with Netflix updates
- Manifest V3 limitations for certain advanced features

## AI Coding Guidelines

### Code Style & Conventions

#### JavaScript Standards
- **ES6+ Features**: Use modern JavaScript (async/await, arrow functions, destructuring)
- **Consistent Naming**: Use camelCase for variables/functions, PascalCase for classes
- **Clear Comments**: Document complex logic and business rules
- **Error Handling**: Always include try-catch blocks for async operations

#### Extension-Specific Patterns
- **Console Logging**: Use consistent prefix `"Netflix Subtitle Downloader:"` for all logs
- **Message Passing**: Use structured message objects with `action` and `data` properties
- **DOM Manipulation**: Use modern querySelector methods, avoid jQuery dependencies
- **Event Handling**: Use addEventListener with proper cleanup

#### File Organization
- **Separation of Concerns**: Keep UI logic in popup.js, page logic in content-script.js
- **Modular Functions**: Break complex operations into smaller, testable functions
- **Constants**: Define magic strings and numbers as named constants
- **Error Messages**: Use descriptive, user-friendly error messages

### Architectural Decisions

#### Communication Patterns
- **Popup → Content Script**: Use `chrome.tabs.sendMessage` with structured requests
- **Content Script → Popup**: Use `sendResponse` with success/error status
- **Error Handling**: Implement graceful degradation with user feedback

#### Netflix Integration
- **Detection Strategy**: Use multiple validation methods (URL + DOM + API)
- **API Interception**: Follow Subadub's JSON hijacking pattern
- **Caching**: Implement Map-based caching for performance
- **Polling**: Use reasonable intervals (500ms) for dynamic content detection

#### User Interface
- **Responsive Design**: Use flexbox and modern CSS for clean layouts
- **Status Feedback**: Provide clear, actionable error messages
- **Loading States**: Show appropriate loading indicators during operations
- **Accessibility**: Use semantic HTML and proper ARIA labels

### Documentation Standards

#### Code Comments
- **Function Documentation**: Explain purpose, parameters, and return values
- **Complex Logic**: Document business rules and edge cases
- **API Integration**: Explain Netflix-specific implementation details
- **Error Scenarios**: Document potential failure modes and recovery

#### User Documentation
- **Clear Instructions**: Provide step-by-step setup and usage guides
- **Troubleshooting**: Include common issues and solutions
- **Feature Explanations**: Describe what each feature does and why it's useful
- **Version Notes**: Document changes between versions

### Testing & Quality Assurance

#### Development Testing
- **Console Logging**: Use comprehensive logging for debugging
- **Error Simulation**: Test error scenarios and edge cases
- **Cross-Page Testing**: Verify functionality on different Netflix page types
- **Browser Compatibility**: Test on different Chrome versions

#### User Experience Testing
- **Interface Responsiveness**: Test popup behavior and error states
- **Network Conditions**: Test with slow connections and API failures
- **Content Variations**: Test with different subtitle types and languages
- **User Workflows**: Validate complete user journeys from detection to download

### Future Development Guidelines

#### Feature Implementation
- **Incremental Development**: Implement features in small, testable increments
- **Backward Compatibility**: Maintain compatibility with existing functionality
- **Performance Monitoring**: Monitor extension performance and memory usage
- **User Feedback**: Incorporate user testing and feedback into development

#### Code Maintenance
- **Regular Updates**: Keep dependencies and Chrome APIs up to date
- **Code Review**: Review all changes for security and performance implications
- **Documentation Updates**: Keep documentation current with code changes
- **Version Management**: Use semantic versioning for releases

## Recent Development History

### 2024-12-19: Immediate Injection Implementation
- **Major Change**: Adopted Subadub's immediate injection approach
- **Content Script**: Removed polling logic, implemented immediate page script injection
- **Page Script**: Started JSON hijacking immediately in IIFE, removed aggressive cache clearing
- **Result**: Fixed "No track list found" error by maintaining persistent subtitle cache

### 2024-12-18: Initial Subtitle Extraction
- **Implementation**: Added JSON hijacking for Netflix API interception
- **Features**: WebVTT to SRT conversion, subtitle caching, download functionality
- **Issue**: Cache was being cleared aggressively, causing download failures

---

**Last Updated**: 2024-12-19
**Version**: 2.0.0 (Step 2 Complete)
**Status**: Fully functional Netflix subtitle downloader
