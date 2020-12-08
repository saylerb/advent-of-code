import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createRules(fileName) {
  const lines = parseFile(fileName).map((line) => convert(line));

  const rules = lines.reduce((acc, line) => {
    acc = { ...acc, ...line };
    return acc;
  }, {});

  return rules;
}

function part1(fileName, bagToFind = "shiny gold") {
  const rules = createRules(fileName);
  return count(rules, bagToFind);
}

function count(rules, bagToFind) {
  return Object.keys(rules)
    .map((color) => traverse(rules, bagToFind, color))
    .reduce((acc, bagfoundInside) => {
      if (bagfoundInside) {
        acc++;
      }
      return acc;
    }, 0);
}

function traverseTotal(map, currentBag) {
  const total = 0;
  const contents = map[currentBag];

  if (contents.length === 0) {
    return 0;
  }

  return contents.reduce((acc, { num, color }) => {
    acc = acc + num + num * traverseTotal(map, color);
    return acc;
  }, 0);
}

function part2(fileName) {
  const rules = createRules(fileName);

  return traverseTotal(rules, "shiny gold");
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

function checkContentsForColor(contents, color) {
  return contents.some((content) => content.color === color);
}

function traverse(map, bagColor, currentColor) {
  let checks = [];
  const contents = map[currentColor];

  if (contents.length === 0) {
    //console.log("zero, quitting")
    return false;
  }

  if (checkContentsForColor(contents, bagColor)) {
    //console.log("contents contains shiny gold!")
    return true;
  }

  contents.forEach((bag) => {
    checks = checks.concat(traverse(map, bagColor, bag.color));
  });

  const result = checks.some((check) => check);

  return result;
}

function convert(line) {
  const [bag, rawContents] = line
    .split("bags contain")
    .map((bags) => bags.trim());

  if (rawContents === "no other bags.") {
    return { [bag]: [] };
  }

  const ans = {};
  const regex = /(bag+?)(s\b|\b)/g;
  const contents = rawContents
    .split(",")
    .map((bag) => bag.replace(regex, ""))
    .map((bag) => bag.replace(".", ""))
    .map((bag) => bag.trim());

  ans[bag] = contents.map((bag) => ({
    num: parseInt(bag[0]),
    color: bag.substring(1, bag.length).trim(),
  }));

  return ans;
}

export default {
  part1,
  part2,
  parseFile,
  convert,
  count,
  traverseTotal,
  traverse,
};
