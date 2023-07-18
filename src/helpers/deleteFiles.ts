import fs from "fs";

export const deleteFiles = (paths: string[]) => {
  for (const path of paths) {
    deleteFile(path);
  }
};

export const deleteFile = (path: string) =>
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
