// popup.jsx
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const Popup = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [blockedCount, setBlockedCount] = useState(0);

    // Load the current state when the popup opens
    useEffect(() => {
        chrome.storage.local.get(['shortsBlockerEnabled', 'blockedCount'], (result) => {
            setIsEnabled(result.shortsBlockerEnabled !== undefined ? result.shortsBlockerEnabled : true);
            setBlockedCount(result.blockedCount || 0);
        });
    }, []);

    // Handle toggle changes
    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);

        // Save to storage and notify other parts of the extension
        chrome.storage.local.set({ shortsBlockerEnabled: newState });

        // Notify the background script
        chrome.runtime.sendMessage({
            action: 'toggleBlocker',
            isEnabled: newState
        });

        // Notify any open content scripts
        chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'stateChanged',
                    isEnabled: newState
                }).catch(err => console.log('No content script on this tab'));
            });
        });
    };

    return (
        <div className="container">
            <h1>YouTube Shorts Blocker</h1>

            <div className="toggle-container">
                <span>Block YouTube Shorts:</span>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={handleToggle}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <p className="info">
                When enabled, this extension will redirect you away from YouTube Shorts to help manage your short-form content consumption.
            </p>

            {blockedCount > 0 && (
                <div className="stats">
                    <p>Shorts redirected: {blockedCount}</p>
                </div>
            )}

            <div className="footer">
                <p>Take control of your online habits!</p>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<Popup />);