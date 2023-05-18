require("module-alias/register");

import { OpenAIApi } from "openai";
import { config } from "dotenv";
import TelegramApi from "node-telegram-bot-api";
import express from "express";
import mongoose from "mongoose";
import { startBot } from "@api/telegram/telegram";
import { openaiconfig, telegramconfig } from "@configs";

const app = express();
config();

app.use(express.static("public"));
app.use(express.json());

const start = async () => {
  const bot = new TelegramApi(process.env.TELEGRAM_API_TOKEN, telegramconfig);
  const openai = new OpenAIApi(openaiconfig);
  try {
    await mongoose.connect(process.env.DB);

    app.listen(process.env.PORT, function () {
      console.log("Server started on port " + process.env.PORT);
    });

    startBot(bot, openai);
  } catch (error) {
    console.error(error);
  }
};

start();
