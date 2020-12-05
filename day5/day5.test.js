const day5 = require("./day5.js");

test("Giving one instruction with current min and max", () => {
  expect(day5.nextMinMax(0, 127, "F")).toEqual([0, 63]);
  expect(day5.nextMinMax(0, 63, "B")).toEqual([32, 63]);
  expect(day5.nextMinMax(32, 63, "F")).toEqual([32, 47]);
  expect(day5.nextMinMax(32, 47, "B")).toEqual([40, 47]);
  expect(day5.nextMinMax(40, 47, "B")).toEqual([44, 47]);
  expect(day5.nextMinMax(44, 47, "F")).toEqual([44, 45]);
  expect(day5.nextMinMax(44, 45, "F")).toEqual([44, 44]);
});

test("test getting the row number from code", () => {
  expect(day5.getSeatInfo("FBFBBFFRLR")).toEqual([44, 5, 357]);
  expect(day5.getSeatInfo("BFFFBBFRRR")).toEqual([70, 7, 567]);
  expect(day5.getSeatInfo("FFFBBBFRRR")).toEqual([14, 7, 119]);
  expect(day5.getSeatInfo("BBFFBBFRLL")).toEqual([102, 4, 820]);
});

test("test parsing of file", () => {
  expect(day5.parseFile("test.txt")).toEqual(
    expect.arrayContaining([
      "FBFBBFFRLR",
      "BFFFBBFRRR",
      "FFFBBBFRRR",
      "BBFFBBFRLL",
    ])
  );
});

test("part one answer", () => {
  expect(day5.part1("test.txt")).toEqual(820);
  expect(day5.part1("day5input.txt")).toEqual(858);
});

test("calculate map of all seat ids", () => {
  const totalSeatsMap = day5.allSeatIds();
  const allKeys = Object.keys(totalSeatsMap);

  expect(totalSeatsMap).toEqual(expect.any(Object));
  expect(allKeys.length).toEqual(1024);
});

test("part two", () => {
  expect(day5.part2("day5input.txt")).toEqual(557);
});
