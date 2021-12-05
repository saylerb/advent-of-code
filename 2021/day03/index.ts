interface BitCount {
  0: number;
  1: number;
}

interface BitCounts {
  [key: number]: BitCount;
}

interface PowerConsumption {
  gammaDec: number;
  gamma: string;
  epsilonDec: number;
  epsilon: string;
  powerConsumption: number;
}

export function countBits(report: string[]): BitCounts {
  const result: BitCounts = {};

  report.forEach((reading: string) => {
    reading.split("").forEach((rawBit: string, index: number) => {
      const bit: number = parseInt(rawBit, 10);
      if (typeof result[index] === "undefined") {
        result[index] = { 0: 0, 1: 0 };
      }

      if (typeof result[index][bit as keyof BitCount] === "undefined") {
        result[index][bit as keyof BitCount] = 1;
      } else {
        result[index][bit as keyof BitCount] += 1;
      }
    });
  });

  return result;
}

export function calculatePowerConsumption(report: string[]): PowerConsumption {
  const result = countBits(report);

  // NOT ~ : ~ 10101         => 01010
  // XOR ^ :   10101 ^ 11111 => 01010
  // Not (~) creating a signed integer that is not easily passed to .toString(2)
  // to get the binary equivalent

  const gamma: string = processBitCount(result);
  const mask: string = "1".repeat(gamma.length); // create a bitmask of all 1's in the right length
  const gammaDec: number = parseInt(gamma, 2);
  const epsilonDec: number = gammaDec ^ parseInt(mask, 2); // flip all bits using XOR with mask of repeated 1's

  const powerConsumption = {
    gamma,
    gammaDec,
    epsilonDec,
    epsilon: epsilonDec.toString(2).padStart(5, "0"),
    powerConsumption: epsilonDec * gammaDec,
  };

  return powerConsumption;
}

export function mostCommonBit(
  count: BitCount,
  defaultBit: string = "1"
): string {
  if (count[0] < count[1]) {
    return "1";
  } else if (count[0] === count[1]) {
    return defaultBit;
  } else {
    return "0";
  }
}

export function leastCommonBit(
  count: BitCount,
  defaultBit: string = "0"
): string {
  if (count[0] < count[1]) {
    return "0";
  } else if (count[0] === count[1]) {
    return defaultBit;
  } else {
    return "1";
  }
}

export function processBitCount(bitCount: BitCounts) {
  let result = "";

  const keys = Object.keys(bitCount);

  keys.forEach((key) => {
    const count: BitCount = bitCount[parseInt(key, 10)];

    result += mostCommonBit(count);
  });

  return result;
}

interface SplitResult {
  found: string[];
  other: string[];
}

export function findOxygenRating(diagnosticReport: string[]): number {
  const found: string = findValue(Rating.OXYGEN, 0, diagnosticReport);
  return parseInt(found, 2);
}
export function findCO2Rating(diagnosticReport: string[]): number {
  const found = findValue(Rating.CO2, 0, diagnosticReport);
  return parseInt(found, 2);
}

export function findLifeSupportRating(diagnosticReport: string[]): number {
  return findCO2Rating(diagnosticReport) * findOxygenRating(diagnosticReport);
}

enum Rating {
  OXYGEN,
  CO2,
}

export function findValuesWithBitForIndex(
  diagnosticReport: string[],
  bitIndexToLookAt: number,
  bitOfInterest: string
): SplitResult {
  return diagnosticReport.reduce(
    (acc: SplitResult, current: string) => {
      if (current[bitIndexToLookAt] === bitOfInterest) {
        return { ...acc, found: [...acc.found, current] };
      } else {
        return { ...acc, other: [...acc.other, current] };
      }
    },
    {
      found: [],
      other: [],
    } as SplitResult
  );
}

export function findValue(
  ratingToFind: Rating,
  currentBitIndex: number,
  diagnosticReport: string[]
): string {
  const bitCounts: BitCounts = countBits(diagnosticReport);
  const bitCount: BitCount = bitCounts[currentBitIndex];

  let bitOfInterest: string;

  if (ratingToFind === Rating.OXYGEN) {
    bitOfInterest = mostCommonBit(bitCount);
  } else {
    bitOfInterest = leastCommonBit(bitCount);
  }

  const { found } = findValuesWithBitForIndex(
    diagnosticReport,
    currentBitIndex,
    bitOfInterest
  );

  if (found.length === 1) {
    return found[0];
  } else {
    return findValue(ratingToFind, currentBitIndex + 1, found);
  }
}
