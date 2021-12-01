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

export function getLengthsOfGroupsOfContiguousNumbers(numbers) {
  const sorted = sort(numbers);

  const diffs = sorted.map((num, index, array) => {
    if (index === 0) {
      return;
    }

    return num - array[index - 1];
  });

  let currentCount = 1; // total diffs is 1 less than total numbers
  let counts = [];

  for (let i = 0; i < diffs.length; i++) {
    const current = diffs[i];

    if (current === 1) {
      currentCount++;
    } else {
      counts = counts.concat(currentCount);
      currentCount = 1;
    }

    if (i === diffs.length - 1) {
      counts = counts.concat(currentCount);
    }
  }

  return counts.filter((count) => count > 1);
}

export function part2(fileName) {
  const lines = parseFile(fileName);

  const numbers = linesToNumbers(lines);
  const withLeadingZero = [0, ...numbers];

  const lengths = getLengthsOfGroupsOfContiguousNumbers(withLeadingZero);

  return getNumberOfArrangements(lengths);
}

export function getNumberOfArrangements(groups) {
  return groups.reduce((acc, num) => {
    const tribMap = {
      2: 1,
      3: 2,
      4: 4,
      5: 7,
      6: 13,
    };
    acc = acc * tribMap[num];
    return acc;
  }, 1);
}

export function getDifferences(numbers) {
  let sorted = sort(numbers);
  const max = sorted[sorted.length - 1];
  sorted = sorted.concat(max + 3); // built-in always 3 higher than max

  let totals = { 1: 0, 2: 0, 3: 0 };

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
