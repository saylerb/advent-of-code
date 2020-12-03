const day3 = require("./day3.js");

describe("part 1", () => {
  test("returns first value in the graph", () => {
    const topology = ["..##......."];

    expect(day3.getValue(topology, 0, 0)).toEqual(".");
  });

  test("returns value in the middle graph", () => {
    const topology = ["..##......."];

    expect(day3.getValue(topology, 3, 0)).toEqual("#");
  });

  test("returns undefined if there is no value", () => {
    const topology = ["..##......."];

    expect(day3.getValue(topology, 1, 1)).toBeUndefined();
  });

  test("can wrap around the x axis", () => {
    const topology = ["..#........"];

    expect(day3.getValue(topology, 13, 0)).not.toBeUndefined();
    expect(day3.getValue(topology, 13, 0)).toEqual("#");
  });

  test("can get three over and one down", () => {
    const topology = [
      "..#........",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
    ];

    expect(day3.getValue(topology, 4, 1)).toEqual("#");
    expect(day3.getValue(topology, 3, 1)).toEqual(".");
    expect(day3.getValue(topology, 9, 2)).toEqual("#");
    expect(day3.getValue(topology, 10, 2)).toEqual(".");
    expect(day3.getValue(topology, 9, 3)).toEqual(".");
    expect(day3.getValue(topology, 12, 4)).toEqual("#");
  });

  test("get the coordinates of turn", () => {
    expect(day3.coordinatesForTurn(1)).toEqual([3, 1]);
    expect(day3.coordinatesForTurn(2)).toEqual([6, 2]);
    expect(day3.coordinatesForTurn(3)).toEqual([9, 3]);
    expect(day3.coordinatesForTurn(4)).toEqual([12, 4]);
  });

  test("get the value for a turn", () => {
    const topology = ["..#........", "#...#...#.."];

    expect(day3.valueForTurn(topology, 1)).toEqual(".");
    expect(day3.valueForTurn(topology, 2)).toBeUndefined();
  });

  test("can get the values for each turn", () => {
    const topology = ["..#........", "#...#...#.."];

    expect(day3.valuesForTopology(topology)).toEqual(["."]);
  });

  test("get the values of all turns", () => {
    const topology = [
      "..#........",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
    ];

    expect(day3.valuesForTopology(topology)).toEqual([".", "#", ".", "#"]);
  });

  test("reads the file into array of rows", () => {
    const topology = ["..##.......", "#...#...#..", ".#....#..#."];

    expect(day3.parseFile("./day3test.txt")).toEqual(
      expect.arrayContaining(topology)
    );
  });

  test("counts number of open spots from reading file", () => {
    expect(day3.main("./day3test.txt", [[3, 1]])).toEqual([7]);
  });
});

describe("part2", () => {
  test("get the coordinates of turn", () => {
    expect(day3.coordinatesForTurn(0, 1, 1)).toEqual([0, 0]);
    expect(day3.coordinatesForTurn(1, 1, 1)).toEqual([1, 1]);
    expect(day3.coordinatesForTurn(1, 3, 1)).toEqual([3, 1]);
    expect(day3.coordinatesForTurn(1, 1, 2)).toEqual([1, 2]);
    expect(day3.coordinatesForTurn(2, 1, 2)).toEqual([2, 4]);
  });

  test("counts number of open spots from reading file", () => {
    expect(
      day3.main("./day3test.txt", [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
      ])
    ).toEqual([2, 7, 3, 4, 2]);
  });
});
