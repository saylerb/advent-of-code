import { parseFile } from "./parseFile.js";
import { computeSubmarinePositionPart2 } from "./index.js";

(() => {
  const instructions = parseFile("../../inputs/2021/day02part01.txt");

  const position = computeSubmarinePositionPart2(instructions);
  const result = position.depth * position.horizontalPosition;

  console.log({ position, result });
})();
