import { part1, part2, parseFile, isMatchForRule } from "./day19.js";

describe("part 1", () => {
  test("can tell if a simple character match", () => {
    expect(isMatchForRule({ 1: [["a"]] }, 1, "a")).toBe(true);
    expect(isMatchForRule({ 1: [["a"]] }, 1, "b")).toBe(false);
  });

  test("branches to other rules are followed", () => {
    expect(isMatchForRule({ 1: [["2", "2"]], 2: [["a"]] }, 1, "a")).toBe(false);
    expect(isMatchForRule({ 1: [["2", "2"]], 2: [["a"]] }, 1, "aa")).toBe(true);
    expect(isMatchForRule({ 1: [["2", "2"]], 2: [["a"]] }, 1, "aaa")).toBe(
      false
    );
    expect(isMatchForRule({ 1: [["2", "2"]], 2: [["a"]] }, 1, "bb")).toBe(
      false
    );
  });

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

  test("can compare a compound rule", () => {
    const rules = { 0: [["1", "2"]], 1: [["a"]], 2: [["b"]] };
    expect(isMatchForRule(rules, 0, "a")).toBe(false);
    expect(isMatchForRule(rules, 0, "ab")).toBe(true);
    expect(isMatchForRule(rules, 0, "b")).toBe(false);
    expect(isMatchForRule(rules, 0, "bb")).toBe(false);
    expect(isMatchForRule(rules, 0, "aba")).toBe(false);
    expect(isMatchForRule(rules, 0, "abb")).toBe(false);
  });

  test("can incorporate simple OR logic", () => {
    const rules = {
      0: [
        ["1", "2"],
        ["2", "1"],
      ],
      1: [["a"]],
      2: [["b"]],
    };

    expect(isMatchForRule(rules, 0, "a")).toBe(false);
    expect(isMatchForRule(rules, 0, "ab")).toBe(true);
    expect(isMatchForRule(rules, 0, "ba")).toBe(true);
    expect(isMatchForRule(rules, 0, "b")).toBe(false);
  });

  test("can incorporate branching rules with OR logic", () => {
    const rules = {
      0: [["1", "2"]],
      1: [["a"]],
      2: [
        ["1", "3"],
        ["3", "1"],
      ],
      3: [["b"]],
    };

    expect(isMatchForRule(rules, 0, "a")).toBe(false);
  });

  test("another test with OR logic", () => {
    const rules = {
      0: [["1", "2"]],
      1: [
        ["2", "3"],
        ["3", "2"],
      ],
      2: [["a"]],
      3: [["b"]],
    };

    expect(isMatchForRule(rules, 0, "aba")).toBe(true);
    expect(isMatchForRule(rules, 0, "baa")).toBe(true);
    expect(isMatchForRule(rules, 0, "baa")).toBe(true);
    expect(isMatchForRule(rules, 0, "abb")).toBe(false);
  });

  test("can handle multiple rules as well as multiple sets of branching logic", () => {
    const rules = {
      0: ["4", "1", "5"],
      1: [
        ["2", "3"],
        ["3", "2"],
      ],
      2: [
        ["4", "4"],
        ["5", "5"],
      ],
      3: [
        ["4", "5"],
        ["5", "4"],
      ],
      4: [["a"]],
      5: [["b"]],
    };

    expect(isMatchForRule(rules, 2, "aa")).toBe(true);
    expect(isMatchForRule(rules, 2, "bb")).toBe(true);
    expect(isMatchForRule(rules, 3, "ab")).toBe(true);
    expect(isMatchForRule(rules, 3, "ba")).toBe(true);
    expect(isMatchForRule(rules, 1, "aaba")).toBe(true);
    expect(isMatchForRule(rules, 1, "bbba")).toBe(true);
    expect(isMatchForRule(rules, 1, "aaab")).toBe(true);
    expect(isMatchForRule(rules, 1, "bbab")).toBe(true);

    expect(isMatchForRule(rules, 0, "ababbb")).toBe(true);
  });

  test("test part 1", () => {
    // expect(part1("test.txt"));
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual({
      messages: ["ababbb", "bababa", "abbbab", "aaabbb", "aaaabbb"],
      rules: {
        0: [["4", "1", "5"]],
        1: [
          ["2", "3"],
          ["3", "2"],
        ],
        2: [
          ["4", "4"],
          ["5", "5"],
        ],
        3: [
          ["4", "5"],
          ["5", "4"],
        ],
        4: [["a"]],
        5: [["b"]],
      },
    });
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
