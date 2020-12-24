import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {}

export function part2() {}

export function getSurroundingCubes({ x, y, z }) {
  const result = [];
  for (let newX = x - 1; newX <= x + 1; newX++) {
    for (let newY = y - 1; newY <= y + 1; newY++) {
      for (let newZ = z - 1; newZ <= z + 1; newZ++) {
        const notCurrentCube = newX.x !== x && newY.y !== y && newZ.z !== z;
        if (notCurrentCube) {
          result.push({ x: newX, y: newY, z: newZ });
        }
      }
    }
  }

  return result;
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
