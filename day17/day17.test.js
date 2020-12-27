import { part1, part2, parseFile } from "./day17.js";
import { PocketDimension } from "./PocketDimension";
import { Cube } from "./Cube";
import { Point } from "./Point";

describe("part 1", () => {
  test("can get a list of coordinates of surrounding cubes", () => {
    // Should be 26 total "cubes"
    const result = PocketDimension.getSurroundingPoints({ x: 0, y: 0, z: 0 });
    expect(result.length).toEqual(26);
    expect(result).not.toEqual(
      expect.arrayContaining([
        {
          x: 0,
          y: 0,
          z: 0,
        },
      ])
    );
    expect(result).toEqual(
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

  test("can create an active cube that can print itself", () => {
    const active = new Cube({ x: 0, y: 0, z: 0, active: true });

    expect(active.printState()).toEqual("#");
  });

  test("create initial cubes from input", () => {
    const initalState = [".#.", "..#", "###"];

    const pocket = PocketDimension.create(initalState);

    expect(pocket.totalCubes()).toEqual(9);
    expect(pocket.totalActive()).toEqual(5);
    expect(pocket.totalInactive()).toEqual(4);

    expect(pocket.cubeMap.size).toEqual(9);
    const point = new Point({ x: 0, y: 0, z: 0 });
    const stringifiedPoint = JSON.stringify(point);
    expect(pocket.cubeMap.get(stringifiedPoint)).toEqual(
      new Cube({ point, active: false })
    );

    expect(pocket.getCubeAtPoint(new Point({ x: 0, y: 0, z: 0 }))).toEqual(
      new Cube({ point, active: false })
    );

    expect(pocket.getCubeAtPoint(new Point({ x: 10, y: 10, z: 10 }))).toEqual(
      undefined
    );
  });

  test("can get all the surround cubes for a specific point", () => {
    const pocket = PocketDimension.create([".#.", "..#", "###"]);

    const { tracked, untracked } = pocket.getSurroundingCubes(
      new Point({ x: 0, y: 0, z: 0 })
    );
    expect(tracked.length).toEqual(3);
    expect(untracked.length).toEqual(23);
  });

  test("can run the rules against initial state", () => {
    const pocket = PocketDimension.create([".#.", "..#", "###"]);

    pocket.next();
    expect(pocket.totalActive()).toEqual(11);

    pocket.next();
    expect(pocket.totalActive()).toEqual(21);

    pocket.next();
    expect(pocket.totalActive()).toEqual(38);

    pocket.next();
    pocket.next();
    pocket.next();
    expect(pocket.totalActive()).toEqual(112);
  });

  test("can run rules against input", () => {
    const pocket = PocketDimension.create([".#.", "..#", "###"]);

    pocket.next();
    expect(pocket.totalActive()).toEqual(11);

    pocket.next();
    expect(pocket.totalActive()).toEqual(21);

    pocket.next();
    expect(pocket.totalActive()).toEqual(38);

    pocket.next();
    pocket.next();
    pocket.next();
    expect(pocket.totalActive()).toEqual(112);
  });

  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(112);
    expect(part1("day17input.txt")).toEqual(269);
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining([".#.", "###"])
    );
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
