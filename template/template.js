import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

export default {
  part1,
  part2,
  parseFile,
};
