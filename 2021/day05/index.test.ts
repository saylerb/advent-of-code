import {
  parseLines,
  horizontalAndVerticalFilter,
  calculatePointsCoveredByALine,
  countPoints,
} from "./index.js";

describe("part 1", () => {
  test("can parse input into lines", () => {
    const lineOne = { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } };
    const lineTwo = { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } };

    expect(parseLines("test.txt")).toEqual(
      expect.arrayContaining([lineOne, lineTwo])
    );
  });

  test("can filter for horizontal and vertical lines only", () => {
    const verticalLine = { start: { x: 5, y: 9 }, end: { x: 0, y: 9 } };
    const horizontalLine = { start: { x: 1, y: 0 }, end: { x: 1, y: 8 } };
    const diagonalLine = { start: { x: 1, y: 0 }, end: { x: 4, y: 8 } };

    expect(
      horizontalAndVerticalFilter([verticalLine, horizontalLine, diagonalLine])
    ).toEqual(expect.arrayContaining([verticalLine, horizontalLine]));
  });

  test("calculates which points in space are covered by a line vertical lines", () => {
    const verticalLine = { start: { x: 1, y: 1 }, end: { x: 1, y: 3 } };

    expect(calculatePointsCoveredByALine(verticalLine)).toEqual(
      expect.arrayContaining([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ])
    );
  });

  test("calculates which points in space are covered by a line vertical lines with negative slope", () => {
    const verticalLine = { start: { x: 1, y: 3 }, end: { x: 1, y: 1 } };

    expect(calculatePointsCoveredByALine(verticalLine)).toEqual(
      expect.arrayContaining([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ])
    );
  });

  test("calculates which points in space are covered by a line horizontal lines", () => {
    const horizontalLine = { start: { x: 9, y: 7 }, end: { x: 7, y: 7 } };

    expect(calculatePointsCoveredByALine(horizontalLine)).toEqual(
      expect.arrayContaining([
        { x: 9, y: 7 },
        { x: 8, y: 7 },
        { x: 7, y: 7 },
      ])
    );
  });

  test("can count the number of instances of a particular point", () => {
    const points = [
      { x: 9, y: 7 },
      { x: 8, y: 7 },
      { x: 7, y: 7 },
      { x: 8, y: 7 },
    ];

    const expected = new Map();

    expected.set({ x: 9, y: 7 }, 1);
    expected.set({ x: 8, y: 7 }, 2);
    expected.set({ x: 7, y: 7 }, 1);

    expect(countPoints(points)).toEqual({
      totalPointsWithAtLeastTwoLines: 1,
    });
  });
});

describe("part 2", () => {});
