import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

export const convertOggToMp3 = (inputFile: string, outputFile: string) =>
  new Promise<string>((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg(inputFile)
      .format("mp3")
      .audioQuality(96)
      .output(outputFile)
      .on("error", (error) => reject(`Encoding Error: ${error.message}`))
      .on("end", () => resolve(outputFile))
      .run();
  });
