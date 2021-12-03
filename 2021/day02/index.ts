interface SubmarinePosition {
  horizontalPosition: number;
  depth: number;
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
