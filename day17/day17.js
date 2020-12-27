import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const lines = parseFile(fileName);

  const pocket = createPocketDimension(lines);

  for (let i = 0; i < 6; i++) {
    pocket.next();
  }

  return pocket.totalActive();
}

export function part2() {}

export class Point {
  constructor({ x, y, z }) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Cube {
  constructor({ point, active }) {
    this.point = point;
    this.active = active;
  }

  printState() {
    if (this.active) {
      return "#";
    } else {
      return ".";
    }
  }
}

export class PocketDimension {
  constructor(cubes) {
    this._cubeMap = this.createCubeMap(cubes);
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
    if (!cube.active) {
      if (totalActiveSurroundingCubes === 3) {
        return new Cube({ point: cube.point, active: true });
      } else {
        // cube remains inactive
        return cube;
      }
    }
  }

  next() {
    const trackedMap = new Map();

    let total = 0;

    const untrackedMap = new Map();
    // first go through each cube and gather cubes not tracked

    for (const [key, value] of this._cubeMap) {
      // console.log(value.point);
      const { tracked, untracked } = this.getSurroundingCubes(value.point);

      const nextCube = this.nextCubeState(tracked, value);

      trackedMap.set(key, nextCube);

      untracked.forEach((cube) => {
        untrackedMap.set(JSON.stringify(cube.point), cube);
      });
    }

    for (const [key, value] of untrackedMap) {
      // console.log(value.point);
      const { tracked, untracked } = this.getSurroundingCubes(value.point);

      const nextCube = this.nextCubeState(tracked, value);

      trackedMap.set(key, nextCube);
    }

    this._cubeMap = trackedMap;
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

  addInactiveCubeAtPoint(point) {
    this._cubeMap.set(
      JSON.stringify(point),
      new Cube({ point, active: false })
    );
  }

  getSurroundingCubes(point) {
    // console.log({ point });
    const coords = getSurroundingCubeCoords({
      x: point.x,
      y: point.y,
      z: point.z,
    });
    // console.log("finding cubes");
    // let inActiveCubesCreated = 0;

    const tracked = [];
    const untracked = [];

    const cubes = coords.forEach(({ x, y, z }) => {
      const point = new Point({ x, y, z });

      const searchResult = this.getCubeAtPoint(point);

      if (typeof searchResult === "undefined") {
        untracked.push(new Cube({ point, active: false }));
      } else {
        tracked.push(searchResult);
      }
    });

    // console.log(`${untracked.length} cubes not found`);

    return { tracked, untracked };
  }

  printCubeArray() {
    const result = [];

    for (const value of this._cubeMap.values()) {
      if (typeof result[value.point.z] !== "undefined") {
        result[value.point.z] = result[value.point.z].concat(value);
      } else {
        result[value.point.z] = [value];
      }
    }

    return result
      .map((z) => {
        // List of Cubes at z index

        const cubesByYIndex = [];

        z.forEach((cube) => {
          if (typeof cubesByYIndex[cube.point.y] !== "undefined") {
            cubesByYIndex[cube.point.y] = cubesByYIndex[cube.point.y].concat(
              cube
            );
          } else {
            cubesByYIndex[cube.point.y] = [cube];
          }
        });

        return cubesByYIndex.map((rows) =>
          // Sort each row of Y by x coordinate
          rows.sort((cubeA, cubeB) => cubeA.point.x - cubeB.point.x)
        );
      })
      .flatMap((zDimensions) => {
        return zDimensions.map((yDimensions) => {
          return yDimensions
            .map((cube) => {
              if (cube.active) {
                return "#";
              } else {
                return ".";
              }
            })
            .join("");
        });
      });

    // return { totalZ, totalY, totalX };
    for (const [_, value] of this._cubeMap) {
      result.push(value);
    }
    return result;
  }
}
function groupByArray(xs, key) {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }
    return rv;
  }, []);
}

export function createPocketDimension(lines) {
  const cubes = lines.flatMap((row, y) => {
    return row.split("").map((xValue, x) => {
      return new Cube({
        point: new Point({ x, y, z: 0 }),
        active: xValue === "#",
      });
    });
  });

  return new PocketDimension(cubes);
}

export function processInitialState(initialState) {}

export function getSurroundingCubeCoords({ x, y, z }) {
  const result = [];
  for (let newX = x - 1; newX <= x + 1; newX++) {
    for (let newY = y - 1; newY <= y + 1; newY++) {
      for (let newZ = z - 1; newZ <= z + 1; newZ++) {
        const isCurrentCube = newX === x && newY === y && newZ === z;
        if (!isCurrentCube) {
          result.push({ x: newX, y: newY, z: newZ });
        }
      }
    }
  }

  return result;
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
