if (!window.hasRun) {
    window.hasRun = true;
    async function summarizeText(text) {
        try {
            const response = await fetch("https://news-shortner-chrome-extension.vercel.app/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            const res = await response.json();

            if (response.ok && res.summary.length > 100) {
                chrome.runtime.sendMessage({ extractedText: res.summary });
                localStorage.setItem("prevSummary", res.summary);
            }
        } catch (error) {
            console.error("Error in summarizeText:", error);
        }
    }

    function extractText() {
        let textElements = [...document.querySelectorAll("div, p")];
        let fullText = textElements.map((el) => el.innerText).join("\n");

        fullText = fullText.replace(/\s+/g, " ").replace(/["']/g, "").trim();
        return fullText.length > 90000 ? fullText.slice(0, 90000) : fullText;
    }

    function checkAndUpdateText() {
        let newText = extractText();
        summarizeText(newText);
    }

    checkAndUpdateText();

    let observer = new MutationObserver(() => checkAndUpdateText());
    observer.observe(document.body, { childList: true, subtree: true });
}