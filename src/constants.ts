import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import { config } from "dotenv";
import { BotCommand, SendMessageOptions } from "node-telegram-bot-api";

config();

export const GPT_MODEL = "gpt-3.5-turbo";
export const SPEECH_TO_TEXT_MODEL = "whisper-1";
export const MAX_TOKENS_GPT3_TURBO = 4096;
export const RESPONSE_MAX_TOKENS = 500;
export const PROMPT_MESSAGE: ChatCompletionRequestMessage = {
  role: "assistant",
  content: process.env.TALKS_PROMPT,
};
export const TEXT_TO_SPEECH_TOKEN = process.env.TTSMARKER_TOKEN;

export const commands: BotCommand[] = [
  { command: "/start", description: "bot started" },
  { command: "/topics", description: "bot started" },
  { command: "/info", description: "get info" },
  { command: "/talks", description: "commend talks" },
  { command: "/voice", description: "commend talks" },
];

//TODO: Сделать другие типы для тем
export const Topics = {
  SERIES: "series",
  JOB: "job",
  MOVIES: "movies",
  MEMES: "memes",
  HOBBIES: "hobbies",
} as const;

export type TopicsType = (typeof Topics)[keyof typeof Topics];

export const topicOptions: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Series", callback_data: Topics.SERIES }],
      [{ text: "Jobs", callback_data: Topics.JOB }],
      [{ text: "Memes", callback_data: Topics.MEMES }],
      [{ text: "Movies", callback_data: Topics.MOVIES }],
      [{ text: "Hobbies", callback_data: Topics.HOBBIES }],
    ],
  },
};

export const gptResponse: CreateChatCompletionResponse = {
  id: "chatcmpl-123",
  object: "chat.completion",
  model: GPT_MODEL,
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
