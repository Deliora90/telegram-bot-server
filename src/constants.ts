import { ChatCompletionRequestMessage } from "openai";
import { BotCommand, SendMessageOptions } from "node-telegram-bot-api";

export const GPT_MODEL = "gpt-3.5-turbo";
export const SPEECH_TO_TEXT_MODEL = "whisper-1";
export const MAX_TOKENS_GPT3_TURBO = 4096;
export const RESPONSE_MAX_TOKENS = 500;
export const PROMPT_MESSAGE: ChatCompletionRequestMessage = {
  role: "assistant",
  content: process.env.TALKS_PROMPT,
};
export const TOPIC_MESSAGE = process.env.TOPIC_PROMPT;
export const TEXT_TO_SPEECH_TOKEN = process.env.TTSMARKER_TOKEN;

export const TEXT_TO_SPEECH_URL =
  "https://api.ttsmaker.com/v1/create-tts-order";

export const commands: BotCommand[] = [
  { command: "/start", description: "Launching the bot" },
  { command: "/topics", description: "Choosing a topic for conversation." },
  { command: "/info", description: "Information about the bot." },
];

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

export const usersActions: SendMessageOptions = {
  reply_markup: {
    keyboard: [[{ text: "Text the same in English" }]],
  },
};

export const removeKeyboard: SendMessageOptions = {
  reply_markup: { remove_keyboard: true },
};
