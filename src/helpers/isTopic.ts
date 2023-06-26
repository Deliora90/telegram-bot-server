import { Topics, TopicsType } from "@constants";

export const isTopic = (data: unknown): data is TopicsType =>
  data && typeof data === "string" && data.toUpperCase() in Topics;
