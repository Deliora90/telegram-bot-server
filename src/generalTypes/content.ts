import { ChatCompletionResponseMessageRoleEnum } from "openai";

export type RequestError = {
  message: string;
};

export interface Message {
  role: ChatCompletionResponseMessageRoleEnum;
  content: string;
}

export interface User {
  telegramId: number;
  messages: Message[];
  username?: string;
  topic?: string;
}
