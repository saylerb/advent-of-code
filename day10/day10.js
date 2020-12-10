import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const lines = parseFile(fileName);

  const numbers = linesToNumbers(lines);

  const { 1: totalOnes, 3: totalThrees } = getDifferences(numbers);

  return totalOnes * totalThrees;
}

export function part2() {}

export function getDifferences(numbers) {
  const sorted = sort(numbers);
  const max = sorted[sorted.length - 1];
  const buildInJoltage = max + 3;

  let totals = { 1: 0, 2: 0, 3: 1 }; // built-in always 3 higher than max

  let prevJoltageRating = 0;

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];

    const diff = current - prevJoltageRating;

    totals = { ...totals, [diff]: totals[diff] + 1 };
    prevJoltageRating = current;
  }

  return totals;
}

export function linesToNumbers(lines) {
  return lines.map((line) => parseInt(line));
}

export function sort(numbers) {
  return numbers.sort((a, b) => a - b);
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
