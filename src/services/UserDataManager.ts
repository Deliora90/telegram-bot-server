import { TopicsType } from "@constants";
import { Message } from "@globalTypes/content";
import { UserParams } from "@globalTypes/user";
import User from "@models/user";

export class UserDataManager {
  userParams: UserParams;
  constructor(params: UserParams) {
    this.userParams = params;
  }

  async findByTelegramId() {
    return await User.findByTelegramId(this.userParams.telegramId);
  }

  async isExist(): Promise<boolean> {
    const user = await this.findByTelegramId();
    return !!user;
  }

  async create() {
    const user = new User(this.userParams);
    await user.save();
  }

  async chooseTopic(topic: TopicsType) {
    const foundUser = await this.findByTelegramId();
    if (foundUser) await foundUser.setTopic(topic);
  }

  async getMessage(index: number) {
    const foundUser = await this.findByTelegramId();
    if (!foundUser) return null;
    return await foundUser.getMessage(index);
  }

  async getMessages(quantity?: number) {
    const foundUser = await this.findByTelegramId();
    if (!foundUser) return [];
    return await foundUser.getMessages(quantity);
  }
  async setMessage(message: Message) {
    const foundUser = await this.findByTelegramId();
    if (foundUser) await foundUser.setMessage(message);
  }
}
