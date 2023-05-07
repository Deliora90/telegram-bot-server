import { OpenAIApi } from "openai";
import { MAX_TOKENS_GPT3_TURBO, gptResponse } from "@constants"; //TODO: temporary

export const transcribe = async (openai: OpenAIApi, buffer: File) => {
  const response = await openai.createTranscription(
    buffer,
    "whisper-1",
    undefined,
    "json",
    1,
    "en"
  );
  return response.data.text;
};

export const createCompletion = async (
  openai: OpenAIApi,
  message: string,
  max_tokens: number = MAX_TOKENS_GPT3_TURBO,
  temperature?: number
) => {
  const prompt = `${process.env.TALKS_PROMPT} ${message}`;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    // max_tokens: max_tokens,
    // temperature,
  });
  return response.data;
};

export const getAIAnswer = async (openai: OpenAIApi, message: string) => {
  return gptResponse.choices.at(gptResponse.choices.length - 1).message.content; //TODO: temporary
  //const response = await createCompletion(openai, message);
  //const answer = response.choices.at(response.choices.length - 1);
  // return answer.message.content;
};
