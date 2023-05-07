import { OpenAIApi } from "openai";
import TelegramApi from "node-telegram-bot-api";
import { getAIAnswer } from "@api/openai";
import { speechToText } from "@helpers/speechToText";
import { commands } from "@constants";
import userController from "@models/user/user.controller";

export const startBot = (bot: TelegramApi, openai: OpenAIApi) => {
  bot.setMyCommands(commands);

  bot.addListener("voice", async (message) => {
    console.log({ message });
    const chatId = message.chat.id;
    const fileID = message.voice.file_id;
    try {
      const href = await bot.getFileLink(fileID);
      const userText = await speechToText(openai, href);
      const answer = await getAIAnswer(openai, userText);
      await bot.sendMessage(chatId, `You said "${userText}"`);
      return bot.sendMessage(chatId, answer);
    } catch (err) {
      console.error("Some errors", { err });
    }
  });

  bot.addListener("message", async (message) => {
    const { chat, text } = message;
    const chatId = chat.id;
    if (text === "/start") {
      await userController.create({
        telegramId: chatId,
        username: chat.username,
      });
      // await bot.sendMessage();
      return;
    }
    if (text === "/info") {
    }
  });
};
