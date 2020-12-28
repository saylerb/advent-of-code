import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function calculate(text) {
  const chars = text.split("").filter((input) => input !== " ");

  let memory = 0;
  let operator = "+";

  for (let char of chars) {
    const num = parseInt(char);

    if (isNaN(num)) {
      operator = char;
    } else {
      memory = operators[operator](memory, num);
    }
  }

  return memory;
}

const operators = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
};

export function part1() {}

export function part2() {}

export function parseFile(filename) {
  let data;
  let rows;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    rows = data.split("\n").filter((row) => row !== "");
  } catch (err) {
    console.error(err);
  }

  return rows;
}
