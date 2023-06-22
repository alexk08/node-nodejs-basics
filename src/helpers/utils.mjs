import { dirname } from "path";
import { fileURLToPath } from "url";

export const getFilename = (url) => fileURLToPath(url);
export const getDirname = (url) => dirname(getFilename(url));
