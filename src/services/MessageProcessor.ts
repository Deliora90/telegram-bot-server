import { ContentProcessor } from "./ContentProcessor";
import { isTopic } from "@helpers/isTopic";

export class MessageProcessor extends ContentProcessor {
  async start() {
    try {
      await this.startUseService();
    } catch (error) {
      console.error("MessageProcessor.start", { error });
    }
  }

  async updateTopic(topic: string) {
    try {
      await this.updateConversationTopic(topic);
    } catch (error) {
      console.error("UserMessageProcessor.updateTopic", { error });
    }
  }

  async getTextOfVoice() {
    try {
      return await this.getLastMessage();
    } catch (error) {
      console.error("UserMessageProcessor.getTextOfVoice", { error });
    }
  }

  private async startUseService() {
    const isExist = await this.dataManager.isExist();
    if (isExist) throw new Error("User already created");
    await this.dataManager.create();
  }

  private async updateConversationTopic(topic: string) {
    if (!isTopic(topic)) {
      throw new Error("Could not select a topic. Please choose another one.");
    }
    await this.dataManager.chooseTopic(topic);
  }

  private async getLastMessage() {
    const messages = await this.dataManager.getMessages(1);
    return messages.at(0);
  }
}
