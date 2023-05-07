import { ChatCompletionResponseMessageRoleEnum } from "openai";
import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  role: ChatCompletionResponseMessageRoleEnum,
  content: { type: String, require },
});

const Message = model("Message", MessageSchema);

export default Message;
