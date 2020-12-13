import { part1, part2, parseFile, Ship } from "./day12.js";

describe("part 1", () => {
  test("test it has an initial position of east", () => {
    const ship = new Ship();

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
  });

  test("moving forward when pointing east increments x coordinate", () => {
    const ship = new Ship(0, 0, "E");
    ship.moveForward(10);
    expect(ship.getPosition()).toEqual({ orientation: "E", x: 10, y: 0 });
  });

  test("moving north when pointing east increments y coordinate but does not change orientation", () => {
    const ship = new Ship(10, 0, "E");
    ship.moveNorth(3);
    expect(ship.getPosition()).toEqual({ orientation: "E", x: 10, y: 3 });
  });

  test("moving south when pointing east decrements y coordinate but does not change orientation", () => {
    const ship = new Ship(10, 0, "E");
    ship.moveSouth(3);
    expect(ship.getPosition()).toEqual({ orientation: "E", x: 10, y: -3 });
  });

  test("moving east when pointing north increments x coordinate but does not change orientation", () => {
    const ship = new Ship(0, 0, "N");
    ship.moveEast(3);
    expect(ship.getPosition()).toEqual({ orientation: "N", x: 3, y: 0 });
  });

  test("moving west when pointing north decrements x coordinate but does not change orientation", () => {
    const ship = new Ship(0, 0, "N");
    ship.moveWest(3);
    expect(ship.getPosition()).toEqual({ orientation: "N", x: -3, y: 0 });
  });

  test("while pointing east turing right 90 degrees changes orientation to south", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnRight(90);

    expect(ship.getPosition()).toEqual({ orientation: "S", x: 0, y: 0 });
  });

  test("while pointing east turing right 180 degrees changes orientation to west", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnRight(180);

    expect(ship.getPosition()).toEqual({ orientation: "W", x: 0, y: 0 });
  });

  test("while pointing east turing right 270 degrees changes orientation to N", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnRight(270);

    expect(ship.getPosition()).toEqual({ orientation: "N", x: 0, y: 0 });
  });

  test("while pointing east turing right 360 degrees does not change orientation", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnRight(360);

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
  });

  test("while pointing east turing left 90 degrees changes orientation to north", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnLeft(90);

    expect(ship.getPosition()).toEqual({ orientation: "N", x: 0, y: 0 });
  });

  test("while pointing east turing left 180 degrees changes orientation to west", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnLeft(180);

    expect(ship.getPosition()).toEqual({ orientation: "W", x: 0, y: 0 });
  });

  test("while pointing east turing left 270 degrees changes orientation to south", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnLeft(270);

    expect(ship.getPosition()).toEqual({ orientation: "S", x: 0, y: 0 });
  });

  test("while pointing east turing left 360 degrees will not change orientation", () => {
    const ship = new Ship(0, 0, "E");
    ship.turnLeft(360);

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
  });

  test("ship can read instructions", () => {
    const ship = new Ship();

    ship.readInstructions(["F10", "N3", "F7", "R90", "F11"]);

    expect(ship.getPosition()).toEqual({ orientation: "S", x: 17, y: -8 });
  });

  test("can calculate the manhattan distance", () => {
    const ship = new Ship(17, -8, "S");

    ship.getManhattanDistance();

    expect(ship.getManhattanDistance()).toEqual(25);
  });

  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(25);
    expect(part1("day12input.txt")).toEqual(1589);
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining(["F10", "F11"])
    );
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
