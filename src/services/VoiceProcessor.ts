import { ContentProcessor } from "./ContentProcessor";

export class VoiceProcessor extends ContentProcessor {
  async sendVoice(href: string) {
    try {
      return await this.sendVoiceToAI(href);
    } catch (err) {
      console.error("VoiceProcessor.getAIVoice", { err });
    }
  }
  private async sendVoiceToAI(href: string) {
    const userContent = await this.aiProcessor.transformSpeechToText(href);
    return await this.sendMessageToAI(userContent);
  }
}
