const fs = require("fs");
const path = require("path");

function getCol(code) {
  return code.substring(code.length - 3);
}
function getRow(code) {
  return code.substring(0, 7);
}

function nextMinMax(min, max, instruction) {
  const midPoint = Math.floor((max + 1 - min) / 2) + min;

  if (instruction === "F" || instruction === "L") {
    return [min, midPoint - 1];
  }

  if (instruction === "B" || instruction === "R") {
    return [midPoint, max];
  }

  console.log("ah you shouldn't have got here");
}

function search(min, max, instructions) {
  let currentMin = min;
  let currentMax = max;

  instructions.forEach((instruction) => {
    [currentMin, currentMax] = nextMinMax(currentMin, currentMax, instruction);
  });

  if (currentMin === currentMax) {
    return currentMin;
  }
}

function getSeatInfo(code) {
  const rowInstructions = getRow(code).split("");
  const colCode = getCol(code).split("");

  const rowNum = search(0, 127, rowInstructions);
  const colNum = search(0, 7, colCode);
  const id = rowNum * 8 + colNum;

  return [rowNum, colNum, id];
}

function part1(fileName) {
  const codes = parseFile(fileName);

  return codes.reduce((acc, code) => {
    const [row, col, id] = getSeatInfo(code);

    if (id > acc) {
      acc = id;
    }
    return acc;
  }, 0);
}

function part2(fileName) {
  let allIds = allSeatIds();
  const seatInfos = parseFile(fileName).map((code) => getSeatInfo(code));

  const remainingInfos = seatInfos.reduce((acc, info) => {
    const [row, col, id] = info;

    const { [id]: removed, ...rest } = acc;
    acc = rest;
    return acc;
  }, allIds);

  const remainingIds = Object.keys(remainingInfos);

  let front = remainingIds[0];
  let mid = remainingIds[1];
  let myId;

  remainingIds.forEach((back, index) => {
    if (index === 0 || index === 1) {
      return;
    }

    if (Math.abs(front - mid) > 1 && Math.abs(back - mid) > 1) {
      myId = mid;
    }

    front = mid;
    mid = back;
  });

  return parseInt(myId);
}

function allSeatIds() {
  let allSeatIds = {};

  for (let i = 0; i < 128; i++) {
    for (let c = 0; c < 8; c++) {
      const seatId = i * 8 + c;
      allSeatIds[seatId] = { row: i, col: c };
    }
  }

  return allSeatIds;
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

module.exports = {
  part1,
  getSeatInfo,
  part2,
  parseFile,
  nextMinMax,
  allSeatIds,
};
