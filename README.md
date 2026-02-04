# YouTube Scroll to Watched

A small browser extension that adds a one-click button to YouTube's Subscriptions feed and scrolls directly to the most recently watched video. Designed for Firefox and published on the Firefox Add‑On store.

## What it does

- Adds a "Scroll to Watched" button on the header of the YouTube Subscriptions page.
- On click, it searches the page for the most recently watched video and smoothly scrolls it into view.

## Installation

- Install directly from the [Firefox Add‑On store](https://addons.mozilla.org/en-US/firefox/addon/youtube-scroll-to-watched/).

## Permissions & Privacy

- The extension requests only the permissions required to run on YouTube and to use basic extension storage and scripting:
  - `storage` and `scripting` permissions
  - Host permission for `https://www.youtube.com/*`
- The extension does not collect or transmit personal data. It only inspects the current YouTube page in your browser to find and scroll to watched items.

## Notes

- The extension is optimized for the current layout of YouTube; major layout changes by YouTube may require an update.
- If a watched video isn't found after 10 scroll attempts, a fail-safe will stop the search.