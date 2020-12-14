import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Ship {
  constructor({
    position: { x = 0, y = 0 },
    orientation = "E",
    type = "NORMAL",
    waypoint = { x: 10, y: 1 },
  }) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.waypoint = waypoint;
    this.type = type;
  }

  getWaypoint() {
    return this.waypoint;
  }

  readWaypointInstructions(instructions) {
    instructions.forEach((instruction) => {
      const parts = instruction.split(/(\d+)/).filter((part) => part !== "");
      const direction = parts[0];
      const number = parseInt(parts[1]);

      if (direction === "F") {
        this.moveFowardToWaypoint(number);
      }

      if (direction === "N") {
        this.moveWaypointNorth(number);
      }

      if (direction === "E") {
        this.moveWaypointEast(number);
      }

      if (direction === "S") {
        this.moveWaypointSouth(number);
      }

      if (direction === "W") {
        this.moveWaypointWest(number);
      }

      if (direction === "R") {
        this.rotateWaypointRight(number);
      }

      if (direction === "L") {
        this.rotateWaypointLeft(number);
      }
    });
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

  moveFowardToWaypoint(units = 1) {
    this.y = this.y + this.waypoint.y * units;
    this.x = this.x + this.waypoint.x * units;
  }

  moveWaypointNorth(units = 1) {
    this.waypoint = {
      ...this.waypoint,
      y: this.waypoint.y + units,
    };
  }

  moveWaypointSouth(units = 1) {
    this.waypoint = {
      ...this.waypoint,
      y: this.waypoint.y - units,
    };
  }

  moveWaypointEast(units = 1) {
    this.waypoint = {
      ...this.waypoint,
      x: this.waypoint.x + units,
    };
  }

  moveWaypointWest(units = 1) {
    this.waypoint = {
      ...this.waypoint,
      x: this.waypoint.x - units,
    };
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

  rotateWaypointRight(degrees) {
    // hardcoding the rotation rules
    if (degrees === 90) {
      this.waypoint = { x: this.waypoint.y, y: -1 * this.waypoint.x };
    }

    if (degrees === 180) {
      this.waypoint = {
        x: -1 * this.waypoint.x,
        y: -1 * this.waypoint.y,
      };
    }

    if (degrees === 270) {
      this.waypoint = {
        x: -1 * this.waypoint.y,
        y: this.waypoint.x,
      };
    }
  }

  rotateWaypointLeft(degrees) {
    // hardcoding the rotation rules
    if (degrees === 90) {
      this.waypoint = { x: -1 * this.waypoint.y, y: this.waypoint.x };
    }

    if (degrees === 180) {
      this.waypoint = {
        x: -1 * this.waypoint.x,
        y: -1 * this.waypoint.y,
      };
    }

    if (degrees === 270) {
      this.waypoint = { x: this.waypoint.y, y: -1 * this.waypoint.x };
    }
  }

  static numberToOrientation(number) {
    return { 0: "N", 90: "E", 180: "S", 270: "W" }[number.toString()];
  }

  static orientationToNumber(orientation) {
    return { N: 0, E: 90, S: 180, W: 270 }[orientation];
  }

  turnRight(degrees) {
    const turnFunction = (currentDegrees, degrees) => currentDegrees + degrees;
    this.getNewHeading(turnFunction, degrees);
  }

  turnLeft(degrees) {
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

  const ship = new Ship({
    position: { x: 0, y: 0 },
    orientation: "E",
    type: "NORMAL",
  });

  ship.readInstructions(lines);

  return ship.getManhattanDistance();
}

export function part2(fileName) {
  const lines = parseFile(fileName);

  const ship = new Ship({
    position: { x: 0, y: 0 },
    orientation: "E",
    type: "WAYPOINT",
  });

  ship.readWaypointInstructions(lines);

  return ship.getManhattanDistance();
}

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
