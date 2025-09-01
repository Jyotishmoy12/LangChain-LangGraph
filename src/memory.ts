import { START, END, MessagesAnnotation, StateGraph, MemorySaver, Annotation } from "@langchain/langgraph";
import { llm } from "../langChain.js";
import { promptTemplate2 } from "./prompts/ChatPrompt.js";


const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    language: Annotation<String>()
    })

// define function that calls the model
export const callModel = async (state: typeof GraphAnnotation.State) => {
  const prompt = await promptTemplate2.invoke(state)
  const response = await llm.invoke(prompt);
  return { messages: response };
};
export const workflow = new StateGraph(GraphAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// add memory
export const memory = new MemorySaver();
export const app = workflow.compile({ checkpointer: memory });
