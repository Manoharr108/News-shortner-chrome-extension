document.addEventListener("DOMContentLoaded", function () {
    let textArea = document.getElementById("textOutput");
    // let morebtn = document.getElementById("morebtn");

    // Request extracted text from content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.extractedText) {
            textArea.value = message.extractedText;
        }
    });

    // Copy text to clipboard
    // copyBtn.addEventListener("click", () => {
    //     textArea.select();
    //     document.execCommand("copy");
    //     alert("Text copied to clipboard!");
    // });



    // Inject content script to extract text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});
