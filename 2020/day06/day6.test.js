import day6 from "./day6.js";

test("test part 1", () => {
  expect(day6.part1("test.txt")).toEqual(11);
  expect(day6.part1("day6input.txt")).toEqual(6504);
});

test("can parse the file into groups", () => {
  expect(day6.parseFile("test.txt")).toEqual(
    expect.arrayContaining([
      ["abc"],
      ["a", "b", "c"],
      ["ab", "ac"],
      ["a", "a", "a", "a"],
      ["b"],
    ])
  );
});

test("count answers at least once by anyone in group", () => {
  expect(day6.countAny("abac")).toEqual(3);
  expect(day6.countAny("abc")).toEqual(3);
  expect(day6.countAny("aaaa")).toEqual(1);
  expect(day6.countAny("ba")).toEqual(2);
});

test("count answered by every person in group", () => {
  expect(day6.countEvery("abac", 2)).toEqual(1);
  expect(day6.countEvery("abc", 3)).toEqual(0);
  expect(day6.countEvery("aaaa", 4)).toEqual(1);
  expect(day6.countEvery("b", 1)).toEqual(1);
});

test("test part 2", () => {
  expect(day6.part2("test.txt")).toEqual(6);
  expect(day6.part2("day6input.txt")).toEqual(3351);
});
