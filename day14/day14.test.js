import { part1, part2, parseFile, applyMask } from "./day14.js";

describe("part 1", () => {
  test("take a base 10 number and a mask and get an output in base 10", () => {
    expect(applyMask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 11)).toEqual(73);
    expect(applyMask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 101)).toEqual(101);
    expect(applyMask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 0)).toEqual(64);
  });

  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(165);
    expect(part1("day14input.txt")).toEqual(12610010960049);
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining([
        "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
        "mem[8] = 0",
      ])
    );
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
