(function () {
    const BUTTON_ID = "yt-scroll-watched-btn";

    function isOnSubscriptions() {
        return location.pathname === "/feed/subscriptions";
    }

    function addButtonIfNeeded() {
        if (!isOnSubscriptions()) {
            removeButton();
            return;
        }
        if (document.getElementById(BUTTON_ID)) return;

        waitForSearchBar().then((searchBar) => {
            if (!isOnSubscriptions()) return; // Double-check after async
            if (document.getElementById(BUTTON_ID)) return;

            const btn = document.createElement("button");
            btn.id = BUTTON_ID;
            btn.textContent = "Scroll to Watched";
            btn.style.marginLeft = "12px";
            btn.style.padding = "6px 12px";
            btn.style.background = "#d00";
            btn.style.color = "#fff";
            btn.style.border = "none";
            btn.style.borderRadius = "4px";
            btn.style.cursor = "pointer";
            btn.style.fontWeight = "bold";
            btn.style.fontSize = "14px";
            btn.style.zIndex = "1000";
            btn.addEventListener("click", scrollToWatchedVideo);

            const parent = searchBar.parentElement;
            parent && parent.appendChild(btn);
        });
    }

    function removeButton() {
        const btn = document.getElementById(BUTTON_ID);
        if (btn) btn.remove();
    }

    function waitForSearchBar() {
        return new Promise((resolve) => {
            const check = () => {
                const searchBar = document.querySelector('yt-searchbox');
                if (searchBar) resolve(searchBar);
                else setTimeout(check, 300);
            };
            check();
        });
    }

    async function scrollToWatchedVideo() {
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
                return;
            }
            await scrollToBottom();
            attempt++;
        }
        alert("❌ Watched video not found after max attempts.");
    }

    // Observe DOM changes to detect SPA navigation
    const observer = new MutationObserver(() => {
        addButtonIfNeeded();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check
    addButtonIfNeeded();
})();
