import { Worker } from "worker_threads";
import { getDirname } from "../helpers/utils.mjs";

const dirname = getDirname(import.meta.url);

const worker = new Worker(`${dirname}/worker.js`);
worker.postMessage(10);

worker.on("message", (result) => {
  console.log("Result of nthFibonacci(10): ", result, "\nPress Ctrl + C to exit");
});

const performCalculations = async () => {
  // Write your code here
};

await performCalculations();
