require('dotenv').config()
const express = require('express')
const app = express()
const port  = 3000
const cors = require('cors')
app.use(express.json())
app.use(cors())

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.MY_KEY);




app.post("/summarize",async(req, res)=>{
  const text = req.body.text
  if(!text) return res.status(400).json({message:"No text received!"})

  try{
   
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.3,
      }
    }); 
    const result = await chat.sendMessageStream(`(explain in very simple words)Summarize this news in few sentenses but make it short as possible: \n\n${text}`);

    let summary = "";
        for await (const chunk of result.stream) {
            summary += chunk.text();
        }

        res.status(200).json({ summary });

  }catch(err){
    return res.status(404).json(err.message)
  }
})


app.listen(port , ()=>{
  console.log("server running successfully on " + port)
})