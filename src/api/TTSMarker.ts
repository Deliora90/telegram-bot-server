import axios from "axios";
import fs from "fs";
import { TEXT_TO_SPEECH_TOKEN } from "@constants";
import { downloadsFile } from "@helpers/downloadFile";

const url = "https://api.ttsmaker.com/v1/create-tts-order";

interface TextToSpeechResponse {
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

export class TextToSpeechProcessor {
  text: string;
  constructor(text: string) {
    this.text = text;
  }

  async getVoice() {
    try {
      return await this.getAIVoice();
    } catch (err) {
      console.error("TextToSpeechProcessor.getVoice", err);
    }
  }

  private async getAIVoice() {
    const response = await axios.post<TextToSpeechResponse>(url, {
      token: TEXT_TO_SPEECH_TOKEN,
      text: this.text,
      voice_id: 2593,
      audio_format: "mp3",
      audio_speed: 1.0,
      audio_volume: 0,
      text_paragraph_pause_time: 0,
    });
    const href = response.data.audio_file_url;
    let speechPath = await downloadsFile(href, "./");
    return fs.createReadStream(speechPath) as any;
  }
}
