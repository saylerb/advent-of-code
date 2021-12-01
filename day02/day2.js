import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function countPasswords(file, fn) {
  const lines = parseFile(file);

  const count = lines.reduce((acc, line) => {
    if (fn(line)) {
      acc++;
    }
    return acc;
  }, 0);

  return count;
}

function parseFile(filename) {
  let data;
  let lines;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    lines = data
      .split("\n")
      .filter((rawLine) => rawLine !== "")
      .map((rawLine) => parseLine(rawLine));
  } catch (err) {
    console.error(err);
  }

  return lines;
}

function parseLine(numbers) {
  const ans = {};
  const [one, two, three] = numbers.split(" ");

  const [min, max] = one.split("-").map((num) => parseInt(num));
  const char = two.replace(":", "");

  return { min, max, char, password: three };
}

function isValid({ min, max, char, password }) {
  const count = password.split("").reduce((acc, letter) => {
    if (letter === char) {
      acc++;
    }
    return acc;
  }, 0);

  return min <= count && count <= max;
}

function isValidTwo({ min, max, char, password }) {
  const pos1 = password[min - 1] === char;
  const pos2 = password[max - 1] === char;

  return [pos1, pos2].filter((ans) => ans === true).length === 1;
}

export default {
  parseLine,
  isValid,
  parseFile,
  countPasswords,
  isValidTwo,
};
