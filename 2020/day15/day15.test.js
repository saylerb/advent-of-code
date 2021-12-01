import { part1, parseInput, play, addRoundToMap } from "./day15.js";

describe("part 1", () => {
  test("can parse the string", () => {
    expect(parseInput("0,3,6")).toEqual([0, 3, 6]);
  });

  test("can mutate the map of a number to prev occur", () => {
    const map = {};
    addRoundToMap(0, 1, map);
    expect(map).toEqual({ 0: { prev: 1 } });
  });

  test("can add a second occurance to the map when one already exists", () => {
    const map = { 10: { prev: 0 } };
    addRoundToMap(10, 1, map);
    expect(map).toEqual({ 10: { prev: 1, secondPrev: 0 } });
  });

  test("can add a first occurance to the map", () => {
    const map = { 11: { prev: 0 } };
    addRoundToMap(10, 1, map);
    expect(map).toEqual({
      10: { prev: 1 },
      11: { prev: 0 },
    });
  });

  test("can play no rounds", () => {
    expect(play([0, 3, 6], 3, true)).toEqual([0, 3, 6]);
    expect(play([1, 2, 3], 5, true)).toEqual([1, 2, 3, 0, 0]);
  });

  test("can play single round", () => {
    expect(play([0, 3, 6], 4, true)).toEqual([0, 3, 6, 0]);
  });

  test("can play second round", () => {
    expect(play([0, 3, 6], 5, true)).toEqual([0, 3, 6, 0, 3]);
  });

  test("can play third round", () => {
    expect(play([0, 3, 6], 6, true)).toEqual([0, 3, 6, 0, 3, 3]);
  });

  test("can play 10 rounds", () => {
    expect(play([0, 3, 6], 10, true)).toEqual([0, 3, 6, 0, 3, 3, 1, 0, 4, 0]);
  });

  test("first example", () => {
    expect(part1("0,3,6", 2020)).toEqual(436);
  });

  test("second example", () => {
    expect(part1("1,3,2", 2020)).toEqual(1);
  });

  test("third example", () => {
    expect(part1("2,1,3", 2020)).toEqual(10);
  });

  test("fourth example", () => {
    expect(part1("1,2,3", 2020)).toEqual(27);
  });

  test("fifth example", () => {
    expect(part1("2,3,1", 2020)).toEqual(78);
  });

  test("6 example", () => {
    expect(part1("3,2,1", 2020)).toEqual(438);
  });

  test("7 example", () => {
    expect(part1("3,1,2", 2020)).toEqual(1836);
  });
  test("part 1 input ", () => {
    expect(part1("12,1,16,3,11,0", 2020)).toEqual(1696);
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    // Currently this takes about 10 min to run
    // expect(part1("12,1,16,3,11,0", 30_000_000)).toEqual(37385);
  });
});
