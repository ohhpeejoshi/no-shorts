// content.js - Runs on YouTube pages

// Initialize
console.log('YouTube Shorts Blocker content script loaded');

let isEnabled = true;

// Get the current state when content script loads
chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    isEnabled = response.isEnabled;
});

// Listen for state changes from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'stateChanged') {
        isEnabled = message.isEnabled;
        sendResponse({ status: 'acknowledged' });
    }
    return true;
});

// Watch for DOM changes to hide shorts from recommendations if needed
const observer = new MutationObserver((mutations) => {
    if (!isEnabled) return;

    //Hide shorts in recommendations
    const shortsThumbnails = document.querySelectorAll('a[href^="/shorts"]');
    shortsThumbnails.forEach((thumbnail) => {
        // Find the closest container element (this depends on YouTube's structure)
        const container = thumbnail.closest('ytd-grid-video-renderer, ytd-video-renderer, ytd-rich-item-renderer');
        if (container) {
            container.style.display = 'none';
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
});