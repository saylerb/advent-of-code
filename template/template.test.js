import { part1, part2, parseFile } from "./template.js";

describe("part 1", () => {
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
