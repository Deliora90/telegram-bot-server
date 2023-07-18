import fs from "fs";
import { createMp3File } from "@helpers/createMp3File";
import { downloadsFile } from "@helpers/downloadFile";
import { deleteFiles } from "@helpers/deleteFiles";

export class FileConverter {
  href: string;
  originalPath?: string;
  mp3Path?: string;
  constructor(href: string) {
    this.href = href;
  }

  async convertToMp3() {
    try {
      return await this.convertOgaToMp3();
    } catch (error) {
      console.error("FileConverter.convertToMp3", { error });
    }
  }

  cleanFilesAfterConverting() {
    deleteFiles([this.mp3Path, this.originalPath]);
    this.cleanPaths();
  }

  private cleanPaths() {
    this.setOriginalPath();
    this.setMp3Path();
  }

  private setOriginalPath(path?: string) {
    this.originalPath = path;
  }

  private setMp3Path(path?: string) {
    this.mp3Path = path;
  }

  private async convertOgaToMp3(): Promise<File> {
    let ogaPath = await downloadsFile(this.href, "./");
    let mp3Path = await createMp3File(ogaPath);
    this.setOriginalPath(ogaPath);
    this.setMp3Path(mp3Path);
    return fs.createReadStream(mp3Path) as any;
  }
}
