import { spawn } from "child_process";
import { getDirname } from "../helpers/utils.mjs";
import { homedir } from "os";

const spawnChildProcess = async (args) => {
  // Write your code here
  const filename = `${getDirname(import.meta.url)}/files/script.js`;
  const cp = spawn("node", [filename, ...args], {
    stdio: ["pipe", "pipe", "inherit", "ipc"],
    cwd: homedir(),
  });

  process.stdin.pipe(cp.stdin);
  cp.stdout.pipe(process.stdout);

  cp.on("error", (error) => {
    console.error(`Error in child process: ${error.message}`);
  });

  cp.on("exit", (code, signal) => {
    console.log(`Child process exited with code ${code} and signal ${signal}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 3]);
