import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function part1(fileName) {
  const groups = parseFile(fileName);

  const totalForEachGroup = groups.map((group) => {
    return countAny(group.join(""));
  });

  return totalForEachGroup.reduce((acc, total) => {
    acc = acc + total;
    return acc;
  }, 0);
}

function part2(fileName) {
  const groups = parseFile(fileName);

  const totalForEachGroup = groups.map((group) => {
    const groupSize = group.length;

    return countEvery(group.join(""), groupSize);
  });

  return totalForEachGroup.reduce((acc, total) => {
    acc = acc + total;
    return acc;
  }, 0);
}

function countEvery(group, groupSize) {
  const counts = countGroup(group);

  let total = 0;
  Object.keys(counts).map((answer) => {
    if (counts[answer] === groupSize) {
      total = total + 1;
    }
  });

  return total;
}

function countAny(group) {
  const counts = countGroup(group);

  return Object.keys(counts).length;
}

function countGroup(group) {
  const counts = group.split("").reduce((acc, ans) => {
    if (typeof acc[ans] === "undefined") {
      acc[ans] = 1;
    } else {
      acc[ans] = acc[ans] + 1;
    }
    return acc;
  }, {});

  return counts;
}

function parseFile(filename) {
  let data;
  let groups;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    groups = data.split("\n\n");
  } catch (err) {
    console.error(err);
  }

  return groups.map((group) =>
    group.split("\n").filter((person) => person !== "")
  );
}

export default {
  part1,
  part2,
  parseFile,
  countGroup,
  countAny,
  countEvery,
};
