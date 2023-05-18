import { Schema, model, Types, Document, Model } from "mongoose";

export interface IUser {
  telegramId: number;
  username?: string;
  topic?: string;
  choices?: Types.ObjectId;
}

export interface IUserDocument extends IUser, Document {
  setTopic: () => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByTelegramId: (telegramId: number) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: { type: String },
  topic: String,
  choices: { type: Schema.Types.ObjectId, ref: "Chat" },
});

UserSchema.methods.setTopic = function setTopic() {};

UserSchema.statics.findByTelegramId = function findByTelegramId(
  telegramId: number
) {
  return this.findOne({ telegramId });
};

const User = model<IUserDocument, IUserModel>("User", UserSchema);

export default User;
