import { CreateChatCompletionResponse } from "openai";
import { BotCommand } from "node-telegram-bot-api";

export const MAX_TOKENS_GPT3_TURBO = 4096;

export const commands: BotCommand[] = [
  { command: "/start", description: "bot started" },
  { command: "/info", description: "get info" },
  { command: "/talks", description: "commend talks" },
];

export const gptResponse: CreateChatCompletionResponse = {
  id: "chatcmpl-123",
  object: "chat.completion",
  model: "gpt-3.5-turbo",
  created: 1677652288,
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "\n\nHello there, how may I assist you today?",
      },
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 9,
    completion_tokens: 12,
    total_tokens: 21,
  },
};

export type Topics = "series";
