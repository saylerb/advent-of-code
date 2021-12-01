import {
  part1,
  part2,
  parseFile,
  getPosition,
  getAdjacentSeats,
  countOccupiedSeats,
  nextValue,
  nextRound,
  countAllOccupiedSeats,
  getEquilibrium,
  isTheSame,
  nextCoordForDirection,
  findNextVisibleSeat,
  allNextVisibleSeats,
  getAdjacentCoords,
} from "./day11.js";

describe("part 1", () => {
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining(["L.LL.LL.LL", "L.LLLLL.LL"])
    );
  });

  test("can get the value at a single position", () => {
    const graph = ["L.LL.LL.LL", "LLLLLLL.LL"];

    expect(getPosition({ graph, x: 0, y: 0 })).toEqual("L");
    expect(getPosition({ graph, x: 1, y: 0 })).toEqual(".");
    expect(getPosition({ graph, x: 0, y: 1 })).toEqual("L");
    expect(getPosition({ graph, x: 1, y: 1 })).toEqual("L");
  });

  test("if coordinates are out of bounds return undefined", () => {
    const graph = ["L.LL.LL.LL", "LLLLLLL.LL"];

    expect(getPosition({ graph, x: 20, y: 1 })).toBeUndefined();
    expect(getPosition({ graph, x: 1, y: 20 })).toBeUndefined();
    expect(getPosition({ graph, x: -1, y: -1 })).toBeUndefined();
  });

  test("can get all the adjacent seat coordinates", () => {
    expect(getAdjacentCoords({ x: 0, y: 0 })).toEqual(
      expect.arrayContaining([
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
      ])
    );
  });

  test("can count number of occupied seats", () => {
    expect(countOccupiedSeats(["L", ".", "#"])).toEqual(1);
    expect(countOccupiedSeats(["#", "#", "#"])).toEqual(3);
    expect(countOccupiedSeats([".", ".", "."])).toEqual(0);
    expect(countOccupiedSeats(["L", "L", "L"])).toEqual(0);
    expect(countOccupiedSeats([])).toEqual(0);
  });

  test("can calculate the next value based on current value and number of adjacent seats open", () => {
    expect(nextValue({ current: "L", totalOccupied: 1, max: 4 })).toEqual("L");
    expect(nextValue({ current: "L", totalOccupied: 0, max: 4 })).toEqual("#");
    expect(nextValue({ current: "#", totalOccupied: 0, max: 4 })).toEqual("#");
    expect(nextValue({ current: "#", totalOccupied: 4, max: 4 })).toEqual("L");
    expect(nextValue({ current: "#", totalOccupied: 5, max: 4 })).toEqual("L");
    expect(nextValue({ current: ".", totalOccupied: 0, max: 4 })).toEqual(".");
  });

  test("doing one round", () => {
    const roundOne = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];
    const expected = [
      "#.##.##.##",
      "#######.##",
      "#.#.#..#..",
      "####.##.##",
      "#.##.##.##",
      "#.#####.##",
      "..#.#.....",
      "##########",
      "#.######.#",
      "#.#####.##",
    ];
    expect(nextRound(roundOne, getAdjacentSeats)).toEqual(expected);
  });

  test("doing second round", () => {
    const rountTwo = [
      "#.##.##.##",
      "#######.##",
      "#.#.#..#..",
      "####.##.##",
      "#.##.##.##",
      "#.#####.##",
      "..#.#.....",
      "##########",
      "#.######.#",
      "#.#####.##",
    ];

    const expected = [
      "#.LL.L#.##",
      "#LLLLLL.L#",
      "L.L.L..L..",
      "#LLL.LL.L#",
      "#.LL.LL.LL",
      "#.LLLL#.##",
      "..L.L.....",
      "#LLLLLLLL#",
      "#.LLLLLL.L",
      "#.#LLLL.##",
    ];
    expect(nextRound(rountTwo, getAdjacentSeats)).toEqual(expected);
  });

  test("can compare two graphs", () => {
    const roundOne = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];
    const two = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];

    expect(isTheSame(roundOne, two)).toBe(true);

    expect(isTheSame([], two)).toBe(false);
    expect(isTheSame([], [])).toBe(true);
  });

  test("can find the equilibrium round", () => {
    const roundOne = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];

    const equilibrium = [
      "#.#L.L#.##",
      "#LLL#LL.L#",
      "L.#.L..#..",
      "#L##.##.L#",
      "#.#L.LL.LL",
      "#.#L#L#.##",
      "..L.L.....",
      "#L#L##L#L#",
      "#.LLLLLL.L",
      "#.#L#L#.##",
    ];

    expect(getEquilibrium(roundOne, getAdjacentSeats)).toEqual(equilibrium);
  });

  test("can count the total number of open seats", () => {
    expect(countAllOccupiedSeats(["L", "L", "LLL"])).toEqual(0);
    expect(countAllOccupiedSeats(["#", "#", "###"])).toEqual(5);

    const equilibrium = [
      "#.#L.L#.##",
      "#LLL#LL.L#",
      "L.#.L..#..",
      "#L##.##.L#",
      "#.#L.LL.LL",
      "#.#L#L#.##",
      "..L.L.....",
      "#L#L##L#L#",
      "#.LLLLLL.L",
      "#.#L#L#.##",
    ];
    expect(countAllOccupiedSeats(equilibrium)).toEqual(37);
  });

  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(37);
    expect(part1("day11input.txt")).toEqual(2164);
  });
});

