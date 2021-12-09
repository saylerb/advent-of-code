import { createExternalModuleExport } from "typescript";
import { parseFile } from "./parseFile";

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
    const [rawStart, rawEnd] = rawRow.split(/\s+->\s+/);

    const [startX, startY] = rawStart
      .split(",")
      .map((raw) => parseInt(raw, 10));
    const [endX, endY] = rawEnd.split(",").map((raw) => parseInt(raw, 10));

    const start: Point = { x: startX, y: startY };
    const end: Point = { x: endX, y: endY };

    return { start, end };
  });
}

export function part2() {}
