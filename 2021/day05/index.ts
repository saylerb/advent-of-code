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
    const [start, end] = rawRow
      .split(/\s+->\s+/)
      .map((rawCoords: string) => rawCoords.split(","))
      .map((coord: string[]) => coord.map((x: string) => parseInt(x, 10)))
      .map(([x, y]) => ({ x, y }));

    return { start, end };
  });
}

export function part2() {}
