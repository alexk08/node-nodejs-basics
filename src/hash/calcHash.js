import { createReadStream } from "node:fs";
import { getDirname } from "../helpers/utils.mjs";

const dirname = getDirname(import.meta.url);
const filename = "fileToCalculateHashFor.txt";
const filePath = `${dirname}/files/${filename}`;

const calculateHash = async () => {
  const { createHash } = await import("node:crypto");
  const hash = createHash("sha256");

  const input = createReadStream(filePath);
  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      console.log(`SHA256 hash for file ${filename}: ${hash.digest("hex")}`);
    }
  });
};

await calculateHash();
