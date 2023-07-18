import { ChatCompletionRequestMessage } from "openai";
import { UserDataManager } from "@services/UserDataManager";
import { AIProcessor } from "./AIProcessor";
import { prepareMessages } from "@helpers/prepareMessages";

export class ContentProcessor {
  dataManager: UserDataManager;
  aiProcessor: AIProcessor;

  constructor(telegramId: number, username?: string) {
    this.aiProcessor = new AIProcessor();
    this.dataManager = new UserDataManager({ telegramId, username });
  }

  async sendMessage(message: string) {
    try {
      return await this.sendMessageToAI(message);
    } catch (error) {
      console.error("ContentProcessor.sendMessage", { error });
    }
  }

  protected async sendMessageToAI(content: string) {
    await this.isUserCreated();

    const message: ChatCompletionRequestMessage = { role: "user", content };
    const historyMessages = await this.dataManager.getMessages(8);
    const preparedMessages = prepareMessages(message, historyMessages);
    const answer = await this.aiProcessor.getAIAnswer(preparedMessages);

    await this.dataManager.setMessage(message);
    await this.dataManager.setMessage(answer.message);

    return answer.message;
  }

  protected async isUserCreated() {
    const isExist = await this.dataManager.isExist();
    if (!isExist) throw new Error("User not created");
  }
}
