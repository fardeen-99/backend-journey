import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "AIzaSyDJGok6UlaZIxKjirKkidZMCIa6R-RNCN0"
});
let arr=[]
const modelresponser=async()=>{
//     const response = await model.invoke("how to become a web developer")
//     response.content.split(/\n+|• |- |\* |\\s+/).forEach((item)=>{
//         arr.push(item)
//     })
// arr.forEach((item)=>{
//     console.log(item)
// })
}

export default modelresponser
