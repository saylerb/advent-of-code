import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function part1(fileName) {
  const lines = parseFile(fileName);
  const instructions = lines.map((line) => convert(line));

  return run(instructions);
}

function part2(fileName) {
  const lines = parseFile(fileName);
  const instructions = lines.map((line) => convert(line));

  const results = tryReplacing(instructions, ["nop", "jmp"]);

  return results.filter(({ terminated }) => terminated);
}

function parseFile(filename) {
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

function run(instructions) {
  let indexesSeen = [];
  let currentPosition = 0;
  let acc = 0;
  let terminated = false;

  while (true) {
    // Check to see if last instruction was run
    if (currentPosition === instructions.length) {
      terminated = true;
      break;
    }

    //console.log(currentPosition)

    const { instruction, value } = instructions[currentPosition];

    if (typeof value === "undefined") {
      console.log(
        "value is undefined at index: ",
        currentPosition,
        instruction
      );
    }

    //console.log("current instruction: ", instruction, value)
    //console.log("current acc: ", acc)
    //console.log("indexes seen: ", indexesSeen)
    //console.log("currentPosition", currentPosition)

    if (indexesSeen.some((index) => index === currentPosition)) {
      //console.log("finished")
      break;
    }

    // Need to add index to seen list before incrementing position
    indexesSeen = indexesSeen.concat(currentPosition);

    if (instruction === "nop") {
      currentPosition++;
    }

    if (instruction === "acc") {
      acc = acc + value;
      currentPosition++;
    }

    if (instruction === "jmp") {
      currentPosition = currentPosition + value;
    }
  }
  return { acc, terminated };
}

function findIndexes(instructions, instructionsToFind) {
  return instructions.reduce((acc, { instruction }, index) => {
    const found = instructionsToFind.some((toFind) => toFind === instruction);

    if (found) {
      acc = acc.concat({ index, instruction });
    }

    return acc;
  }, []);
}

function convert(line) {
  const instruction = line.substring(0, 3);
  const value = line.split(/\+|\-/)[1];
  const sign = line.split(" ")[1][0];

  const num = parseInt(sign + value);

  return { instruction, value: num };
}

function tryReplacing(instructions, toReplace) {
  const indexes = findIndexes(instructions, toReplace);

  //console.log({ indexes })

  return indexes.map(({ index, instruction }) => {
    let modifiedInstruction;

    if (instruction === "jmp") {
      modifiedInstruction = "nop";
    } else {
      modifiedInstruction = "jmp";
    }

    const modifiedInstructions = [...instructions];
    const currentValue = modifiedInstructions[index];

    //console.log({currentValue})

    modifiedInstructions[index] = {
      ...currentValue,
      instruction: modifiedInstruction,
    };

    //console.log(modifiedInstructions)
    return run(modifiedInstructions);
  });
}

export default {
  part1,
  part2,
  parseFile,
  convert,
  run,
  findIndexes,
  tryReplacing,
};
