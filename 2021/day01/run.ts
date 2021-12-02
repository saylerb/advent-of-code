import { countIncreases, processDepths } from "./index.js";

(() => {
  const depths: number[] = processDepths("../inputs/2021/day01part01");

  const count = countIncreases(depths);

  console.log("Count:", count);
})();
