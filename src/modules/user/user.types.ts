import { TopicsType } from "@constants";
import { RequestError } from "@models/content.types";
import { IUserDocument } from "./user.model";

export type UserParams = {
  telegramId: number;
  username?: string;
};

export type Result<T> = T | RequestError;

export interface IUserController {
  create: (params: UserParams) => Promise<Result<boolean>>;
  chooseTopic: (topic: TopicsType) => Promise<Result<boolean>>;
  findUser: (telegramId: number) => Promise<Result<IUserDocument | undefined>>;
}
