import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function calculateLine(text) {
  if (text.indexOf("(") === -1) {
    return calculate(text);
  } else {
    return calculateLine(reduceNextParens(text, calculate));
  }
}

export function calculateLinePartTwo(text) {
  if (text.indexOf("(") === -1) {
    return reduceAddition(text);
  } else {
    return calculateLinePartTwo(reduceNextParens(text, reduceAddition));
  }
}

export function reduceAddition(text) {
  if (typeof text === "number") {
    return text;
  }

  const countOfAdditions = (text.match(/\+/g) || []).length;
  if (countOfAdditions === 0) {
    return calculate(text);
  }
  const matches = [...text.matchAll(/\d+\s\+\s\d+/g)];

  const firstMatch = matches[0][0];

  const replaced = text.replace(firstMatch, calculate(firstMatch));

  return reduceAddition(replaced);
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

export function part2(fileName) {
  const lines = parseFile(fileName);

  return lines
    .map((line) => calculateLinePartTwo(line))
    .reduce((acc, num) => acc + num, 0);
}

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

export function reduceNextParens(text, calcFn = calculate) {
  const index = text.indexOf("(");

  if (index === -1) {
    // Base case. If no parentheses exist, evaluate
    return calcFn(text);
  }

  // regex might only support 1 level of nested parentheses
  const matches = [...text.matchAll(/\(([^\)|^\(]+)\)/g)];

  if (matches.length === 0) {
    return text;
  } else {
    // replace all instances of parentheses with reduced value

    const result = matches.reduce((acc, match) => {
      const [withParens, betweenParens] = match;

      return acc.replace(withParens, reduceNextParens(betweenParens, calcFn));
    }, text);

    return result;
  }
}
