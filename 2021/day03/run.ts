import { calculatePowerConsumption, findLifeSupportRating } from "./index.js";
import { parseFile } from "./parseFile.js";

(() => {
  const rows: string[] = parseFile("../../inputs/2021/day03part01.txt");
  const powerConsumption = calculatePowerConsumption(rows);
  const lifeSupportRating = findLifeSupportRating(rows);

  console.log({ powerConsumption, lifeSupportRating });
})();
