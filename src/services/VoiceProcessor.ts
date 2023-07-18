import fs from "fs";
import { ContentProcessor } from "./ContentProcessor";
export class VoiceProcessor extends ContentProcessor {
  async sendVoice(href: string) {
    try {
      return await this.sendVoiceToAI(href);
    } catch (error) {
      console.error("VoiceProcessor.sendVoice", { error });
    }
  }
  async getVoice(text: string) {
    try {
      return await this.getAIVoice(text);
    } catch (error) {
      console.error("VoiceProcessor.getAIVoice", { error });
    }
  }
  private async sendVoiceToAI(href: string) {
    const userContent = await this.aiProcessor.transformSpeechToText(href);
    return await this.sendMessageToAI(userContent);
  }
  private async getAIVoice(text: string) {
    const speechPath = await this.aiProcessor.createVoiceByText(text);
    return fs.createReadStream(speechPath);
  }
}
