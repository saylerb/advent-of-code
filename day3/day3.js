import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getValue(topology, x, y) {
  const row = topology[y];

  if (typeof row === "undefined") {
    return undefined;
  }

  const index = x % row.length;

  return row[index];
}

function coordinatesForTurn(turnNumber, slopeX = 3, slopeY = 1) {
  return [turnNumber * slopeX, slopeY * turnNumber];
}

function isTree(value) {
  return value === "#";
}

function valueForTurn(topology, turnNumber, slopeX, slopeY) {
  const [x, y] = coordinatesForTurn(turnNumber, slopeX, slopeY);

  const value = getValue(topology, x, y);

  return value;
}

function valuesForTopology(topology, slopeX, slopeY) {
  let values = [];

  for (let turn = 0; turn < topology.length; turn++) {
    const value = valueForTurn(topology, turn + 1, slopeX, slopeY);

    if (typeof value === "undefined") {
      break;
    }

    values = values.concat(value);
  }

  return values;
}

function countTrees(values) {
  return values.reduce((acc, value) => {
    if (isTree(value)) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
}

function parseFile(filename) {
  let data;
  let rows;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    rows = data.split("\n");
  } catch (err) {
    console.error(err);
  }

  return rows;
}

function main(filename, startingCoords) {
  const topology = parseFile(filename);

  const result = startingCoords.map(([slopeX, slopeY]) => {
    // console.log({ slopeX, slopeY });
    const values = valuesForTopology(topology, slopeX, slopeY);

    return countTrees(values);
  });

  return result;
}

export default {
  getValue,
  coordinatesForTurn,
  valueForTurn,
  valuesForTopology,
  countTrees,
  parseFile,
  main,
};
