const fs = require("fs");
const path = require("path");

function part1() {}

function part2() {}

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

module.exports = {
  part1,
  part2,
  parseFile,
};
