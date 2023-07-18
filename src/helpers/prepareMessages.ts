import { ChatCompletionRequestMessage } from "openai";
import { Message } from "@globalTypes/content";
import { PROMPT_MESSAGE } from "@constants";

export const prepareMessages = (
  newMessage: ChatCompletionRequestMessage,
  messages: Message[]
): ChatCompletionRequestMessage[] =>
  [PROMPT_MESSAGE]
    .concat(messages.map(({ role, content }) => ({ role, content })))
    .concat(newMessage);
