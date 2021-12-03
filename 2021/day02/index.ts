interface SubmarinePosition {
  horizontalPosition: number;
  depth: number;
}

interface SubmarinePositionPart2 {
  horizontalPosition: number;
  depth: number;
  aim: number;
}

export function computeSubmarinePosition(
  instructions: string[]
): SubmarinePosition {
  let horizontalPosition = 0;
  let depth = 0;

  instructions.forEach((instruction) => {
    const [direction, distance] = instruction.split(" ");

    if (direction === "forward") {
      horizontalPosition += parseInt(distance, 10);
    }

    if (direction === "down") {
      depth += parseInt(distance, 10);
    }

    if (direction === "up") {
      depth -= parseInt(distance, 10);
    }
  });
  return { horizontalPosition, depth };
}

export function computeSubmarinePositionPart2(
  instructions: string[]
): SubmarinePositionPart2 {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  instructions.forEach((instruction) => {
    const [direction, distance] = instruction.split(" ");

    if (direction === "forward") {
      horizontalPosition += parseInt(distance, 10);
      depth += aim * parseInt(distance, 10);
    }

    if (direction === "down") {
      aim += parseInt(distance, 10);
    }

    if (direction === "up") {
      aim -= parseInt(distance, 10);
    }
  });
  return { horizontalPosition, depth, aim };
}
