import TelegramApi from "node-telegram-bot-api";
import { commands, topicOptions } from "@constants";
import { telegramconfig } from "@configs";
import { MessageProcessor } from "@services/MessageProcessor";
import { VoiceProcessor } from "@services/VoiceProcessor";
import { TextToSpeechProcessor } from "./TTSMarker";

export const startBot = () => {
  const bot = new TelegramApi(process.env.TELEGRAM_API_TOKEN, telegramconfig);

  bot.setMyCommands(commands);

  bot.addListener("voice", async (message) => {
    const { id: chatId, username } = message.chat;
    const fileID = message.voice.file_id;
    try {
      const href = await bot.getFileLink(fileID);
      const voiceProcessor = new VoiceProcessor(chatId, username);
      const answer = await voiceProcessor.sendVoice(href);
      const textToSpeech = new TextToSpeechProcessor(answer.content);
      return bot.sendVoice(chatId, await textToSpeech.getVoice());
      // return bot.sendMessage(chatId, answer.content);
    } catch (err) {
      console.error("bot.voice", { err });
    }
  });

  bot.addListener("message", async (message) => {
    const { text } = message;
    const { id: chatId, username } = message.chat;
    const messageProcessor = new MessageProcessor(chatId, username);
    if (!text) return;
    switch (text) {
      case "/start":
        await messageProcessor.start();
        return bot.sendMessage(chatId, "Hello!");
      case "/topics":
        return bot.sendMessage(chatId, "choose topics", topicOptions);
      case "/voice":
        const textToSpeech = new TextToSpeechProcessor("speak");
        return bot.sendVoice(chatId, await textToSpeech.getVoice());
      default: {
        const answer = await messageProcessor.sendMessage(text);
        return bot.sendMessage(chatId, answer.content);
      }
    }
  });

  bot.on("callback_query", async (query) => {
    const { message, data: chosenTopic } = query;
    const { id: chatId, username } = message.chat;
    const messageProcessor = new MessageProcessor(chatId, username);
    await messageProcessor.updateTopic(chosenTopic);
    return bot.sendMessage(chatId, "Hello!");
  });
};
