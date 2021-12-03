import { countIncreases, processDepths, getWindowSums } from "./index.js";

(() => {
  const depths: number[] = processDepths("../inputs/2021/day01part01");
  const windowSums: number[] = getWindowSums(depths);

  const count = countIncreases(depths);
  const windowCount = countIncreases(windowSums);

  const windowIncreases = console.log({ count, windowCount });
})();
