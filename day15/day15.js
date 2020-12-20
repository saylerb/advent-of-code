export function part1(input, rounds) {
  const starting = parseInput(input);

  const lastNumber = play(starting, rounds);

  return lastNumber;
}

export function play(startingNumbers, totalRounds, saveNumbers = false) {
  let map = {};

  if (totalRounds === startingNumbers.length) {
    return startingNumbers;
  }

  startingNumbers.forEach((number, index) => {
    const roundNumber = index + 1;
    addRoundToMap(number, roundNumber, map);
  });

  let allNumbers = [...startingNumbers];

  let previous = startingNumbers[2];

  for (
    let round = startingNumbers.length + 1;
    round < totalRounds + 1;
    round++
  ) {
    if (typeof map[previous]["secondPrev"] === "undefined") {
      addRoundToMap(0, round, map);

      if (saveNumbers) {
        allNumbers.push(0);
      }

      previous = 0;
      continue;
    }

    if (typeof map[previous]["secondPrev"] !== "undefined") {
      const { prev, secondPrev } = map[previous];
      const age = prev - secondPrev;
      addRoundToMap(age, round, map);
      if (saveNumbers) {
        allNumbers.push(age);
      }

      previous = age;
    }
  }

  if (saveNumbers) {
    return allNumbers;
  } else {
    return previous;
  }
}

export function addRoundToMap(number, round, map) {
  // Changing this to mutate map in place
  // Rather than returning new copy was much more performant
  if (
    typeof map[number] === "undefined" ||
    typeof map[number]["prev"] === "undefined"
  ) {
    map[number] = { prev: round };
  } else {
    map[number] = { prev: round, secondPrev: map[number]["prev"] };
  }
}

export function parseInput(input) {
  return input.split(",").map((input) => parseInt(input));
}
