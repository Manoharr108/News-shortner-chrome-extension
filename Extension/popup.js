document.addEventListener("DOMContentLoaded", function () {
    let textArea = document.getElementById("textOutput");

    chrome.runtime.onMessage.addListener((message) => {
        if (message.extractedText) {
            document.getElementById("loader").style.display = "none"
            textArea.style.display = "block"
            textArea.value = message.extractedText;
        }
        else{
            textArea.value = "Somethings went wrong";
        }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});
