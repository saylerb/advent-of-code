import { part1, part2, parseFile, getSurroundingCubes } from "./day17.js";

describe("part 1", () => {
  test("can get a list of coordinates of surrounding cubes", () => {
    const cubes = "thing";

    // Should be 26 total "cubes"
    expect(getSurroundingCubes({ x: 0, y: 0, z: 0 })).toEqual(
      expect.arrayContaining([
        // z = 0
        { x: 0, y: 1, z: 0 }, //  N
        { x: 1, y: 1, z: 0 }, //  NE
        { x: 1, y: 0, z: 0 }, //  E
        { x: 1, y: -1, z: 0 }, // SE
        { x: 0, y: -1, z: 0 }, // S
        { x: -1, y: -1, z: 0 }, // SW
        { x: -1, y: 0, z: 0 }, // W
        { x: -1, y: 1, z: 0 }, // NW

        // z = -1
        { x: 0, y: 0, z: -1 }, // extra cube (same x/y different z)
        { x: 0, y: 1, z: -1 }, //  N
        { x: 1, y: 1, z: -1 }, //  NE
        { x: 1, y: 0, z: -1 }, //  E
        { x: 1, y: -1, z: -1 }, // SE
        { x: 0, y: -1, z: -1 }, // S
        { x: -1, y: -1, z: -1 }, // SW
        { x: -1, y: 0, z: -1 }, // W
        { x: -1, y: 1, z: -1 }, // NW

        // z = +1
        { x: 0, y: 0, z: 1 }, // extra cube (same x/y different z)
        { x: 0, y: 1, z: 1 }, //  N
        { x: 1, y: 1, z: 1 }, //  NE
        { x: 1, y: 0, z: 1 }, //  E
        { x: 1, y: -1, z: 1 }, // SE
        { x: 0, y: -1, z: 1 }, // S
        { x: -1, y: -1, z: 1 }, // SW
        { x: -1, y: 0, z: 1 }, // W
        { x: -1, y: 1, z: 1 }, // NW
      ])
    );
  });

  test("test part 1", () => {
    expect(part1()).toBeUndefined();
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining(["Hello", "World"])
    );
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
