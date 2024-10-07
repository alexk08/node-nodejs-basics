import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

const transform = async () => {
  const reverseTr = new Transform({
    transform(chunk) {
      this.push(chunk.toString().split("").reverse().join(""));
    },
  });

  stdout.write(
    "Введите текст. После этого нажмите Enter - отобразится перевернутый текст. Чтобы выйти нажмите Ctrl + C \n"
  );
  stdin.pipe(reverseTr).pipe(stdout);
};

await transform();
