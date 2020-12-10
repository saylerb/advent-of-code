import { part1, part2, parseFile } from "./template.js";

test("test 1", () => {
  expect(part1()).toBeUndefined();
  expect(part2()).toBeUndefined();
});

test("test parsing of file", () => {
  expect(parseFile("test.txt")).toEqual(
    expect.arrayContaining(["Hello", "World"])
  );
});
