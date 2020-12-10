import {
  part1,
  part2,
  getPreviousNumbers,
  findTwoNumbersThatAddToSum,
  getFirstInvalidNumber,
  getContiguousNumbers,
  getContiguousMinMaxSum,
} from "./day9.js";

test("can find the previous n numbers in a list from a specific position", () => {
  expect(getPreviousNumbers([1, 3, 4, 5, 6], 0, 2)).toEqual([]);
  expect(getPreviousNumbers([1, 3, 4, 5, 6], 1, 2)).toEqual([1]);
  expect(getPreviousNumbers([1, 3, 4, 5, 6], 2, 2)).toEqual([1, 3]);
  expect(getPreviousNumbers([1, 3, 4, 5, 6], 3, 2)).toEqual([3, 4]);
  expect(getPreviousNumbers([1, 3, 4, 5, 6], 3, 3)).toEqual([1, 3, 4]);
});

test("find two numbers in a list that add up to another number", () => {
  expect(findTwoNumbersThatAddToSum([1, 3, 4, 5, 6], 9)).toEqual([6, 3]);
  expect(findTwoNumbersThatAddToSum([1, 3, 4, 5, 6], 10)).toEqual([6, 4]);
  expect(findTwoNumbersThatAddToSum([1, 3, 4, 5, 6], 25)).toEqual([]);
  expect(findTwoNumbersThatAddToSum([1, 3, 4, 5, 6, 24], 25)).toEqual([24, 1]);
});

test("find the first invalid number in a list given a preamble size", () => {
  const list = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
  ];

  const preambleSize = 5;
  expect(getFirstInvalidNumber(list, preambleSize)).toEqual(127);
});

test("test part 1 works", () => {
  expect(part1("test.txt", 5)).toEqual(127);
  expect(part1("day9input.txt", 25)).toEqual(29221323);
});

test("find contiguous numbers that add to sum", () => {
  const list = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
  ];

  expect(getContiguousNumbers(list, 127)).toEqual([15, 25, 47, 40]);
  expect(getContiguousMinMaxSum(list, 127)).toEqual(62);
});

test("find the min and max of the contiguous numbers, and sum them", () => {
  expect(part2("test.txt", 127)).toEqual(62);
  expect(part2("day9input.txt", 29221323)).toEqual(4389369);
});
