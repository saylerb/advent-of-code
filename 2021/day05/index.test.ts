import { parseLines, horizontalAndVerticalFilter } from "./index.js";

describe("part 1", () => {
  test("can parse input into lines", () => {
    const lineOne = { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } };
    const lineTwo = { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } };

    expect(parseLines("test.txt")).toEqual([lineOne, lineTwo]);
  });

  test("can filter for horizontal and vertical lines only", () => {
    const horizontalLine = { start: { x: 5, y: 9 }, end: { x: 0, y: 9 } };
    const verticalLine = { start: { x: 1, y: 0 }, end: { x: 1, y: 8 } };
    const diagonalLine = { start: { x: 1, y: 0 }, end: { x: 4, y: 8 } };

    expect(
      horizontalAndVerticalFilter([horizontalLine, verticalLine, diagonalLine])
    ).toEqual(expect.arrayContaining([verticalLine, horizontalLine]));
  });
});

describe("part 2", () => {});
