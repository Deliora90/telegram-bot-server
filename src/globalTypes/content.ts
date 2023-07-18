import { ChatCompletionResponseMessageRoleEnum } from "openai";

export type RequestError = {
  message: string;
};

export interface Message {
  role: ChatCompletionResponseMessageRoleEnum;
  content: string;
}

export interface User {
  telegramId: number;
  messages: Message[];
  username?: string;
  topic?: string;
}

export interface TextToSpeechResponse {
  error_code: string;
  status: string;
  error_details: string;
  unix_timestamp: number;
  audio_file_url: string;
  audio_file_type: string;
  audio_file_expire_time: number;
  tts_elapsed_time: string;
  tts_order_characters: number;
  token_status: {
    current_cycle_max_characters: number;
    current_cycle_characters_used: number;
    current_cycle_characters_available: number;
    remaining_days_to_reset_quota: number;
    history_characters_used: number;
  };
}
