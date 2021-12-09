import {
  parseLines,
  horizontalAndVerticalFilter,
  calculatePointsCoveredByALine,
  countPoints,
} from "./index.js";

(() => {
  const lines = parseLines("../../../inputs/2021/day05.txt");

  const filtered = horizontalAndVerticalFilter(lines);

  const calculateed = filtered.flatMap((filtered) =>
    calculatePointsCoveredByALine(filtered)
  );

  const count = countPoints(calculateed);

  console.log({ count });
})();
