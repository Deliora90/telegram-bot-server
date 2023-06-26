import { ContentProcessor } from "./ContentProcessor";
import { isTopic } from "@helpers/isTopic";

export class MessageProcessor extends ContentProcessor {
  async start() {
    try {
      await this.startUseService();
    } catch (err) {
      console.error("MessageProcessor.start", { err });
    }
  }

  async updateTopic(topic: string) {
    try {
      await this.updateConversationTopic(topic);
    } catch (err) {
      console.error("UserMessageProcessor.updateTopic", { err });
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
}
