import { Cube } from "./Cube";
import { Point } from "./Point";

export class PocketDimension {
  constructor(cubes, dimensions) {
    this._cubeMap = this.createCubeMap(cubes);
    this.dimensions = dimensions;
  }

  get cubeMap() {
    return this._cubeMap;
  }

  createCubeMap(inputCubes) {
    const theMap = new Map();

    inputCubes.forEach((cube) => {
      theMap.set(JSON.stringify(cube.point), cube);
    });

    return theMap;
  }

  nextCubeState(trackedCubes, cube) {
    const totalActiveSurroundingCubes = trackedCubes.reduce((acc, cube) => {
      if (cube.active) {
        acc++;
      }
      return acc;
    }, 0);

    if (cube.active) {
      if (
        totalActiveSurroundingCubes === 2 ||
        totalActiveSurroundingCubes === 3
      ) {
        // cube remains active
        return cube;
      } else {
        // cube shuts off
        return new Cube({ point: cube.point, active: false });
      }
    }
    if (cube.inactive) {
      if (totalActiveSurroundingCubes === 3) {
        return new Cube({ point: cube.point, active: true });
      } else {
        // cube remains inactive
        return cube;
      }
    }
  }

  next() {
    const newTrackedMap = new Map();
    const untrackedMap = new Map();
    // first go through each cube and gather untracked cubes

    for (let [serializedPoint, trackedCube] of this._cubeMap) {
      const { tracked, untracked } = this.getSurroundingCubes(
        trackedCube.point
      );

      const nextCube = this.nextCubeState(tracked, trackedCube);

      newTrackedMap.set(serializedPoint, nextCube);

      // keep track of adjacent cubes that are untracked (cubes on the edge)
      untracked.forEach((untrackedCube) => {
        untrackedMap.set(JSON.stringify(untrackedCube.point), untrackedCube);
      });
    }

    // cycle through untracked cubes and get all
    // adjacent cubes that are already tracked
    for (let [serializedPoint, untrackedCube] of untrackedMap) {
      const { tracked } = this.getSurroundingCubes(untrackedCube.point);

      const nextCube = this.nextCubeState(tracked, untrackedCube);

      newTrackedMap.set(serializedPoint, nextCube);
    }

    this._cubeMap = newTrackedMap;
  }

  getCubeAtPoint(point) {
    return this._cubeMap.get(JSON.stringify(point));
  }

  totalCubes() {
    return this._cubeMap.size;
  }

  totalActive() {
    let total = 0;
    for (const [_, value] of this._cubeMap) {
      if (value.active) [total++];
    }

    return total;
  }

  totalInactive() {
    let total = 0;
    for (const [_, value] of this._cubeMap) {
      if (!value.active) [total++];
    }

    return total;
  }

  getSurroundingCubes(point) {
    let lookupFn;

    if (this.dimensions === 4) {
      lookupFn = PocketDimension.getSurroundingPoints4d;
    } else {
      lookupFn = PocketDimension.getSurroundingPoints;
    }
    const points = lookupFn(point);

    const tracked = [];
    const untracked = [];

    points.forEach(({ x, y, z, w }) => {
      const point = new Point({ x, y, z, w });

      const searchResult = this.getCubeAtPoint(point);

      if (typeof searchResult === "undefined") {
        untracked.push(new Cube({ point, active: false }));
      } else {
        tracked.push(searchResult);
      }
    });

    return { tracked, untracked };
  }

  static create(lines, dimensions = 3) {
    const cubes = lines.flatMap((row, y) => {
      return row.split("").map((xValue, x) => {
        let point;

        if (dimensions === 3) {
          point = new Point({ x, y, z: 0 });
        } else {
          point = new Point({ x, y, z: 0, w: 0 });
        }

        return new Cube({
          point,
          active: xValue === "#",
        });
      });
    });

    return new PocketDimension(cubes, dimensions);
  }

  static getSurroundingPoints({ x, y, z }) {
    const result = [];
    for (let newX = x - 1; newX <= x + 1; newX++) {
      for (let newY = y - 1; newY <= y + 1; newY++) {
        for (let newZ = z - 1; newZ <= z + 1; newZ++) {
          const isCurrentCube = newX === x && newY === y && newZ === z;
          if (!isCurrentCube) {
            result.push(new Point({ x: newX, y: newY, z: newZ }));
          }
        }
      }
    }

    return result;
  }

  static getSurroundingPoints4d({ x, y, z, w }) {
    const result = [];
    for (let newX = x - 1; newX <= x + 1; newX++) {
      for (let newY = y - 1; newY <= y + 1; newY++) {
        for (let newZ = z - 1; newZ <= z + 1; newZ++) {
          for (let newW = w - 1; newW <= w + 1; newW++) {
            const isCurrentCube =
              newX === x && newY === y && newZ === z && newW === w;
            if (!isCurrentCube) {
              result.push(new Point({ x: newX, y: newY, z: newZ, w: newW }));
            }
          }
        }
      }
    }

    return result;
  }
}
