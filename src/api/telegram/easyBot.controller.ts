import TelegramApi from "node-telegram-bot-api";
import userController from "@modules/user/user.controller";
import { topicOptions } from "@constants";

export class EasyBotController {
  static async start(chatId: number, username?: string) {
    try {
      await userController.create({
        telegramId: chatId,
        username: username,
      });
      return;
    } catch (error) {
      console.error("Cannot create user");
    }
  }

  static async topics(bot: TelegramApi, chatId: number) {
    try {
      return bot.sendMessage(chatId, "choose topics", topicOptions);
    } catch (error) {
      console.error("Cannot choose topic");
    }
  }
}
