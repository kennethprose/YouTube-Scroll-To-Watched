document.addEventListener("DOMContentLoaded", async () => {
    const checkbox = document.getElementById("toggleScroll");

    // Read current value from storage
    const result = await browser.storage.local.get("autoScrollEnabled");

    // If the setting is missing (first install), set it to true
    let enabled = result.autoScrollEnabled;
    if (enabled === undefined) {
        enabled = false;
        await browser.storage.local.set({ autoScrollEnabled: false });
    }

    // Reflect in UI
    checkbox.checked = enabled;

    // Listen for changes
    checkbox.addEventListener("change", async () => {
        await browser.storage.local.set({ autoScrollEnabled: checkbox.checked });
    });
});
