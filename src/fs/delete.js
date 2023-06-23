import { rm } from "fs/promises";
import { getDirname } from "../helpers/utils.mjs";
import { ENOENT, ERROR_MESSAGE } from "../helpers/constants.mjs";

const dirname = getDirname(import.meta.url);
const filePath = `${dirname}/files/fileToRemove.txt`;

const remove = async (path) => {
  try {
    await rm(path);
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await remove(filePath);
