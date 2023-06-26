import { RequestError } from "@generalTypes/content";

export const isRequestError = (error: unknown): error is RequestError =>
  !!error &&
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof error.message === "string";
