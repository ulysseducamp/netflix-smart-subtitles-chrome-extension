# Netflix Subtitle Downloader - Master Documentation

## Project Overview

This project is a Chrome extension designed to download subtitles from Netflix episodes and movies. The project consists of three main components:

1. **Active Development (JavaScript)**: `my-netflix-extension/` - A fully functional Chrome extension with subtitle extraction and download capabilities
2. **TypeScript Version**: `my-netflix-extension-ts/` - A TypeScript rewrite with modern build system and type safety
3. **Reference Implementation**: `reference/subadub/` - An existing, working Netflix subtitle extension (Subadub) used as reference

### Key Objectives
- Create a Chrome extension that can detect Netflix episode/movie pages
- Extract available subtitle tracks from Netflix's API
- Provide a user-friendly interface for subtitle selection and download
- Convert subtitles to SRT format for easy use
- Support multiple languages and subtitle types
- Maintain type safety and modern development practices (TypeScript version)

### Current Status
- **Step 1**: ✅ Complete - Basic extension structure with Netflix page detection
- **Step 2**: ✅ Complete - Subtitle extraction and download functionality with immediate injection approach
- **Step 3**: ✅ Complete - TypeScript version with modern build system and enhanced type safety

## Tech Stack & Dependencies

### Chrome Extension Framework
- **Manifest Version**: 3 (required for Chrome 138+)
- **Browser Support**: Chrome/Chromium-based browsers
- **JavaScript Version**: ES6+ features, async/await, DOM manipulation
- **TypeScript Version**: Modern TypeScript with strict type checking

### Key Technologies
- **JavaScript/TypeScript**: ES6+ features, async/await, DOM manipulation, type safety
- **HTML5**: Popup interface, content script injection
- **CSS3**: Modern styling with flexbox, transitions
- **Chrome Extension APIs**: `chrome.tabs`, `chrome.runtime`, `chrome.storage`
- **Build Tools**: Webpack, TypeScript compiler (TypeScript version)

## Project Architecture

