import fs from "fs/promises";
import { existsSync } from "fs";

import { getDirname } from "../helpers/utils.mjs";
import { ENOENT, ERROR_MESSAGE } from "../helpers/constants.mjs";

const dirname = getDirname(import.meta.url);

const oldPath = `${dirname}/files/wrongFilename.txt`;
const newPath = `${dirname}/files/properFilename.md`;

const rename = async (oldPath, newPath) => {
  try {
    if (existsSync(newPath)) {
      throw new Error(ERROR_MESSAGE);
    }
    await fs.rename(oldPath, newPath);
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
    
  }
};

await rename(oldPath, newPath);
