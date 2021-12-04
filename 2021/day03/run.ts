import { countBits } from "./index.js";
import { parseFile } from "./parseFile.js";

(() => {
  const rows: string[] = parseFile("../../inputs/2021/day03part01.txt");
  const result = countBits(rows);

  console.log(result);
})();
