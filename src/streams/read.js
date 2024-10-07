import { createReadStream } from "node:fs";
import { getDirname } from "../helpers/utils.mjs";
import { stdout } from "node:process";

const dirname = getDirname(import.meta.url);
const filename = "fileToRead.txt";
const filePath = `${dirname}/files/${filename}`;

const read = async () => {
  const input = createReadStream(filePath);
  input.pipe(stdout);
};

await read();
