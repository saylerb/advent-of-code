import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName, preambleSize) {
  const lines = parseFile(fileName);
  const numbers = linesToNumbers(lines);

  return getFirstInvalidNumber(numbers, preambleSize);
}

export function part2(fileName, magicNum) {
  const lines = parseFile(fileName);
  const numbers = linesToNumbers(lines);

  return getContiguousMinMaxSum(numbers, magicNum);
}

export function getPreviousNumbers(list, currentIndex, numberOfNumbers) {
  const diff = currentIndex - numberOfNumbers;
  if (diff < 0) {
    return list.slice(0, currentIndex);
  }

  return list.slice(diff, currentIndex);
}

export function findTwoNumbersThatAddToSum(list, magicNumber) {
  const sorted = sortDesc(list);

  // Pointless optimization? Maybe
  // First check that the two largest numbers summed are greater than the magic number
  // If they are less than the magic number, it's not possible to find numbers that sum to the number
  const twoLargestNumbers = sorted.slice(0, 2);
  const sumOfTwoLargestNumbers = sumList(twoLargestNumbers);
  if (sumOfTwoLargestNumbers < magicNumber) {
    return [];
  }

  for (let i = 0; i < list.length; i++) {
    for (let t = 0; t < list.length; t++) {
      const num1 = list[i];
      const num2 = list[t];
      if (num1 + num2 === magicNumber) {
        return [num1, num2];
      }
    }
  }

  return [];
}

export function getFirstInvalidNumber(list, size) {
  let currentPosition = size;
  let foundInvalid;

  while (typeof foundInvalid === "undefined") {
    const currentNumber = list[currentPosition];

    const subList = getPreviousNumbers(list, currentPosition, size);

    const result = findTwoNumbersThatAddToSum(subList, currentNumber);

    if (result.length === 0) {
      foundInvalid = currentNumber;
    }

    currentPosition++;
  }

  return foundInvalid;
}

function sumList(list) {
  return list.reduce((acc, num) => {
    acc = acc + num;
    return acc;
  }, 0);
}

export function getContiguousNumbers(list, magicNum) {
  let currentList = [];

  for (let currentIndex = 0; currentIndex < list.length; currentIndex++) {
    for (let i = currentIndex; i < list.length; i++) {
      currentList = currentList.concat(list[i]);
      const sum = sumList(currentList);

      if (sum > magicNum) {
        currentList = [];
        break;
      }

      if (sum === magicNum) {
        return currentList;
      }
    }
  }
}

export function getContiguousMinMaxSum(list, magicNum) {
  const contiguous = getContiguousNumbers(list, magicNum);

  const sorted = sortAsc(contiguous);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  return min + max;
}

function parseFile(filename) {
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

function linesToNumbers(lines) {
  return lines.map((line) => parseInt(line));
}

function sortDesc(list) {
  return list.sort((a, b) => b - a);
}

function sortAsc(list) {
  return list.sort((a, b) => b - a);
}
