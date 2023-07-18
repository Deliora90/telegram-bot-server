import TelegramApi from "node-telegram-bot-api";
import {
  TOPIC_MESSAGE,
  commands,
  topicOptions,
  usersActions,
  removeKeyboard,
} from "@constants";
import { telegramconfig } from "@configs";
import { MessageProcessor } from "@services/MessageProcessor";
import { VoiceProcessor } from "@services/VoiceProcessor";
import { deleteFile } from "@helpers/deleteFiles";

export const startBot = () => {
  const bot = new TelegramApi(process.env.TELEGRAM_API_TOKEN, telegramconfig);

  bot.setMyCommands(commands);

  bot.addListener("voice", async (message) => {
    const { id: chatId, username } = message.chat;
    const fileID = message.voice.file_id;
    try {
      const href = await bot.getFileLink(fileID);
      const voiceProcessor = new VoiceProcessor(chatId, username);
      await bot.sendChatAction(chatId, "record_voice");
      const answer = await voiceProcessor.sendVoice(href);
      const voice = await voiceProcessor.getVoice(answer.content);
      await bot.sendVoice(chatId, voice, usersActions);
      deleteFile(voice.path as string);
    } catch (error) {
      console.error("bot.voice", { error });
    }
  });

  bot.addListener("message", async (message) => {
    const { text } = message;
    const { id: chatId, username } = message.chat;
    const messageProcessor = new MessageProcessor(chatId, username);
    if (!text) return;
    try {
      switch (text) {
        case "/start":
          await messageProcessor.start();
          return bot.sendMessage(chatId, "Hello!", removeKeyboard);
        case "/topics":
          return bot.sendMessage(chatId, "choose topics", topicOptions);
        case "Text the same in English":
          const message = await messageProcessor.getTextOfVoice();
          return bot.sendMessage(chatId, message.content, removeKeyboard);
        default: {
          await bot.sendChatAction(chatId, "typing");
          const answer = await messageProcessor.sendMessage(text);
          return bot.sendMessage(chatId, answer.content, removeKeyboard);
        }
      }
    } catch (error) {
      console.error("bot.message", { error });
    }
  });

  bot.on("callback_query", async (query) => {
    try {
      const { message, data: chosenTopic } = query;
      const { id: chatId, username } = message.chat;
      const voiceProcessor = new VoiceProcessor(chatId, username);
      const messageProcessor = new MessageProcessor(chatId, username);
      await messageProcessor.updateTopic(chosenTopic);
      const answer = await messageProcessor.sendMessage(
        `${TOPIC_MESSAGE} ${chosenTopic}`
      );
      const voice = await voiceProcessor.getVoice(answer.content);
      await bot.sendVoice(chatId, voice, usersActions);
      deleteFile(voice.path as string);
    } catch (error) {
      console.error("bot.callback_query", { error });
    }
  });
};
