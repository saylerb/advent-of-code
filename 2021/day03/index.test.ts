import { countBits, processBitCount } from "./index.js";

describe("part 1", () => {
  test("can get most common bit", () => {
    const diagnosticReport: string[] = ["00100", "11110", "10110"];

    const result = countBits(diagnosticReport);

    expect(result).toEqual({
      gammaDec: 22,
      gamma: "10110",
      epsilonDec: 9,
      epsilon: "01001",
      powerConsumption: 198,
    });
  });

  test("process bit count", () => {
    const bitCount = {
      "0": { "0": 1, "1": 2 },
      "1": { "0": 2, "1": 1 },
      "2": { "0": 0, "1": 3 },
      "3": { "0": 1, "1": 2 },
      "4": { "0": 3, "1": 0 },
    };

    expect(processBitCount(bitCount)).toEqual("10110");
  });
});
