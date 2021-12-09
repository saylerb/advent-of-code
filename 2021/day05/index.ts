import { parseFile } from "./parseFile.js";

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

export function parseLines(fileName: string): Line[] {
  const rawRows = parseFile(fileName);

  return rawRows.map((rawRow) => {
    const [start, end] = rawRow
      .split(/\s+->\s+/)
      .map((rawCoords: string) => rawCoords.split(","))
      .map((coord: string[]) => coord.map((x: string) => parseInt(x, 10)))
      .map(([x, y]) => ({ x, y }));

    return { start, end };
  });
}

export function horizontalAndVerticalFilter(lines: Line[]) {
  return lines.filter((line) => {
    return line.start.x === line.end.x || line.start.y === line.end.y;
  });
}

export function calculatePointsCoveredByALine(line: Line) {
  const { start, end } = line;

  const slope = (end.y - start.y) / (end.x - start.x);
  const negativeSlope = slope < 0 || (slope === 0 && 1 / slope === -Infinity); // RHS: check for negative zero

  let current = { ...start };
  let points: Point[] = [{ ...start }];

  while (current.y !== end.y || current.x !== end.x) {
    if (slope === Infinity) {
      // vertical line with positive slope
      current = { ...current, y: current.y + 1 };
    }

    if (slope === -Infinity) {
      // vertical line with negative slope
      current = { ...current, y: current.y - 1 };
    }

    if (slope === 0) {
      //horizontal line
      current = {
        ...current,
        x: negativeSlope ? current.x - 1 : current.x + 1,
      };
    }
    points = [...points, current];
  }

  return points;
}

export function countPoints(points: Point[]) {
  const map = new Map();
  // using Map with stringified keys
  // instead of using WeakMap, since it is not enumerable

  points.forEach((point) => {
    const stringKey = JSON.stringify(point);
    if (typeof map.get(stringKey) === "undefined") {
      map.set(stringKey, 1);
    } else {
      const currentValue = map.get(stringKey);
      map.set(stringKey, currentValue + 1);
    }
  });

  let totalPointsWithAtLeastTwoLines = 0;

  for (const value of map.values()) {
    if (value > 1) {
      totalPointsWithAtLeastTwoLines += 1;
    }
  }

  return { totalPointsWithAtLeastTwoLines };
}
