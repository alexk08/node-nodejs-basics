import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

parentPort.on("message", (n) => {
  const result = nthFibonacci(n);
  sendResult(result);
});

const sendResult = (result) => {
  // This function sends result of nthFibonacci computations to main thread
  parentPort.postMessage(result);
};

// sendResult();
