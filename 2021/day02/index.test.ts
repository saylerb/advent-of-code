import {
  computeSubmarinePosition,
  computeSubmarinePositionPart2,
} from "./index.js";

describe("part 1", () => {
  test("forward can increment horizontal position", () => {
    const instructions: string[] = ["forward 5"];
    const { horizontalPosition } = computeSubmarinePosition(instructions);

    expect(horizontalPosition).toEqual(5);
  });

  test("forward can increment depth when going down", () => {
    const instructions: string[] = ["down 5"];
    const { depth } = computeSubmarinePosition(instructions);

    expect(depth).toEqual(5);
  });

  test("forward can decrement depth when going up", () => {
    const instructions: string[] = ["up 5"];
    const { depth } = computeSubmarinePosition(instructions);

    expect(depth).toEqual(-5);
  });

  test("can calculate correct position", () => {
    const instructions = [
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ];

    expect(computeSubmarinePosition(instructions)).toEqual({
      horizontalPosition: 15,
      depth: 10,
    });
  });
});

describe("part 2", () => {
  test("down increases aim", () => {
    const instructions = ["down 5"];

    expect(computeSubmarinePositionPart2(instructions)).toEqual({
      horizontalPosition: 0,
      depth: 0,
      aim: 5,
    });
  });

  test("up decreases aim", () => {
    const instructions = ["up 5"];

    expect(computeSubmarinePositionPart2(instructions)).toEqual({
      horizontalPosition: 0,
      depth: 0,
      aim: -5,
    });
  });

  test("forward increases depth by x multiplied by aim ammount", () => {
    const instructions = ["down 5", "forward 5"];

    expect(computeSubmarinePositionPart2(instructions)).toEqual({
      horizontalPosition: 5,
      depth: 25,
      aim: 5,
    });
  });

  test("can calculate correct position", () => {
    const instructions = [
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ];

    expect(computeSubmarinePositionPart2(instructions)).toEqual({
      horizontalPosition: 15,
      depth: 60,
      aim: 10,
    });
  });
});
