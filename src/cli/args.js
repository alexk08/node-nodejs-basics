import { argv } from "node:process";

const parseArgs = () => {
  const result = argv
    .slice(2)
    .reduce(
      (res, curr, idx, arr) =>
        !(idx % 2) ? res : [...res, [arr[idx - 1].slice(2), curr].join(" is ")],
      []
    )
    .join(", ");

  console.log(result);
};

parseArgs();
