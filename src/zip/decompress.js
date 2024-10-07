import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { getDirname } from "../helpers/utils.mjs";
import { promisify } from "node:util";

const pipe = promisify(pipeline);

const decompress = async () => {
  const dirname = getDirname(import.meta.url);
  const archive = `${dirname}/files/archive.gz`;
  const targetFilename = "fileToCompress.txt";
  const targetFilePath = `${dirname}/files/${targetFilename}`;

  const gunzip = createGunzip();
  const source = createReadStream(archive);
  const destination = createWriteStream(targetFilePath);

  try {
    await pipe(source, gunzip, destination);
    console.log("Archive was unziped.");
  } catch (err) {
    if (!err) return;

    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
};

await decompress();
