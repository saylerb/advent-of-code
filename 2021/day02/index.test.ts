import { computeSubmarinePosition } from "./index.js";

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
