import fs from "fs";
import path, { parse } from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const lines = parseFile(fileName);

  const notes = linesToNotes(lines);

  const departures = getNextDepartureForEachBus(notes);

  const [busId, departureTime] = findBusToTake(departures);

  return (departureTime - notes.earliestArrival) * busId;
}

export function findNearestPreviousMultiple(time, number) {
  let found;
  let current = time;

  while (typeof found === "undefined" && current > 0) {
    if (current % number === 0) {
      found = current;
      break;
    }

    current--;
  }

  return found;
}

export function getBusPairs(busIds) {
  let acc = new Array();

  busIds.forEach((id, index) => {
    if (id !== "x") {
      acc.push([parseInt(id), index]);
    }
    return acc;
  });

  return acc;
}

export function doesBusDepartAtCorrectTime({
  currentTime,
  nextBusId,
  timeGap,
}) {
  return (currentTime + timeGap) % nextBusId === 0;
}

export function allPairsMatch(pairs, currentTime) {
  return pairs.every((pair, index) => {
    if (index === 0) {
      return true;
    }

    return doesBusDepartAtCorrectTime({
      currentTime,
      nextBusId: pair[0],
      timeGap: pair[1],
    });
  });
}

export function findMagicTimeBruteForce(pairs) {
  let time = 99999999999992;

  let found;

  //&& time < 100_000_000_000_000
  while (typeof found === "undefined") {
    const allWork = allPairsMatch(pairs, time);

    if (allWork) {
      found = time;
      break;
    }

    time = time + pairs[0][0];
  }

  return found;
}

export function part2(fileName) {
  const lines = parseFile(fileName);

  const pairs = getBusPairs(lines[1].split(","));

  const { moduli, remainders } = getRemaindersAndModuli(pairs);
  //return findMagicTimeBruteForce(pairs);

  // Note: Brute force solution works for test
  // input but not problem input

  return crt(moduli, remainders);
}

function crt(moduli, remainders) {
  const bigModuli = moduli.map((modulus) => BigInt(modulus));
  const bigRemainders = remainders.map((remainder) => BigInt(remainder));

  let sum = 0n;
  const prod = bigModuli.reduce((a, c) => a * c, 1n);

  for (let i = 0; i < bigModuli.length; i++) {
    const [ni, ri] = [bigModuli[i], bigRemainders[i]];
    const p = prod / ni;
    sum += ri * p * multiplicativeInverse(p, ni);
  }
  return sum % prod;
}

const multiplicativeInverse = (a, modulus) => {
  // Calculate current value of a mod modulus
  const b = BigInt(a % modulus);

  // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
  for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
    if ((b * hipothesis) % modulus == 1n) return hipothesis;
  }
  // If we do not find it, we return 1
  return 1n;
};

export function getRemaindersAndModuli(busPairs) {
  return busPairs.reduce(
    (acc, pair) => {
      const [busId, index] = pair;
      const bus = parseInt(busId);

      let remainder;
      if (index === 0) {
        remainder = 0;
      } else if (bus > index) {
        remainder = bus - index;
      } else {
        remainder = findNearestPreviousMultiple(index, bus) + (bus - index);
      }

      acc["moduli"] = acc["moduli"].concat(bus);
      acc["remainders"] = acc["remainders"].concat(remainder);

      return acc;
    },
    { moduli: [], remainders: [] }
  );
}

export function findRemainder(remainder, modulus) {
  if (modulus > remainder) {
    return -index;
  }

  // add multiples of moduli until positve

  let current = -index;

  while (current < 0) {
    current = current + bus;
  }

  return current;
}

export function linesToNotes(lines) {
  const [part1, part2] = lines;
  const earliestArrival = parseInt(part1);
  const availableBuses = part2
    .split(",")
    .filter((bus) => bus != "x")
    .map((id) => parseInt(id));

  return { earliestArrival, availableBuses };
}

export function getNextDeparture(time, busId) {
  let nextTime;
  let currentTime = time;

  while (typeof nextTime === "undefined") {
    if (currentTime % busId === 0) {
      nextTime = currentTime;
    }
    currentTime++;
  }

  return nextTime;
}

export function getNextDepartureForEachBus({
  earliestArrival,
  availableBuses,
}) {
  return availableBuses.reduce((acc, busId) => {
    acc[busId] = getNextDeparture(earliestArrival, busId);
    return acc;
  }, {});
}

export function findBusToTake(departures) {
  // keys are strings in object entries
  const [busId, departure] = Object.entries(departures).sort((a, b) => {
    return a[1] - b[1];
  })[0];

  return [parseInt(busId), departure];
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
