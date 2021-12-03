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

export function getWindowSums(depths: number[]): number[] {
  let left: number = 0;
  let middle: number = 1;
  let right: number = 2;

  let result: number[] = [];

  while (right < depths.length) {
    result = [...result, depths[left] + depths[middle] + depths[right]];

    left += 1;
    middle += 1;
    right += 1;
  }

  return result;
}

export function processDepths(filename: string): number[] {
  const rows: string[] = parseFile(filename);
  const depths: number[] = rows.map((num) => parseInt(num, 10));

  return depths;
}
