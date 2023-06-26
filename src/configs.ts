import { config } from "dotenv";
import { Configuration } from "openai";
import TelegramApi from "node-telegram-bot-api";
config();
export const openaiconfig = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

export const telegramconfig: TelegramApi.ConstructorOptions = { polling: true };
