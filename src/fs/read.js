import { readFile } from "fs/promises";
import { ENOENT, ERROR_MESSAGE } from "../helpers/constants.mjs";
import { getDirname } from "../helpers/utils.mjs";

const dirname = getDirname(import.meta.url);
const file = `${dirname}/files/fileToRead.txt`;

const read = async (filePath) => {
  try {
    const content = await readFile(filePath, { encoding: "utf-8" });
    console.log(content);
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await read(file);
