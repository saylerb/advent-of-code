import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Ship {
  constructor(x = 0, y = 0, orientation = "E") {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }

  readInstructions(instructions) {
    instructions.forEach((instruction) => {
      const parts = instruction.split(/(\d+)/).filter((part) => part !== "");
      const direction = parts[0];
      const number = parseInt(parts[1]);

      if (direction === "F") {
        this.moveForward(number);
      }

      if (direction === "N") {
        this.moveNorth(number);
      }

      if (direction === "E") {
        this.moveEast(number);
      }

      if (direction === "S") {
        this.moveSouth(number);
      }

      if (direction === "W") {
        this.moveWest(number);
      }

      if (direction === "R") {
        this.turnRight(number);
      }

      if (direction === "L") {
        this.turnLeft(number);
      }
    });
  }

  getPosition() {
    const { x, y, orientation } = this;
    return { x, y, orientation };
  }

  moveForward(units = 1) {
    if (this.orientation === "N") {
      this.moveNorth(units);
    } else if (this.orientation === "S") {
      this.moveSouth(units);
    } else if (this.orientation === "E") {
      this.moveEast(units);
    } else if (this.orientation === "W") {
      this.moveWest(units);
    }
  }

  moveNorth(units = 1) {
    this.y = this.y + units;
  }

  moveSouth(units = 1) {
    this.y = this.y - units;
  }

  moveEast(units = 1) {
    this.x = this.x + units;
  }

  moveWest(units = 1) {
    this.x = this.x - units;
  }

  static numberToOrientation(number) {
    return { 0: "N", 90: "E", 180: "S", 270: "W" }[number.toString()];
  }

  static orientationToNumber(orientation) {
    return { N: 0, E: 90, S: 180, W: 270 }[orientation];
  }

  turnRight(degrees = 90) {
    const turnFunction = (currentDegrees, degrees) => currentDegrees + degrees;
    this.getNewHeading(turnFunction, degrees);
  }

  turnLeft(degrees = 90) {
    const turnFunction = (currentDegrees, degrees) => currentDegrees - degrees;
    this.getNewHeading(turnFunction, degrees);
  }

  getNewHeading(turnFn, degrees) {
    const currentDegrees = Ship.orientationToNumber(this.orientation);
    const newNumber = (turnFn(currentDegrees, degrees) + 360) % 360;

    this.orientation = Ship.numberToOrientation(newNumber);
  }

  getManhattanDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

export function part1(fileName) {
  const lines = parseFile(fileName);

  const ship = new Ship();

  ship.readInstructions(lines);

  return ship.getManhattanDistance();
}

export function part2() {}

export function parseFile(filename) {
  let data;
  let rows;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    rows = data.split("\n").filter((row) => row !== "");
  } catch (err) {
    console.error(err);
  }

  return rows;
}
