import axios from "axios";
import path from "path";
import fs from "fs";

export const downloadsFile = (url: string, outputDir: string) =>
  new Promise<string>((resolve, reject) => {
    axios({
      url: url,
      method: "GET",
      responseType: "stream",
    })
      .then((res) => {
        if (res.status !== 200) {
          reject(new Error(res.statusText));
        }
        let fileName = path.basename(url);
        const outputPath = path.join(outputDir, fileName);
        const writeStream = fs.createWriteStream(outputPath);
        res.data.pipe(writeStream);

        writeStream.on("finish", () => {
          writeStream.close(() => {
            resolve(outputPath);
          });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
