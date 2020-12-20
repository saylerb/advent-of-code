import fs from "fs";
import path, { parse } from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const lines = parseFile(fileName);

  let currentMask;

  let memory = {};

  lines.forEach((line) => {
    const [instruction, numToWrite] = line
      .split("=")
      .map((part) => part.trim());

    if (instruction === "mask") {
      currentMask = line.substring(line.indexOf("=") + 2);
    }

    if (instruction.indexOf("mem") >= 0) {
      const address = parseInt(instruction.match(/\d+/g)[0]);

      memory[address] = applyMaskToNumber(currentMask, parseInt(numToWrite));
    }
  });

  return Object.values(memory).reduce((acc, num) => (acc += num), 0);
}

export function part2(fileName) {
  const lines = parseFile(fileName);

  let currentMask;

  let memory = {};

  lines.forEach((line) => {
    const [instruction, numToWrite] = line
      .split("=")
      .map((part) => part.trim());

    if (instruction === "mask") {
      currentMask = line.substring(line.indexOf("=") + 2);
    }

    if (instruction.indexOf("mem") >= 0) {
      const address = parseInt(instruction.match(/\d+/g)[0]);

      const expandedAddresses = applyMaskToAddress(
        currentMask,
        parseInt(address)
      );

      expandedAddresses.forEach((address) => {
        memory[address] = parseInt(numToWrite);
      });
    }
  });

  return Object.values(memory).reduce((acc, num) => (acc += num), 0);
}

export function applyMaskToNumber(mask, number) {
  const newNumber = applyMask(mask, number, part1MaskFunction);

  return parseInt(newNumber, 2);
}

const part1MaskFunction = ([bit, maskValue]) => {
  if (maskValue === "X") {
    return bit;
  }

  return maskValue;
};

const part2MaskFunction = ([bit, maskValue]) => {
  if (maskValue === "0") {
    return bit;
  }

  if (maskValue === "1") {
    return "1";
  }

  if (maskValue === "X") {
    return "X";
  }
};

export function applyMask(mask, number, fn = part1MaskFunction) {
  const binaryNumber = number.toString(2).padStart(36, "0");

  const reversedMask = mask.split("").slice(0).reverse();
  const reversedNumber = binaryNumber.split("").slice(0).reverse();

  const zipped = reversedNumber.map((bit, index) => {
    return [bit, reversedMask[index]];
  });

  const result = zipped.map(fn);

  const joined = result.slice(0).reverse().join("");

  return joined;
}

export function applyMaskToAddress(mask, number) {
  const newNumber = applyMask(mask, number, part2MaskFunction);

  if (newNumber.indexOf("X") === -1) {
    return newNumber;
  }

  const floatingIndices = [];
  let index = newNumber.indexOf("X");
  while (index != -1) {
    floatingIndices.push(index);

    index = newNumber.indexOf("X", index + 1);
  }

  let expandedNumbers = [newNumber.slice(0)];

  for (let i = 0; i < floatingIndices.length; i++) {
    let index = floatingIndices[i];

    expandedNumbers = expandedNumbers.flatMap((expanded) => {
      let result = [];
      let copy = [...expanded];

      copy[index] = "1";

      result.push(copy.join(""));
      copy[index] = "0";

      result.push(copy.join(""));

      return result;
    });
  }

  return expandedNumbers.map((expanded) => parseInt(expanded, 2));
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
