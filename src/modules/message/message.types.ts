import { ChatCompletionResponseMessageRoleEnum } from "openai";

export interface IMessage {
  role: ChatCompletionResponseMessageRoleEnum;
  content: string;
}
