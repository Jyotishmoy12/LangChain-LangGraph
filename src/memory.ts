import { START, END, MessagesAnnotation, StateGraph, MemorySaver } from "@langchain/langgraph";
import { llm } from "../langChain.js";
import { promptTemplate } from "./prompts/ChatPrompt.js";

// define function that calls the model
export const callModel = async (state: typeof MessagesAnnotation.State) => {
  const prompt = await promptTemplate.invoke(state)
  const response = await llm.invoke(prompt);
  return { messages: response };
};
export const workflow = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// add memory
export const memory = new MemorySaver();
export const app = workflow.compile({ checkpointer: memory });
