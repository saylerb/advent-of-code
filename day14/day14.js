import fs from "fs";
import path, { parse } from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const lines = parseFile(fileName);

  let currentMask;

  let memory = {};

  lines.forEach((line) => {
    const [part1, part2] = line.split("=").map((part) => part.trim());

    if (part1 === "mask") {
      currentMask = line.substring(line.indexOf("=") + 2);
    }

    if (part1.indexOf("mem") >= 0) {
      const number = parseInt(part1.match(/\d+/g)[0]);

      memory[number] = applyMask(currentMask, parseInt(part2));
    }
  });

  return Object.values(memory).reduce((acc, num) => (acc += num), 0);
}

export function part2() {}

export function applyMask(mask, number) {
  const binaryNumber = number.toString(2).padStart(36, "0");

  const reversedMask = mask.split("").slice(0).reverse();
  const reversedNumber = binaryNumber.split("").slice(0).reverse();

  const result = reversedNumber.map((bit, index) => {
    const maskValue = reversedMask[index];

    if (maskValue === "X") {
      return bit;
    }

    return reversedMask[index];
  });

  const bin = result.slice(0).reverse().join("");

  return parseInt(bin, 2);
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
