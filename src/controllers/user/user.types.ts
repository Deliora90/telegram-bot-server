import { Topics } from "@constants";

export type UserParams = {
  telegramId: number;
  username?: string;
};

export type RequestError = {
  message: string;
};

export type Result = boolean | RequestError;

export interface IUser {
  create: (params: UserParams) => Promise<Result>;
  chooseTopic: (topic: Topics) => Promise<Result>;
}
