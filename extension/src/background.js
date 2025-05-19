// background.js - Runs in the background and monitors navigation

// Default state: enabled
let isEnabled = true;

// Load user preferences when the extension starts
chrome.storage.local.get(['shortsBlockerEnabled'], (result) => {
    isEnabled = result.shortsBlockerEnabled !== undefined ? result.shortsBlockerEnabled : true;
    console.log('Shorts blocker enabled:', isEnabled);
});

// Listen for changes to the toggle state from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleBlocker') {
        isEnabled = message.isEnabled;
        chrome.storage.local.set({ shortsBlockerEnabled: isEnabled });
        sendResponse({ status: 'success', isEnabled });
    }
    else if (message.action === 'getState') {
        sendResponse({ isEnabled });
    }
    return true; // Required for async sendResponse
});

// Listen for URL changes
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    handleNavigation(details);
});

chrome.webNavigation.onCompleted.addListener((details) => {
    handleNavigation(details);
});

// Handle navigation events
function handleNavigation(details) {
    if (!isEnabled) return;

    const url = new URL(details.url);

    // Check if the URL is a YouTube Shorts URL
    if (
        url.hostname.includes('youtube.com') &&
        (url.pathname.startsWith('/shorts') ||
            url.pathname.includes('/shorts/'))
    ) {
        console.log('Detected YouTube Shorts navigation:', details.url);

        // Get the tab and navigate back
        chrome.tabs.get(details.tabId, (tab) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            // Navigate back in the tab's history
            chrome.tabs.goBack(details.tabId);
        });
    }
}