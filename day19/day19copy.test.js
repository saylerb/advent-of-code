import { part1, part2, parseFile, isMatchForRule } from "./day19.js";

describe("part 1", () => {
  test.only("can handle 3 non-conditional branches to other rules", () => {
    const rules = {
      0: [["2", "1", "3"]],
      1: [
        ["2", "3"],
        ["3", "2"],
      ],
      2: [["a"]],
      3: [["b"]],
    };
    expect(isMatchForRule(rules, 0, "aabb")).toBe(true);
  });
});
