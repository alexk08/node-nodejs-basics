import { open, writeFile } from "fs/promises";
import fs from "fs";

import { getDirname } from "../helpers/utils.mjs";
import { EEXIST, ERROR_MESSAGE } from "../helpers/constants.mjs";

const dirname = getDirname(import.meta.url);
const path = `${dirname}/files/fresh.txt`;
const text = "I am fresh and young";

//! Async implementation
const create = async (filePath, innerText) => {
  let fileHandle;

  try {
    fileHandle = await open(filePath, "wx");
    await writeFile(fileHandle, innerText);
  } catch (err) {
    if (err.code === EEXIST) {
      throw new Error(ERROR_MESSAGE);
    }

    throw err;
  } finally {
    await fileHandle?.close();
  }
};

//! Callback implementation
const createCb = (filePath, innerText) => {
  fs.open(filePath, "wx", (err, fd) => {
    if (err) {
      if (err.code === EEXIST) {
        throw new Error(ERROR_MESSAGE);
      }

      throw err;
    }

    try {
      fs.write(fd, innerText, (err) => {
        if (err) {
          throw err;
        }
      });
    } finally {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
};

await create(path, text);
// createCb(path, text);
