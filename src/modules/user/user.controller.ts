import { TopicsType } from "@constants";
import { UserParams, IUserController, Result } from "./user.types";
import User from "./user.model";

class UserController implements IUserController {
  async create(params: UserParams) {
    try {
      const foundUser = await this.findUser(params.telegramId);
      if (foundUser) return true;

      const user = new User(params);
      await user.save();
      return true;
    } catch (error) {
      console.error(error);
      return Promise.reject({ message: "Error creating user" });
    }
  }
  async chooseTopic(topic: TopicsType) {
    return false;
  }
  async findUser(telegramId: number) {
    try {
      const foundUser = await User.findByTelegramId(telegramId);
      return foundUser;
    } catch (error) {
      console.error(error);
      return Promise.reject({ message: "Error finding user" });
    }
  }
}

const userController = new UserController();

export default userController;
