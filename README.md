# NoShorts – YouTube Shorts Blocker

**NoShorts** is a Chrome extension that removes YouTube Shorts from your browsing experience. It works by detecting and hiding all Shorts-related content from the YouTube interface, providing a cleaner, distraction-free environment.

## Features

- Hides Shorts videos from the YouTube home page
- Removes Shorts from channel pages
- Blocks Shorts from appearing in the sidebar and search results
- Lightweight and privacy-respecting (no data collection)

## Installation

1. Clone or download this repository:

```bash
git clone https://github.com/ohhpeejoshi/no-shorts.git
```

2.Switch to the project folder:

```bash
cd no-shorts/extension
```

3. Install dependencies(Make sure you have Node.js installed):

```bash
npm install
```

3. Build the extension:

```bash
npm run build
```

This will generate the final extension code inside the dist/ folder.

To load the extension in Chrome:

- Open Chrome and navigate to chrome://extensions/ (or click on three dots on top right corner, go to Extensions -> Manage Extensions).

- Enable Developer mode (toggle in the top-right)

- Click Load unpacked

- Select the dist/ folder located inside the project directory

The extension will now be installed and active in your browser.
