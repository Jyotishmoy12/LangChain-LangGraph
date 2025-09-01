import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { app } from "./src/memory.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

const input1 = {
  messages: [
   {
      role: "user",
      content: "Hi im Jyotishmoy",
    },
  ],
  language: "Spanish",
};
const input2 = [
  {
    role: "user",
    content: "What's my name?",
  },
];
const config = {
  configurable: {
    thread_id: uuidv4(),
  },
};
const output1 = await app.invoke(input1 , config);

const output2 = await app.invoke({ messages: input2 }, config);

console.log(output1.messages[output1.messages.length - 1]);
console.log(output2.messages[output2.messages.length - 1]);