### Folder Structure
```
prototype-extension-v6/
├── my-netflix-extension/          # Active development (JavaScript)
│   ├── manifest.json             # Extension configuration (Manifest V3)
│   ├── popup.html               # Popup interface
│   ├── popup.css                # Styling for popup
│   ├── popup.js                 # Popup functionality & communication
│   ├── content-script.js        # Netflix page detection & content logic
│   ├── page-script.js           # JSON hijacking & subtitle extraction
│   └── README.md                # Development documentation
├── my-netflix-extension-ts/      # TypeScript version
│   ├── src/                     # TypeScript source files
│   │   ├── popup/               # Popup interface (TypeScript)
│   │   ├── content-script.ts    # Content script (TypeScript)
│   │   ├── page-script.ts       # Page script (TypeScript)
│   │   └── types/               # TypeScript type definitions
│   ├── dist/                    # Built extension files
│   ├── package.json             # Dependencies and build scripts
│   ├── webpack.config.js        # Webpack configuration
│   ├── tsconfig.json            # TypeScript configuration
│   └── README.md                # TypeScript version documentation
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
   - Provides subtitle selection dropdown and download functionality

2. **Content Script** (`content-script.js`)
   - Injected into Netflix pages
   - Detects episode/movie pages using URL patterns and DOM elements
   - Responds to popup requests with page status and title information
   - Manages communication between popup and page script
   - Implements immediate page script injection

3. **Page Script** (`page-script.js`)
   - Contains all core subtitle extraction functionality
   - Implements JSON hijacking to intercept Netflix API calls
   - Manages subtitle extraction, caching, and download
   - Converts WebVTT to SRT format using TextTrack API
   - Handles subtitle track discovery and filtering

4. **Manifest** (`manifest.json`)
   - Defines permissions, content script injection rules
   - Configures popup interface and extension metadata

#### TypeScript Extension (`my-netflix-extension-ts/`)
1. **Source Structure** (`src/`)
   - TypeScript implementations of all extension components
   - Type definitions for Netflix API responses
   - Modern build system with Webpack
   - Enhanced type safety and development experience

2. **Build System**
   - Webpack for bundling and optimization
   - TypeScript compiler for type checking
   - Development and production build configurations
   - Hot reloading for development

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
  - `handlePageScriptMessage()`: Processes messages from page script
- **Injection Strategy**: Immediate injection using Subadub's approach (`document.head.insertBefore`)

#### `page-script.js`
- **Purpose**: Core subtitle extraction and processing logic
- **Key Functions**:
  - `extractMovieTextTracks()`: Processes Netflix API responses for subtitle data
  - `convertWebVTTToSRTUsingTextTrack()`: Converts WebVTT to SRT using browser TextTrack API
  - `downloadSubtitle()`: Handles subtitle download and file generation
  - JSON hijacking for Netflix API interception
- **Key Techniques**:
  - JSON method hijacking (`JSON.stringify`, `JSON.parse`)
  - Netflix API interception via profile injection
  - WebVTT to SRT conversion using TextTrack API
  - Subtitle caching and management
- **Critical Constants**:
  - `WEBVTT_FMT = 'webvtt-lssdh-ios8'`
  - `NETFLIX_PROFILES`: Array of Netflix content profiles
  - `POLL_INTERVAL_MS = 500`: Detection polling frequency

#### `popup.js`
- **Purpose**: Popup interface management and user interaction
- **Key Functions**:
  - `checkNetflixPage()`: Validates current page and communicates with content script
  - `loadSubtitles()`: Requests and displays available subtitle tracks
  - `populateSubtitleDropdown()`: Populates dropdown with available tracks
  - `handleDownloadClick()`: Handles download button interactions
  - `showStatus()`: Displays user feedback messages
- **Communication**: Uses `chrome.tabs.query` and `chrome.tabs.sendMessage`

#### `popup.html` + `popup.css`
- **Purpose**: User interface for subtitle selection and download
- **Features**: Dropdown for subtitle selection, download button, status messages
- **Styling**: Modern, clean interface with responsive design

### TypeScript Extension Components

#### `src/content-script.ts`
- **Purpose**: TypeScript version of content script with enhanced type safety
- **Key Features**: Same functionality as JavaScript version with type definitions
- **Build Integration**: Compiled to JavaScript for Chrome extension compatibility

#### `src/page-script.ts`
- **Purpose**: TypeScript version of page script with Netflix API type definitions
- **Key Features**: Enhanced error handling and type safety for subtitle extraction
- **Type Definitions**: Comprehensive types for Netflix API responses

#### `src/popup/popup.ts`
- **Purpose**: TypeScript version of popup interface with type-safe communication
- **Key Features**: Same functionality as JavaScript version with improved development experience

#### `src/types/netflix.d.ts`
- **Purpose**: TypeScript type definitions for Netflix API responses
- **Key Types**: Movie data, subtitle tracks, API responses, and extension messages

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
- **Closed Captions**: Support for closed captions when available

#### Download Functionality
- **SRT Conversion**: WebVTT to SRT format conversion with proper timestamps
- **File Generation**: Proper SRT file creation with intelligent naming
- **Download Trigger**: Automatic file download with blob-based mechanism
- **Caching**: Subtitle data caching for performance (trackListCache + webvttCache)
- **TextTrack API**: Uses browser's TextTrack API for reliable WebVTT parsing

### ✅ Implemented (Step 3)

#### TypeScript Version
- **Type Safety**: Comprehensive TypeScript implementation with strict type checking
- **Modern Build System**: Webpack-based build with development and production configurations
- **Enhanced Development Experience**: Better IDE support, error detection, and refactoring
- **Type Definitions**: Complete Netflix API type definitions for better development
- **Build Commands**: Development, production, and type-checking commands

#### Enhanced Error Handling
- **Comprehensive Error Recovery**: Better error handling throughout the extension
- **User-Friendly Messages**: Clear error messages and status updates
- **Graceful Degradation**: Extension continues to work even with partial failures
- **Debugging Support**: Enhanced logging and debugging capabilities

## Pending Tasks & Roadmap

### ✅ Completed (All Steps)

#### Subtitle Extraction System
- [x] Implement JSON method hijacking (like Subadub)
- [x] Add Netflix profile injection for API interception
- [x] Create subtitle track discovery logic
- [x] Implement WebVTT format detection and parsing
- [x] Add subtitle language and type filtering
- [x] Implement TextTrack API-based conversion

#### User Interface Enhancements
- [x] Populate dropdown with available subtitle tracks
- [x] Add language selection and preview functionality
- [x] Implement subtitle format selection (SRT, VTT)
- [x] Add download progress indicators
- [x] Create subtitle preview functionality
- [x] Enhanced status messaging and error handling

#### Download System
- [x] Implement WebVTT to SRT conversion
- [x] Add proper timestamp formatting
- [x] Create intelligent file naming system
- [x] Implement blob-based download mechanism
- [x] Add download error handling and retry logic
- [x] Robust caching system for performance

#### TypeScript Implementation
- [x] Complete TypeScript rewrite with type safety
- [x] Modern build system with Webpack
- [x] Comprehensive type definitions
- [x] Development and production build configurations
- [x] Enhanced development experience

### 🔧 Future Enhancements

#### Code Quality
- [ ] Add comprehensive unit tests for core functions
- [ ] Implement integration tests for extension workflow
- [ ] Add automated testing pipeline
- [ ] Implement code coverage reporting
- [ ] Add linting and code formatting rules

#### Performance Optimization
- [ ] Implement lazy loading for subtitle data
- [ ] Add memory management for large subtitle files
- [ ] Optimize DOM queries and event handling
- [ ] Add performance monitoring and metrics

#### User Experience
- [ ] Add keyboard shortcuts (like Subadub's 'S' and 'C' keys)
- [ ] Implement auto-hide functionality for UI elements
- [ ] Add subtitle display overlay (optional feature)
- [ ] Create settings panel for user preferences
- [ ] Add subtitle preview functionality
- [ ] Implement batch download for multiple episodes

#### Advanced Features
- [ ] Support for forced narratives and special subtitle types
- [ ] Add subtitle editing capabilities
- [ ] Implement subtitle synchronization tools
- [ ] Add support for other streaming platforms
- [ ] Create subtitle format conversion utilities

### 🐛 Known Issues

#### Current Limitations
- Limited error recovery for network issues (improved but could be enhanced)
- No support for forced narratives or special subtitle types (intentionally filtered out)
- No batch download functionality for multiple episodes

#### Potential Challenges
- Netflix API changes could break subtitle extraction
- JSON hijacking technique might be blocked in future
- DOM structure dependencies could break with Netflix updates
- Manifest V3 limitations for certain advanced features

## AI Coding Guidelines

### Code Style & Conventions

#### JavaScript/TypeScript Standards
- **ES6+ Features**: Use modern JavaScript/TypeScript (async/await, arrow functions, destructuring)
- **Consistent Naming**: Use camelCase for variables/functions, PascalCase for classes
- **Clear Comments**: Document complex logic and business rules
- **Error Handling**: Always include try-catch blocks for async operations
- **Type Safety**: Use TypeScript for new development, maintain type definitions

#### Extension-Specific Patterns
- **Console Logging**: Use consistent prefix `"Netflix Subtitle Downloader:"` for all logs
- **Message Passing**: Use structured message objects with `action` and `data` properties
- **DOM Manipulation**: Use modern querySelector methods, avoid jQuery dependencies
- **Event Handling**: Use addEventListener with proper cleanup
- **Type Definitions**: Maintain comprehensive TypeScript types for all APIs

#### File Organization
- **Separation of Concerns**: Keep UI logic in popup.js/ts, page logic in content-script.js/ts
- **Modular Functions**: Break complex operations into smaller, testable functions
- **Constants**: Define magic strings and numbers as named constants
- **Error Messages**: Use descriptive, user-friendly error messages
- **Type Definitions**: Organize types in dedicated files for better maintainability

### Architectural Decisions

#### Communication Patterns
- **Popup → Content Script**: Use `chrome.tabs.sendMessage` with structured requests
- **Content Script → Popup**: Use `sendResponse` with success/error status
- **Content Script ↔ Page Script**: Use `window.postMessage` for cross-context communication
- **Error Handling**: Implement graceful degradation with user feedback

#### Netflix Integration
- **Detection Strategy**: Use multiple validation methods (URL + DOM + API)
- **API Interception**: Follow Subadub's JSON hijacking pattern
- **Caching**: Implement Map-based caching for performance
- **Injection Strategy**: Use immediate injection for reliable detection
- **TextTrack API**: Use browser's native TextTrack API for WebVTT parsing

#### User Interface
- **Responsive Design**: Use flexbox and modern CSS for clean layouts
- **Status Feedback**: Provide clear, actionable error messages
- **Loading States**: Show appropriate loading indicators during operations
- **Accessibility**: Use semantic HTML and proper ARIA labels
- **Type Safety**: Use TypeScript for better development experience

### Documentation Standards

#### Code Comments
- **Function Documentation**: Explain purpose, parameters, and return values
- **Complex Logic**: Document business rules and edge cases
- **API Integration**: Explain Netflix-specific implementation details
- **Error Scenarios**: Document potential failure modes and recovery
- **Type Definitions**: Document complex types and their relationships

#### User Documentation
- **Clear Instructions**: Provide step-by-step setup and usage guides
- **Troubleshooting**: Include common issues and solutions
- **Feature Explanations**: Describe what each feature does and why it's useful
- **Version Notes**: Document changes between versions
- **Build Instructions**: Provide clear build and development setup guides

### Testing & Quality Assurance

#### Development Testing
- **Console Logging**: Use comprehensive logging for debugging
- **Error Simulation**: Test error scenarios and edge cases
- **Cross-Page Testing**: Verify functionality on different Netflix page types
- **Browser Compatibility**: Test on different Chrome versions
- **Type Checking**: Use TypeScript compiler for type safety validation

#### User Experience Testing
- **Interface Responsiveness**: Test popup behavior and error states
- **Network Conditions**: Test with slow connections and API failures
- **Content Variations**: Test with different subtitle types and languages
- **User Workflows**: Validate complete user journeys from detection to download
- **Build Process**: Test development and production builds

### Future Development Guidelines

#### Feature Implementation
- **Incremental Development**: Implement features in small, testable increments
- **Backward Compatibility**: Maintain compatibility with existing functionality
- **Performance Monitoring**: Monitor extension performance and memory usage
- **User Feedback**: Incorporate user testing and feedback into development
- **Type Safety**: Maintain comprehensive TypeScript types for all new features

#### Code Maintenance
- **Regular Updates**: Keep dependencies and Chrome APIs up to date
- **Code Review**: Review all changes for security and performance implications
- **Documentation Updates**: Keep documentation current with code changes
- **Version Management**: Use semantic versioning for releases
- **Build System**: Maintain and update build configurations as needed

## Recent Development History

### 2025-08-25: TypeScript Version Completion
- **Major Addition**: Complete TypeScript version with modern build system
- **Features**: Type safety, Webpack build system, enhanced development experience
- **Architecture**: Parallel development with JavaScript version
- **Result**: Professional-grade extension with modern development practices

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

**Last Updated**: 2025-08-25
**Version**: 3.0.0 (All Steps Complete)
**Status**: Fully functional Netflix subtitle downloader with TypeScript version
