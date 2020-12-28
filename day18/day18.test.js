import { part1, part2, parseFile, calculate } from "./day18";

describe("part 1", () => {
  test("can perform math from left to right", () => {
    expect(calculate("1 + 2")).toEqual(3);
    expect(calculate("1 + 2 * 3")).toEqual(9);
    expect(calculate("1 + 2 * 3 + 4")).toEqual(13);
    expect(calculate("1 + 2 * 3 + 4 * 5")).toEqual(65);
    expect(calculate("1 + 2 * 3 + 4 * 5 + 6")).toEqual(71);
  });

  test("test part 1", () => {
    expect(part1()).toBeUndefined();
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining(["Hello", "World"])
    );
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
