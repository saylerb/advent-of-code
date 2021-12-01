import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const lines = parseFile(fileName);
  const equi = getEquilibrium(lines, getAdjacentSeats);
  return countAllOccupiedSeats(equi);
}

export function part2(fileName) {
  const lines = parseFile(fileName);
  const equi = getEquilibrium(lines, allNextVisibleSeats);
  return countAllOccupiedSeats(equi);
}

export function getPosition({ graph, x, y }) {
  const row = graph[y];

  return typeof row !== "undefined" ? graph[y][x] : undefined;
}

export function isTheSame(one, two) {
  if (one.length !== two.length) {
    return false;
  }

  return two.every((row, index) => {
    return row === one[index];
  });
}
export function getEquilibrium(start, lookupFunction) {
  let rounds = 0;
  let current = [...start];
  let prevRound = [];

  for (let i = 0; i < 1000000000000000; i++) {
    if (isTheSame(prevRound, current)) {
      break;
    }

    prevRound = [...current];
    current = nextRound(current, lookupFunction);
    rounds++;
  }

  return current;
}

export function nextRound(currentRound, lookupFunction) {
  return currentRound.map((row, y) => {
    return row
      .split("")
      .map((current, x) => {
        const seatsOfInterest = lookupFunction({ graph: currentRound, x, y });

        const totalOccupied = countOccupiedSeats(seatsOfInterest);

        if (lookupFunction === allNextVisibleSeats) {
          return nextValue({ current, totalOccupied, max: 5 });
        }

        return nextValue({ current, totalOccupied, max: 4 });
      })
      .join("");
  });
}

export function nextValue({ current, totalOccupied, max }) {
  if (current === "L" && totalOccupied === 0) {
    return "#";
  }

  if (current === "#" && totalOccupied >= max) {
    return "L";
  }

  return current;
}

const DIRECTION_MAP = {
  N: { x: 0, y: -1 },
  NE: { x: 1, y: -1 },
  E: { x: 1, y: 0 },
  SE: { x: 1, y: 1 },
  S: { x: 0, y: 1 },
  SW: { x: -1, y: 1 },
  W: { x: -1, y: 0 },
  NW: { x: -1, y: -1 },
};

export function findNextVisibleSeat({
  graph,
  direction,
  x: startX,
  y: startY,
}) {
  let found;
  let prev = { x: startX, y: startY };

  while (typeof found === "undefined") {
    const { x, y } = nextCoordForDirection({
      direction,
      x: prev.x,
      y: prev.y,
    });

    const seat = getPosition({ graph, x, y });
    if (typeof seat === "undefined") {
      // if out of bounds return
      found = {};
    }
    if (seat === "L" || seat === "#") {
      found = { x, y, seat };
    }

    prev = { x, y };
  }

  return found;
}

export function getAdjacentSeats({ graph, x, y }) {
  const coords = getAdjacentCoords({ x, y });

  return coords.map(({ x, y }) => {
    return getPosition({ graph, x, y });
  });
}

export function allNextVisibleSeats({ graph, x, y }) {
  const allSeats = Object.keys(DIRECTION_MAP)
    .map((direction) => {
      return findNextVisibleSeat({ graph, direction, x, y });
    })
    .map(({ seat }) => {
      return { seat };
    })
    .filter(({ seat }) => typeof seat !== "undefined")
    .map((seat) => {
      return seat.seat;
    });

  return allSeats;
}

export function nextCoordForDirection({ direction, x: inputX, y: inputY }) {
  const { x, y } = DIRECTION_MAP[direction];
  return {
    x: inputX + x,
    y: inputY + y,
  };
}

export function getAdjacentCoords({ x, y }) {
  return Object.keys(DIRECTION_MAP).map((direction) => {
    return nextCoordForDirection({ direction, x, y });
  });
}

export function countOccupiedSeats(seats) {
  return countSeat(seats, "#");
}

export function countOpenSeats(seats) {
  return countSeat(seats, "L");
}

export function countAllOccupiedSeats(graph) {
  return graph.reduce((acc, row) => {
    acc = acc + countOccupiedSeats(row.split(""));
    return acc;
  }, 0);
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

function countSeat(seats, seatToCount) {
  return seats.reduce((acc, seat) => {
    if (seat === seatToCount) {
      acc++;
    }
    return acc;
  }, 0);
}
