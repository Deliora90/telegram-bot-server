import { encoding_for_model } from "@dqbd/tiktoken";
import { ChatCompletionRequestMessage } from "openai";
import { GPT_MODEL } from "@constants";

export const getCountOfTokens = (messages: ChatCompletionRequestMessage[]) => {
  const tiktoken = encoding_for_model(GPT_MODEL);
  return messages.reduce(
    (acc, { content }) => acc + tiktoken.encode(content).length,
    0
  );
};
