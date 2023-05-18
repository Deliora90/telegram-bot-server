import { IMessage } from "@modules/message/message.types";

export interface IChat {
  messages: IMessage[];
  index?: number;
  finishReason?: string;
}
