import { parseLines, part2 } from "./index.js";

describe("part 1", () => {
  test("can parse input into lines", () => {
    const lineOne = { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } };
    const lineTwo = { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } };

    expect(parseLines("test.txt")).toEqual([lineOne, lineTwo]);
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
