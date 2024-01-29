import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { getDirname, removeFile } from "../helpers/utils.mjs";
import { promisify } from "node:util";

const pipe = promisify(pipeline);

const compress = async () => {
  const dirname = getDirname(import.meta.url);
  const sourceFilename = "fileToCompress.txt";
  const sourceFilePath = `${dirname}/files/${sourceFilename}`;

  const archive = `${dirname}/files/archive.gz`;

  const gzip = createGzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(archive);

  try {
    await pipe(source, gzip, destination);
    await removeFile(sourceFilePath);
  } catch (err) {
    if (!err) return;

    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
};

await compress();
