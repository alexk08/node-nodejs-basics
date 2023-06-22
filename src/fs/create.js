import { open, writeFile } from "fs/promises";
// import { open, close, write } from "fs";

const path = "./files/fresh.txt";
const innerText = "I am fresh and young";
const errorMessage = "FS operation failed";

const create = async () => {
  let fileHandle;

  try {
    fileHandle = await open(path, "wx");
    await writeFile(fileHandle, innerText);
  } catch (err) {
    if (err.code === "EEXIST") {
      throw new Error(errorMessage);
    }

    throw err;
  } finally {
    await fileHandle?.close();
  }
};

await create();

//! Callback implementation
// const create = () => {
//   open(path, "wx", (err, fd) => {
//     if (err) {
//       if (err.code === "EEXIST") {
//         throw new Error(errorMessage);
//       }

//       throw err;
//     }

//     try {
//       write(fd, innerText, (err) => {
//         if (err) {
//           throw err;
//         }
//       });
//     } finally {
//       close(fd, (err) => {
//         if (err) throw err;
//       });
//     }
//   });
// };

// create();
