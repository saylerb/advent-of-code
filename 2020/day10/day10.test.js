import {
  part1,
  part2,
  parseFile,
  linesToNumbers,
  sort,
  getDifferences,
  getLengthsOfGroupsOfContiguousNumbers,
  getNumberOfArrangements,
} from "./day10.js";

describe("part 1", () => {
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(expect.arrayContaining(["16", "4"]));
  });

  test("test parsing of file", () => {
    expect(linesToNumbers(["16", "4"])).toEqual(
      expect.arrayContaining([16, 4])
    );
  });

  test("test parsing of file", () => {
    expect(sort([16, 4])).toEqual([4, 16]);
  });

  test("walk the numbers", () => {
    const numbers = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

    expect(getDifferences(numbers)).toEqual({ 1: 7, 2: 0, 3: 5 });
  });

  test("integration", () => {
    expect(part1("test.txt")).toEqual(35);
    expect(part1("test2.txt")).toEqual(220);
    expect(part1("day10input.txt")).toEqual(2592);
  });
});

describe("part 2", () => {
  test("count of the size of each group of contiguous numbers", () => {
    // 1, 4, 5, 6, 10
    // has a group of 2 contiguous numbers (0, 1) and a group of 3 (4,5,6)

    expect(getLengthsOfGroupsOfContiguousNumbers([0, 1, 4, 5, 6, 10])).toEqual([
      2, 3,
    ]);

    // 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19
    // a group of 2 contiguous numbers (0, 1) a
    // a group of 4 (4,5,6,7)
    // a group of 3 (10,11,12)
    // a group of 2 (15,16)

    expect(
      getLengthsOfGroupsOfContiguousNumbers([
        0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19,
      ])
    ).toEqual([2, 4, 3, 2]);

    // 1,2,3,4,7,8,9,10,11,14,17,18,19,20,23,24,25
    // ,28,31,32,33,34,35,38,39,42,45,46,47,48,49

    // a group of 5 (0,1,2,3,4)
    // a group of 5 (7,8,9,10,11)
    // a group of 4 (17,18,19,20)
    // a group of 3 (23,24,25)
    // a group of 5 (31,32,33,34,35)
    // a group of 2 (38,29)
    // a group of 5 (45,46,47,48,49)

    expect(
      getLengthsOfGroupsOfContiguousNumbers([
        0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
        32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 48, 49,
      ])
    ).toEqual([5, 5, 4, 3, 5, 2, 5]);
  });

  test("calculate the number of arrangement from counts of contigous numbers", () => {
    // (0) 1,4,5,6,7,10 (13)   all
    // (0) 1,4,5,7,10 (13)   no 6
    // (0) 1,4,6,7,10 (13)   no 5
    // (0) 1,4,7,10 (13)   no 5, 6

    // a contiguous set of 2 numbers (0,1) offers 1 arrangement
    // a contiguous set of 4 numbers (4,5,6,7) offers 4 arrangements
    // total arrangements = 4 * 1 = 4

    expect(getNumberOfArrangements([2, 4])).toEqual(4);

    // (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22) // all

    // 1 group of 2 contiguous numbers (0,1)     =>     1
    // 1 group of 4 contiguous numbers (4,5,6,7) =>     4
    // 1 group of 3 contiguous numbers (10,11,12)=>     2
    // 1 group of 2 contiguous numbers (15,16)   =>     1
    //
    // total arrangements => 1 * 4 * 2 * 1 = 8

    expect(getNumberOfArrangements([2, 4, 3, 2])).toEqual(8);

    // A run of 5 contiguous numbers produces 7 arrangements
    // (0) 1, 4, 5, 6, 7, 8, 11 (14) all
    // (0) 1, 4,  , 6, 7, 8, 11 (14)    no 5
    // (0) 1, 4, 5,  , 7, 8, 11 (14)    no 6
    // (0) 1, 4, 5, 6,  , 8, 11 (14)    no 7
    // (0) 1, 4,  ,  , 7, 8, 11 (14)    no 5 no 6
    // (0) 1, 4, 5,  ,  , 8, 11 (14)    no 6 no 7
    // (0) 1, 4,  , 6,  , 8, 11 (14)    no 5 no 7
    // (0) 1, 4,  ,  ,  , 8, 11 (14)    X

    // 1 group of 2 contiguous numbers (0,1)       => 1
    // 1 group of 5 contiguous numbers (4,5,6,7,8) => 7

    // total arrangements => 1 * 7 = 7

    expect(getNumberOfArrangements([2, 5])).toEqual(7);
  });

  test("part 2", () => {
    expect(part2("test.txt")).toEqual(8);
    expect(part2("test2.txt")).toEqual(19208);
    expect(part2("day10input.txt")).toEqual(198428693313536);
  });
});
