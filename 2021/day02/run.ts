import { parseFile } from "./parseFile.js";
import { computeSubmarinePosition } from "./index.js";

(() => {
  const instructions = parseFile("../../inputs/2021/day02part01.txt");

  const position = computeSubmarinePosition(instructions);
  const result = position.depth * position.horizontalPosition;

  console.log({ position, result });
})();
