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

export function countBits(report: string[]): PowerConsumption {
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

export function processBitCount(bitCount: BitCounts) {
  let result = "";

  const keys = Object.keys(bitCount);

  keys.forEach((key) => {
    const count: BitCount = bitCount[parseInt(key, 10)];

    if (count[0] < count[1]) {
      result += "1";
    } else {
      result += "0";
    }
  });

  return result;
}
