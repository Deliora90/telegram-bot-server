import { Schema, model, Types } from "mongoose";

const ChatSchema = new Schema({
  index: Number,
  message: [{ type: Types.ObjectId, ref: "Message" }],
  finishReason: String,
});

const Chat = model("Chat", ChatSchema);

export default Chat;