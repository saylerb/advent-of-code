import { parseFile } from "./parseFile.js";

/**
 * count increases
 * @param depths an array of radar detected depths
 */

interface Result {
  prev?: number;
  total: number;
}

export function countIncreases(depths: number[]): number {
  const result = depths.reduce(
    (acc: Result, current: number, index: number) => {
      if (typeof acc.prev === "undefined") {
        return { ...acc, prev: current };
      } else {
        if (acc.prev < current) {
          return { prev: current, total: acc.total + 1 };
        } else {
          return { ...acc, prev: current };
        }
      }
    },
    { prev: undefined, total: 0 } as Result
  );

  return result.total;
}

export function processDepths(filename: string): number[] {
  const rows: string[] = parseFile(filename);
  const depths: number[] = rows.map((num) => parseInt(num, 10));

  return depths;
}
