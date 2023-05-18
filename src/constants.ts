import { CreateChatCompletionResponse } from "openai";
import { BotCommand, SendMessageOptions } from "node-telegram-bot-api";

export const MAX_TOKENS_GPT3_TURBO = 4096;

export const commands: BotCommand[] = [
  { command: "/start", description: "bot started" },
  { command: "/topics", description: "bot started" },
  { command: "/info", description: "get info" },
  { command: "/talks", description: "commend talks" },
];

export const Topics = {
  SERIES: "series",
  JOB: "job",
  MOVIES: "movies",
  MEMES: "memes",
  HOBBYES: "hobbies",
} as const;

export type TopicsType = (typeof Topics)[keyof typeof Topics];

export const topicOptions: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Series", callback_data: Topics.SERIES }],
      [{ text: "Jobs", callback_data: Topics.JOB }],
      [{ text: "Memes", callback_data: Topics.MEMES }],
      [{ text: "Movies", callback_data: Topics.MOVIES }],
      [{ text: "Hobbies", callback_data: Topics.HOBBYES }],
    ],
  },
};

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
