import {
  part1,
  part2,
  parseFile,
  linesToNumbers,
  sort,
  getDifferences,
} from "./day10.js";

test("test 1", () => {
  expect(part1("test.txt")).toEqual(35);
  expect(part1("test2.txt")).toEqual(220);
  expect(part1("day10input.txt")).toEqual(2592);
});

test("test parsing of file", () => {
  expect(parseFile("test.txt")).toEqual(expect.arrayContaining(["16", "4"]));
});

test("test parsing of file", () => {
  expect(linesToNumbers(["16", "4"])).toEqual(expect.arrayContaining([16, 4]));
});

test("test parsing of file", () => {
  expect(sort([16, 4])).toEqual([4, 16]);
});

test("walk the numbers", () => {
  const numbers = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

  expect(getDifferences(numbers)).toEqual({ 1: 7, 2: 0, 3: 5 });
});
