import { Worker } from "worker_threads";
import { getDirname } from "../helpers/utils.mjs";
import { cpus } from "os";

const performCalculations = async () => {
  // Write your code here
  const dirname = getDirname(import.meta.url);
  const cpuCount = cpus().length;
  const promises = [];
  const results = new Array(cpuCount);

  for (let i = 0; i < cpuCount; i++) {
    promises.push(
      new Promise((resolve) => {
        const worker = new Worker(`${dirname}/worker.js`);

        worker.postMessage(10 + i);

        worker.on("message", (message) => {
          results[i] = message;
          resolve();
        });

        worker.on("error", (errorMsg) => {
          results[i] = errorMsg;
          resolve();
        });
      })
    );
  }

  await Promise.all(promises);
  console.log(results);
};

await performCalculations();
