let div = document.querySelectorAll("div");
let textdiv = Array.from(div).map(div => div.innerText);
// console.log(textdiv.join("\n"));

let paragraphs = document.querySelectorAll("p");
let textpara = Array.from(paragraphs).map(p => p.innerText);
// console.log(textpara.join("\n"));

let finalgoing = textdiv+textpara


async function myfunc(){

    
    const data =  await fetch("http://localhost:3000/summarize",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        "text":`${finalgoing}`
    })
})

const res = await data.json()


console.log(res.summary)
}

myfunc()


// document.getElementById("morebtn").addEventListener("click",()=>{
//     finalgoing+=" give the next priority news"
//     myfunc()
// })