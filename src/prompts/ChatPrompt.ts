import { ChatPromptTemplate } from "@langchain/core/prompts";

export const promptTemplate1 = ChatPromptTemplate.fromMessages([
  ["system", "You talk like a pirate. Answer all questions to the best of your ability."],
  ["placeholder", "{messages}"],
]);

export const promptTemplate2 = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
  ],
  ["placeholder", "{messages}"],
]);