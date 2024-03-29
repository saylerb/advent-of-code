import {
  part1,
  part2,
  calculate,
  reduceNextParens,
  calculateLine,
  reduceAddition,
  calculateLinePartTwo,
} from "./day18";

describe("part 1", () => {
  test("can perform math from left to right", () => {
    expect(calculate("1 + 2")).toEqual(3);
    expect(calculate("1 + 2 * 3")).toEqual(9);
    expect(calculate("1 + 2 * 3 + 4")).toEqual(13);
    expect(calculate("1 + 2 * 3 + 4 * 5")).toEqual(65);
    expect(calculate("1 + 2 * 3 + 4 * 5 + 6")).toEqual(71);
  });

  test("can detect reduce parens when no nested parens", () => {
    expect(reduceNextParens("1 + (2 * 3)")).toEqual("1 + 6");
    expect(reduceNextParens("1 + (2 * 3) + 4")).toEqual("1 + 6 + 4");
    expect(reduceNextParens("1 + (2 * 3) + (4 + 6)")).toEqual("1 + 6 + 10");
    expect(reduceNextParens("1 + 6 + (4 + 6)")).toEqual("1 + 6 + 10");
    expect(reduceNextParens("1 + ((2 * 3) + (6 + 3))")).toEqual("1 + (6 + 9)");
    expect(reduceNextParens("1 + 6 + 10")).toEqual(17);
  });

  test("can calculate out the full answer to a single line", () => {
    expect(calculateLine("1 + (2 * 3) + (4 + 6)")).toEqual(17);
    expect(calculateLine("2 * 3 + (4 * 5)")).toEqual(26);
    expect(calculateLine("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toEqual(437);
    expect(calculateLine("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toEqual(
      12240
    );
    expect(
      calculateLine("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")
    ).toEqual(13632);
  });

  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(12240 + 13632);
    expect(part1("day18input.txt")).toEqual(800602729153);
  });
});

describe("part 2", () => {
  test("simplify line by evaluating addition first", () => {
    expect(reduceAddition("1 + 2 * 3 + 4 * 5 + 6")).toEqual(231);
  });

  test("evaluate an entire line", () => {
    expect(calculateLinePartTwo("1 + 2 * 3 + 4 * 5 + 6")).toEqual(231);
    expect(calculateLinePartTwo("1 + (2 * 3) + (4 * (5 + 6))")).toEqual(51);
    //                           1 + 6 + (4 * 11)
    //                           1 + 6 + 44

    expect(calculateLinePartTwo("2 * 3 + (4 * 5)")).toEqual(46);
    //                           2 * 3 + 20
    //                            2 * 23  = 46

    expect(calculateLinePartTwo("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toEqual(1445);
    //                           5 + (8 * 12 + 3 * 4 * 4)
    //                           5 + (8 * 15 * 4 * 3 )

    expect(
      calculateLinePartTwo("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")
    ).toEqual(669060);

    expect(
      calculateLinePartTwo("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")
    ).toEqual(23340);
  });

  test("test part 2", () => {
    expect(part2("day18input.txt")).toEqual(92173009047076);
  });
});
