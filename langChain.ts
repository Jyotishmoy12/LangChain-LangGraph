import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
import dotenv from "dotenv";
import { app } from "./src/memory.js";
import { v4 as uuidv4 } from "uuid";
import { trimmer } from "./src/trimMessages.js";

dotenv.config();
export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// const input1 = {
//   messages: [
//    {
//       role: "user",
//       content: "Hi im Jyotishmoy",
//     },
//   ],
//   language: "Spanish",
// };
// const input2 = [
//   {
//     role: "user",
//     content: "What's my name?",
//   },
// ];
const config = {
  configurable: {
    thread_id: uuidv4(),
  },
};



const messages = [
  new HumanMessage("hi! I'm bob"),
  new AIMessage("hi!"),
  new HumanMessage("I like vanilla ice cream"),
  new AIMessage("nice"),
  new HumanMessage("whats 2 + 2"),
  new AIMessage("4"),
  new HumanMessage("thanks"),
  new AIMessage("no problem!"),
  new HumanMessage("having fun?"),
  new AIMessage("yes!"),
];

const input8 = {
  messages: [...messages, new HumanMessage("What is my name?")],
  language: "English",
}

const output3 = await app.invoke(input8, config);
console.log(output3.messages[output3.messages.length - 1]);

// const response = await trimmer.invoke(messages);
// console.log(response);
// const output1 = await app.invoke(input1 , config);

// const output2 = await app.invoke({ messages: input2 }, config);

// console.log(output1.messages[output1.messages.length - 1]);
// console.log(output2.messages[output2.messages.length - 1]);
