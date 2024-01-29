import { createWriteStream } from "node:fs";
import { getDirname } from "../helpers/utils.mjs";
import { stdin, stdout } from "node:process";

const dirname = getDirname(import.meta.url);
const filename = "fileToWrite.txt";
const filePath = `${dirname}/files/${filename}`;

const write = async () => {
  const writable = createWriteStream(filePath);
  stdout.write(
    "Введите текст. После этого нажмите Ctrl + C и текст сохраниться в файле files/fileToWrite.txt \n"
  );
  stdin.pipe(writable);
};

await write();
