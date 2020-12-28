import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function calculateLine(text) {
  if (text.indexOf("(") === -1) {
    return reduceNextParens(text);
  } else {
    return calculateLine(reduceNextParens(text));
  }
}

export function calculate(text) {
  const chars = text.split(" ").filter((input) => input !== " ");

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

export function part1(fileName) {
  const lines = parseFile(fileName);

  return lines
    .map((line) => calculateLine(line))
    .reduce((acc, num) => acc + num, 0);
}

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

export function reduceNextParens(text) {
  const index = text.indexOf("(");

  if (index === -1) {
    // Base case. If no parentheses exist, evaluate
    return calculate(text);
  }

  const matches = [...text.matchAll(/\(([^\)|^\(]+)\)/g)];

  if (matches.length === 0) {
    return text;
  } else {
    // replace all instances of parentheses with reduced value

    return matches.reduce((acc, match) => {
      const [withParens, betweenParens] = match;

      return acc.replace(withParens, reduceNextParens(betweenParens));
    }, text);
  }
}
