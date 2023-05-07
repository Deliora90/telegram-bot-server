import { OpenAIApi } from "openai";
import fs from "fs";
import { transcribe } from "@api/openai";
import { downloadsFile } from "@helpers/downloadFile";
import { createMp3File } from "@helpers/createMp3File";
import { deleteFiles } from "@helpers/deleteFiles";

export const speechToText = async (openai: OpenAIApi, href: string) => {
  let ogaPath = await downloadsFile(href, "./");
  let mp3Path = await createMp3File(ogaPath);
  const file = fs.createReadStream(mp3Path) as any;
  const response = await transcribe(openai, file);
  deleteFiles([mp3Path, ogaPath]);
  return response;
};
