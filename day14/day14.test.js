import {
  part1,
  part2,
  parseFile,
  applyMask,
  applyMaskToAddress,
  applyMaskToNumber,
} from "./day14.js";

describe("part 1", () => {
  test("take a base 10 number and a mask and get an output in base 10", () => {
    expect(
      applyMaskToNumber("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 11)
    ).toEqual(73);
    expect(
      applyMaskToNumber("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 101)
    ).toEqual(101);
    expect(
      applyMaskToNumber("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 0)
    ).toEqual(64);
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
  test("apply mask to base 10 memory address", () => {
    expect(
      applyMaskToAddress("000000000000000000000000000000X1001X", 42)
    ).toEqual(expect.arrayContaining([26, 27, 58, 59]));
  });
  test("test part 2", () => {
    expect(part2("test2.txt")).toEqual(208);
    expect(part2("day14input.txt")).toEqual(3608464522781);
  });
});
