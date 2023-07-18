import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import axios from "axios";
import { openaiconfig } from "@configs";
import { FileConverter } from "@services/FileConverter";
import { getCountOfTokens } from "@helpers/getCountOfTokens";
import { downloadsFile } from "@helpers/downloadFile";
import {
  MAX_TOKENS_GPT3_TURBO,
  RESPONSE_MAX_TOKENS,
  GPT_MODEL,
  SPEECH_TO_TEXT_MODEL,
  TEXT_TO_SPEECH_URL,
  TEXT_TO_SPEECH_TOKEN,
} from "@constants";
import { TextToSpeechResponse } from "@globalTypes/content";

export class AIProcessor {
  openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(openaiconfig);
  }

  async transformSpeechToText(href: string) {
    const converter = new FileConverter(href);
    const file = await converter.convertToMp3();
    const response = await this.transcribe(file);
    converter.cleanFilesAfterConverting();
    return response;
  }

  async getAIAnswer(messages: ChatCompletionRequestMessage[]) {
    const countOfTokens = getCountOfTokens(messages) + RESPONSE_MAX_TOKENS;
    const max_tokens = Math.min(countOfTokens, MAX_TOKENS_GPT3_TURBO);
    const completion = await this.createChatCompletion(
      messages,
      max_tokens,
      0.2
    );
    return completion.choices.at(completion.choices.length - 1);
  }

  async createVoiceByText(
    text: string,
    voice_id: number = 2593,
    audio_format: string = "mp3",
    audio_speed: number = 1.0,
    audio_volume: number = 0,
    text_paragraph_pause_time: string = "0"
  ) {
    const response = await axios.post<TextToSpeechResponse>(
      TEXT_TO_SPEECH_URL,
      {
        token: TEXT_TO_SPEECH_TOKEN,
        text,
        voice_id,
        audio_format,
        audio_speed,
        audio_volume,
        text_paragraph_pause_time,
      }
    );
    const href = response.data.audio_file_url;
    let speechPath = await downloadsFile(href, "./");

    return speechPath;
  }

  private async createChatCompletion(
    messages: ChatCompletionRequestMessage[],
    max_tokens?: number,
    temperature?: number
  ) {
    const response = await this.openai.createChatCompletion({
      model: GPT_MODEL,
      messages: messages,
      max_tokens,
      temperature,
    });
    return response.data;
  }

  private async transcribe(buffer: File) {
    const response = await this.openai.createTranscription(
      buffer,
      SPEECH_TO_TEXT_MODEL,
      undefined,
      "json",
      undefined,
      "en"
    );
    return response.data.text;
  }
}
