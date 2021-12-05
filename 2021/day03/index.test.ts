import {
  calculatePowerConsumption,
  findCO2Rating,
  findLifeSupportRating,
  findOxygenRating,
  processBitCount,
  findValuesWithBitForIndex,
} from "./index.js";

describe("part 1", () => {
  test("can get most common bit", () => {
    const diagnosticReport: string[] = ["00100", "11110", "10110"];

    const result = calculatePowerConsumption(diagnosticReport);

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

describe("part 2", () => {
  test("can find diagnostic readings with a specific bit in a specific index", () => {
    const diagnosticReport: string[] = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];

    expect(findValuesWithBitForIndex(diagnosticReport, 0, "1")).toEqual({
      found: ["11110", "10110", "10111", "10101", "11100", "10000", "11001"],
      other: ["00100", "01111", "00111", "00010", "01010"],
    });
  });

  test("can split current numbers into least common and most common bit groups", () => {
    // oxygen generator rating is based on searching for the most common bit
    // co2 scrubber rating is based on searching for least common bit
    const diagnosticReport: string[] = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];

    expect(findOxygenRating(diagnosticReport)).toEqual(23);
    expect(findCO2Rating(diagnosticReport)).toEqual(10);
    expect(findLifeSupportRating(diagnosticReport)).toEqual(230);
  });
});
