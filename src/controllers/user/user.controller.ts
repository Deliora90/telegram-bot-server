import { Topics } from "@constants";
import { UserParams, IUser } from "./user.types";
import User from "@models/User";

class UserController implements IUser {
  async create(params: UserParams) {
    try {
      const user = new User(params);
      await user.save();
      return true;
    } catch (error) {
      console.error(error);
      return Promise.reject({ message: "Error creating user" });
    }
  }
  async chooseTopic(topic: Topics) {
    return false;
  }
}

const userController = new UserController();

export default userController;
