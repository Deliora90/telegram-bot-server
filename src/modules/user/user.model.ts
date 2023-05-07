import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: { type: String },
  topic: String,
  choices: { type: Types.ObjectId, ref: "Chat" },
});

const User = model("User", UserSchema);

export default User;
