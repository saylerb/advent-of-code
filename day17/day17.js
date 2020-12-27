import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { PocketDimension } from "./PocketDimension";

export function part1(fileName) {
  const lines = parseFile(fileName);

  const pocket = PocketDimension.create(lines);

  for (let i = 0; i < 6; i++) {
    pocket.next();
  }

  return pocket.totalActive();
}

export function part2() {}

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
