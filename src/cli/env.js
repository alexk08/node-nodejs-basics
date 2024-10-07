import { env } from "node:process";

const parseEnv = () => {
  const result = Object.entries(env)
    .filter(([key]) => /^RSS_/.test(key))
    .map((item) => item.join("="))
    .join("; ");
  console.log(result);
};

parseEnv();
