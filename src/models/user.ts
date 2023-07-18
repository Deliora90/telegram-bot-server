import { Schema, model, Types, Document, Model } from "mongoose";
import { TopicsType } from "@constants";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import { Message, User } from "@globalTypes/content";

export interface UserDocument extends User, Document {
  setTopic: (topic: TopicsType) => Promise<void>;
  setMessage: (message: Message) => Promise<void>;
  getMessage: (index: number) => Promise<Message>;
  getMessages: (quantity?: number) => Promise<Message[]>;
}

export interface UserModel extends Model<UserDocument> {
  findByTelegramId: (telegramId: number) => Promise<UserDocument>;
}

const UserSchema: Schema<UserDocument> = new Schema({
  telegramId: { type: Number, required: true, unique: true },
  messages: [
    {
      role: { type: String, enum: ChatCompletionResponseMessageRoleEnum },
      content: { type: String, require },
    },
  ],
  username: { type: String },
  topic: String,
});

UserSchema.methods.setTopic = async function setTopic(topic: TopicsType) {
  this.topic = topic;
  await this.save();
};
UserSchema.methods.setMessage = async function setMessage(message: Message) {
  this.messages.push(message);
  await this.save();
};
UserSchema.methods.getMessage = async function getMessage(index: number) {
  return this.messages.at(index);
};
UserSchema.methods.getMessages = async function getMessages(quantity?: number) {
  if (!quantity) return this.messages;
  const messagesQuantity = this.messages.length;
  const start = quantity < messagesQuantity ? messagesQuantity - quantity : 0;
  return this.messages.slice(start, messagesQuantity);
};
UserSchema.statics.findByTelegramId = function findByTelegramId(
  telegramId: number
) {
  return this.findOne({ telegramId });
};
const User = model<UserDocument, UserModel>("User", UserSchema);

export default User;
