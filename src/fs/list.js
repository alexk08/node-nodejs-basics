import { opendir } from "fs/promises";
import { ENOENT, ERROR_MESSAGE } from "../helpers/constants.mjs";
import { getDirname } from "../helpers/utils.mjs";

const dirname = getDirname(import.meta.url);
const dirPath = `${dirname}/files`;

const list = async (dirPath) => {
  try {
    const dir = await opendir(dirPath);
    const fileNames = [];

    for await (const dirent of dir) {
      fileNames.push(dirent.name);
    }

    console.log(fileNames);
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await list(dirPath);
