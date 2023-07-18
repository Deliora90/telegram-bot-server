import { convertOggToMp3 } from "@helpers/convertOggToMp3";

export const createMp3File = async (inputPath: string) => {
  let outputPath = "";
  try {
    if (inputPath.endsWith(".oga")) {
      outputPath = inputPath.replace(".oga", ".mp3");
      await convertOggToMp3(inputPath, outputPath);
    }
  } catch (error) {
    console.error("error", { error });
  }
  return outputPath;
};
