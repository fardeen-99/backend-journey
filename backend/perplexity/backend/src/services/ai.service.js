// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: "AIzaSyDJGok6UlaZIxKjirKkidZMCIa6R-RNCN0"
// });
import dotenv from "dotenv";
dotenv.config();

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage ,SystemMessage,AIMessage} from "@langchain/core/messages";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";


const model = new ChatMistralAI({
model: "mistral-small-latest",
apiKey: process.env.MISTRAL_API_KEY
});

const eventSchema = z.object({
  venueName: z.string(),
  location: z.string(),
  estimatedCost: z.string(),
  whyItFits: z.string(),
});

// ✅ Parser
const parser = StructuredOutputParser.fromZodSchema(eventSchema);
const formatInstructions = parser.getFormatInstructions();



const modelresponser = async (messages) => {
  try {
    const lastUserMessage = messages[messages.length - 1]?.content;

    // 👉 limited history (last 4 messages only)
    const historyMessages = messages.slice(-4).map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else {
        return new AIMessage(msg.content);
      }
    });

    const finalMessages = [
      new SystemMessage(`
You are an AI Event Planner.

Rules:
- Use conversation context if helpful
- BUT generate response based on latest user request
- ONLY return valid JSON
- No extra text

If input is not related to event planning:
return exactly "NOT RELEVANT"

${formatInstructions}
`),

      ...historyMessages, // 👈 context
      new HumanMessage(lastUserMessage) // 👈 main input
    ];

    const response = await model.invoke(finalMessages);

    const parsed = await parser.parse(response.content);

    return parsed;

  } catch (err) {
    return "NOT RELEVANT";
  }
};




export const titleGenerator=async(message)=>{
  const response = await model.invoke([
      new SystemMessage(`
You are an AI assistant that generates short, professional chat titles.

Rules:
- Title must be 2 to 3 words only
- Be clear, concise, and meaningful
- No punctuation at the end
- No extra explanation
- Output ONLY the title
`+message)
 ,       new HumanMessage(message)
    ])
    return response.content
}

export default modelresponser