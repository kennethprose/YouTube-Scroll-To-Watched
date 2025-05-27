(async function maybeScrollToWatchedVideo() {
    const { autoScrollEnabled } = await browser.storage.local.get("autoScrollEnabled");
    if (!autoScrollEnabled) {
        console.log("⚙️ Auto-scroll is disabled. Enable it in the extension popup.");
        return;
    }

    const SCROLL_DELAY_MS = 500;
    const MAX_SCROLL_ATTEMPTS = 10;

    function findWatchedVideo() {
        return document.querySelector("ytd-thumbnail-overlay-resume-playback-renderer")
            ?.closest("ytd-grid-video-renderer, ytd-rich-item-renderer");
    }

    async function scrollToBottom() {
        return new Promise((resolve) => {
            const distanceToBottom = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: distanceToBottom, behavior: "smooth" });
            setTimeout(resolve, SCROLL_DELAY_MS);
        });
    }

    let attempt = 0;
    while (attempt < MAX_SCROLL_ATTEMPTS) {
        const watched = findWatchedVideo();
        if (watched) {
            watched.scrollIntoView({ behavior: "smooth", block: "center" });
            console.log("🎯 Found watched video and scrolled to it.");
            break;
        }
        console.log("Scrolling...");
        await scrollToBottom();
        attempt++;
    }

    if (attempt >= MAX_SCROLL_ATTEMPTS) {
        console.log("❌ Watched video not found after max attempts.");
    }
})();