describe("part 2", () => {
  test("can calculate the next seat in a direction", () => {
    expect(nextCoordForDirection({ direction: "N", x: 0, y: 0 })).toEqual({
      x: 0,
      y: -1,
    });

    expect(nextCoordForDirection({ direction: "E", x: 1, y: 1 })).toEqual({
      x: 2,
      y: 1,
    });
  });

  test("can travel in direction until it finds the seat", () => {
    expect(
      findNextVisibleSeat({
        graph: [".L.L.#.#.#.#."],
        direction: "E",
        x: 1,
        y: 0,
      })
    ).toEqual({
      x: 3,
      y: 0,
      seat: "L",
    });

    expect(
      findNextVisibleSeat({
        graph: [".L...#.#.#.#."],
        direction: "E",
        x: 1,
        y: 0,
      })
    ).toEqual({
      x: 5,
      y: 0,
      seat: "#",
    });

    expect(
      findNextVisibleSeat({
        graph: [".L...#.#.#.#."],
        direction: "W",
        x: 5,
        y: 0,
      })
    ).toEqual({
      x: 1,
      y: 0,
      seat: "L",
    });
  });

  test("find all 8 visible seats when all in visible in field of view", () => {
    const result = allNextVisibleSeats({
      graph: [
        ".......#.",
        "...#.....",
        ".#.......",
        ".........",
        "..#L....#",
        "....#....",
        ".........",
        "#........",
        "...#.....",
      ],
      x: 3,
      y: 4,
    });

    expect(result).toEqual(["#", "#", "#", "#", "#", "#", "#", "#"]);
    expect(result.length).toEqual(8);
  });

  test("find no seats when all are not in field of view", () => {
    const result = allNextVisibleSeats({
      graph: [
        ".##.##.",
        "#.#.#.#",
        "##...##",
        "...L...",
        "##...##",
        "#.#.#.#",
        ".##.##.",
      ],
      x: 3,
      y: 3,
    });

    expect(result.length).toEqual(0);
  });

  test("can find the next round using visible occupied seats", () => {
    const roundOne = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];

    const roundTwo = [
      "#.##.##.##",
      "#######.##",
      "#.#.#..#..",
      "####.##.##",
      "#.##.##.##",
      "#.#####.##",
      "..#.#.....",
      "##########",
      "#.######.#",
      "#.#####.##",
    ];

    const roundThree = [
      "#.LL.LL.L#",
      "#LLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLL#",
      "#.LLLLLL.L",
      "#.LLLLL.L#",
    ];

    expect(nextRound(roundOne, allNextVisibleSeats)).toEqual(roundTwo);
    expect(nextRound(roundTwo, allNextVisibleSeats)).toEqual(roundThree);
  });

  test("find equilibrium", () => {
    const roundOne = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];
    const equilibrium = [
      "#.L#.L#.L#",
      "#LLLLLL.LL",
      "L.L.L..#..",
      "##L#.#L.L#",
      "L.L#.LL.L#",
      "#.LLLL#.LL",
      "..#.L.....",
      "LLL###LLL#",
      "#.LLLLL#.L",
      "#.L#LL#.L#",
    ];

    expect(getEquilibrium(roundOne, allNextVisibleSeats)).toEqual(equilibrium);
  });

  test("test part 2", () => {
    expect(part2("test.txt")).toEqual(26);
    expect(part2("day11input.txt")).toEqual(1974);
  });
});
