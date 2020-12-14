import { part1, part2, parseFile, Ship } from "./day12.js";

describe("part 1", () => {
  test("test it has an initial position of east", () => {
    const ship = new Ship({ position: {} });

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
  });

  test("moving forward when pointing east increments x coordinate", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.moveForward(10);
    expect(ship.getPosition()).toEqual({ orientation: "E", x: 10, y: 0 });
  });

  test("moving north when pointing east increments y coordinate but does not change orientation", () => {
    const ship = new Ship({ position: { x: 10, y: 0 }, orientation: "E" });
    ship.moveNorth(3);
    expect(ship.getPosition()).toEqual({ orientation: "E", x: 10, y: 3 });
  });

  test("moving south when pointing east decrements y coordinate but does not change orientation", () => {
    const ship = new Ship({ position: { x: 10, y: 0 }, orientation: "E" });
    ship.moveSouth(3);
    expect(ship.getPosition()).toEqual({ orientation: "E", x: 10, y: -3 });
  });

  test("moving east when pointing north increments x coordinate but does not change orientation", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "N" });
    ship.moveEast(3);
    expect(ship.getPosition()).toEqual({ orientation: "N", x: 3, y: 0 });
  });

  test("moving west when pointing north decrements x coordinate but does not change orientation", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "N" });
    ship.moveWest(3);
    expect(ship.getPosition()).toEqual({ orientation: "N", x: -3, y: 0 });
  });

  test("while pointing east turing right 90 degrees changes orientation to south", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnRight(90);

    expect(ship.getPosition()).toEqual({ orientation: "S", x: 0, y: 0 });
  });

  test("while pointing east turing right 180 degrees changes orientation to west", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnRight(180);

    expect(ship.getPosition()).toEqual({ orientation: "W", x: 0, y: 0 });
  });

  test("while pointing east turing right 270 degrees changes orientation to N", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnRight(270);

    expect(ship.getPosition()).toEqual({ orientation: "N", x: 0, y: 0 });
  });

  test("while pointing east turing right 360 degrees does not change orientation", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnRight(360);

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
  });

  test("while pointing east turing left 90 degrees changes orientation to north", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnLeft(90);

    expect(ship.getPosition()).toEqual({ orientation: "N", x: 0, y: 0 });
  });

  test("while pointing east turing left 180 degrees changes orientation to west", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnLeft(180);

    expect(ship.getPosition()).toEqual({ orientation: "W", x: 0, y: 0 });
  });

  test("while pointing east turing left 270 degrees changes orientation to south", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnLeft(270);

    expect(ship.getPosition()).toEqual({ orientation: "S", x: 0, y: 0 });
  });

  test("while pointing east turing left 360 degrees will not change orientation", () => {
    const ship = new Ship({ position: { x: 0, y: 0 }, orientation: "E" });
    ship.turnLeft(360);

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
  });

  test("ship can read instructions", () => {
    const ship = new Ship({ position: {} });

    ship.readInstructions(["F10", "N3", "F7", "R90", "F11"]);

    expect(ship.getPosition()).toEqual({ orientation: "S", x: 17, y: -8 });
  });

  test("can calculate the manhattan distance", () => {
    const ship = new Ship({ position: { x: 17, y: -8 }, orientation: "S" });

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
  test("waypoint starts 10 east and 1 north relative to the ship", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
    });
    expect(ship.getWaypoint()).toEqual({ x: 10, y: 1 });
  });

  test("using waypoint navigation ship moves forward towards the waypoint", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
    });

    ship.moveFowardToWaypoint(10);

    expect(ship.getPosition()).toEqual({ x: 100, y: 10, orientation: "E" });
  });

  test("move north instruction increments y coordinate of waypoint", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 5, y: 2 },
    });

    ship.moveWaypointNorth(10);

    expect(ship.getPosition()).toEqual({ x: 0, y: 0, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 5, y: 12 });
  });

  test("move south instruction decrements y coordinate of waypoint", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 5, y: 2 },
    });

    ship.moveWaypointSouth(10);

    expect(ship.getPosition()).toEqual({ x: 0, y: 0, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 5, y: -8 });
  });

  test("move west instruction decrements x coordinate of waypoint", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 5, y: 2 },
    });

    ship.moveWaypointWest(10);

    expect(ship.getPosition()).toEqual({ x: 0, y: 0, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: -5, y: 2 });
  });

  test("move east instruction increments x coordinate of waypoint", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 5, y: 2 },
    });

    ship.moveWaypointEast(10);

    expect(ship.getPosition()).toEqual({ x: 0, y: 0, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 15, y: 2 });
  });

  test("heading instructions move the waypoint rather than the ship", () => {
    const ship = new Ship({
      position: {
        x: 100,
        y: 10,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 20, y: 2 },
    });

    ship.moveWaypointNorth(3);

    expect(ship.getPosition()).toEqual({ x: 100, y: 10, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 20, y: 5 });
  });

  test("instructions move the waypoint rather than the ship", () => {
    const ship = new Ship({
      position: {
        x: 100,
        y: 10,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.moveFowardToWaypoint(7);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 10, y: 4 });
  });

  test("turn right 90 degrees rotates the waypoint", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointRight(90);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 4, y: -10 });
  });

  test("turn right 180 degrees rotates the waypoint", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointRight(180);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: -10, y: -4 });
  });

  test("turn right 270 degrees rotates the waypoint", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointRight(270);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: -4, y: 10 });
  });

  test("turn right 360 degrees does not affect waypoint or position", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointRight(360);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 10, y: 4 });
  });

  test("turn left 90 degrees rotates the waypoint", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointLeft(90);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: -4, y: 10 });
  });

  test("turn left 180 degrees rotates the waypoint", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointLeft(180);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: -10, y: -4 });
  });

  test("turn left 270 degrees rotates the waypoint", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointLeft(270);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 4, y: -10 });
  });

  test("turn left 360 degrees does nothing", () => {
    const ship = new Ship({
      position: {
        x: 170,
        y: 38,
      },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 4 },
    });

    ship.rotateWaypointLeft(360);

    expect(ship.getPosition()).toEqual({ x: 170, y: 38, orientation: "E" });
    expect(ship.getWaypoint()).toEqual({ x: 10, y: 4 });
  });

  test("ship can read instructions for waypoint", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 1 },
    });

    ship.readWaypointInstructions(["F10", "N3", "F7", "R90", "F11"]);

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 214, y: -72 });
    expect(ship.getManhattanDistance()).toEqual(286);
  });

  test("ship can read instructions for waypoint correctly", () => {
    const ship = new Ship({
      position: { x: 0, y: 0 },
      orientation: "E",
      type: "WAYPOINT",
      waypoint: { x: 10, y: 1 },
    });

    ship.readWaypointInstructions(["R180", "S4"]);

    expect(ship.getPosition()).toEqual({ orientation: "E", x: 0, y: 0 });
    expect(ship.getWaypoint()).toEqual({ x: -10, y: -5 });
  });

  test("test parsing of file", () => {
    const result = parseFile("day12input.txt");

    expect(result[0]).toEqual("R180");
    expect(result[result.length - 1]).toEqual("F97");
  });

  test("test part 2", () => {
    expect(part2("test.txt")).toEqual(286);
    expect(part2("day12input.txt")).toEqual(23960);
  });
});
