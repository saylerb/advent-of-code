import {
  part1,
  part2,
  parseFile,
  linesToNotes,
  getNextDeparture,
  getNextDepartureForEachBus,
  findBusToTake,
  getBusPairs,
  doesBusDepartAtCorrectTime,
  findMagicTimeBruteForce,
  allPairsMatch,
  findNearestPreviousMultiple,
  getRemaindersAndModuli,
  findRemainder,
} from "./day13.js";

describe("part 1", () => {
  test("can extract bus ids ", () => {
    expect(linesToNotes(["939", "7,13,x,x,59,x,31,19"])).toEqual({
      earliestArrival: 939,
      availableBuses: [7, 13, 59, 31, 19],
    });
  });

  test("can get next departure time give arrival and bus id", () => {
    expect(getNextDeparture(939, 7)).toEqual(945);
    expect(getNextDeparture(939, 13)).toEqual(949);
    expect(getNextDeparture(939, 59)).toEqual(944);
    expect(getNextDeparture(939, 31)).toEqual(961);
    expect(getNextDeparture(939, 19)).toEqual(950);
  });

  test("can process bus ids", () => {
    const notes = {
      earliestArrival: 939,
      availableBuses: [7, 13, 59, 31, 19],
    };

    const result = getNextDepartureForEachBus(notes);

    expect(result).toEqual({
      7: 945,
      13: 949,
      59: 944,
      31: 961,
      19: 950,
    });
  });

  test("can find the earliest bus departure", () => {
    const departures = {
      7: 945,
      13: 949,
      59: 944,
      31: 961,
      19: 950,
    };

    expect(findBusToTake(departures)).toEqual([59, 944]);
  });

  test("test parsing of file into lines", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining(["939", "7,13,x,x,59,x,31,19"])
    );
  });

  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(295);
    expect(part1("day13input.txt")).toEqual(1835);
  });
});

describe("part 2", () => {
  test("can record the buses time gap map", () => {
    const buses = ["7", "13", "x", "x", "59", "x", "31", "19"];

    const expected = [
      [7, 0],
      [13, 1],
      [59, 4],
      [31, 6],
      [19, 7],
    ];
    expect(getBusPairs(buses)).toEqual(expected);
  });

  test("can calculate if the next bus departs at correct time", () => {
    expect(
      doesBusDepartAtCorrectTime({
        currentTime: 12,
        nextBusId: 13,
        timeGap: 1,
      })
    ).toEqual(true);

    expect(
      doesBusDepartAtCorrectTime({
        currentTime: 1,
        nextBusId: 13,
        timeGap: 1,
      })
    ).toEqual(false);
  });

  test("another", () => {
    expect(
      allPairsMatch(
        [
          [17, 0],
          [13, 2],
          [19, 3],
        ],
        3417
      )
    ).toEqual(true);

    expect(
      allPairsMatch(
        [
          [17, 0],
          [13, 2],
          [19, 3],
        ],
        0
      )
    ).toEqual(false);
  });

  test("find the next possible number by comparing all multiples of first number", () => {
    // expect(
    //   findMagicTimeBruteForce([
    //     [17, 0],
    //     [13, 2],
    //     [19, 3],
    //   ])
    // ).toEqual(3417);
    // expect(
    //   findMagicTimeBruteForce([
    //     [67, 0],
    //     [7, 1],
    //     [59, 2],
    //     [61, 3],
    //   ])
    // ).toEqual(754018);
    // expect(
    //   findMagicTimeBruteForce([
    //     [67, 0],
    //     [7, 2],
    //     [59, 3],
    //     [61, 4],
    //   ])
    // ).toEqual(779210);
    //1789,37,47,1889
    // expect(
    //   findMagicTimeBruteForce([
    //     [1789, 0],
    //     [37, 1],
    //     [47, 2],
    //     [1889, 3],
    //   ])
    // ).toEqual(1202161486);
  });

  test("can find moduli and remainders for the chinese remainder theorem", () => {
    expect(
      getRemaindersAndModuli([
        [17, 0],
        [13, 2],
        [19, 3],
      ])
    ).toEqual({
      moduli: [17, 13, 19],
      remainders: [0, 11, 16],
    });

    const pairs = [
      [17, 0],
      [41, 7],
      [37, 11],
      [367, 17],
      [19, 36],
      [23, 40],
      [29, 46],
      [613, 48],
      [13, 61],
    ];

    expect(getRemaindersAndModuli(pairs)).toEqual({
      moduli: [17, 41, 37, 367, 19, 23, 29, 613, 13],
      remainders: [0, 34, 26, 350, 2, 6, 12, 565, 4],
    });
  });

  test("function to find the nearest previous multiple", () => {
    expect(findNearestPreviousMultiple(61, 13)).toEqual(52);
    expect(findNearestPreviousMultiple(1008, 10)).toEqual(1000);
    expect(findNearestPreviousMultiple(100000000000000, 17)).toEqual(
      99999999999992
    );
  });

  test("test part 2", () => {
    expect(part2("test.txt")).toEqual(1068781n);
    expect(part2("day13input.txt")).toEqual(247086664214628n);
  });
});
