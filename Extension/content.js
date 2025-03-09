// Extract text from <div> elements
let divs = document.querySelectorAll("div");
let textDivs = Array.from(divs).map(div => div.innerText);

// Extract text from <p> elements
let paragraphs = document.querySelectorAll("p");
let textParas = Array.from(paragraphs).map(p => p.innerText);

// Combine all text and send it to the popup
let fullText = textDivs.concat(textParas).join("\n");
fullText = fullText.replace(/\s+/g, ' ').replace(/["']/g, '').trim()

fullText = fullText.length>90000?fullText.slice(0,90000):fullText

async function myfunc(){

    
    const data =  await fetch("http://localhost:3000/summarize",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        "text":`${fullText}`
    })
})
const res = await data.json()
chrome.runtime.sendMessage({ extractedText: res.summary });
}

myfunc()




