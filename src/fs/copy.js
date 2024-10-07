import { cp } from "fs/promises";

import { getDirname } from "../helpers/utils.mjs";
import { ENOENT, ERROR_MESSAGE, ERR_FS_CP_EEXIST } from "../helpers/constants.mjs";

const dirname = getDirname(import.meta.url);
const src = `${dirname}/files`;
const dest = `${dirname}/files_copy`;

const copy = async (source, destination) => {
  try {
    await cp(source, destination, { recursive: true, force: false, errorOnExist: true });
  } catch (err) {
    if (err.code === ERR_FS_CP_EEXIST || err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await copy(src, dest);
