import day7 from "./day7.js";

const rules = {
  "light red": [
    { num: 1, color: "bright white" },
    { num: 2, color: "muted yellow" },
  ],
  "dark orange": [
    { num: 3, color: "bright white" },
    { num: 4, color: "muted yellow" },
  ],
  "bright white": [{ num: 1, color: "shiny gold" }],
  "muted yellow": [
    { num: 2, color: "shiny gold" },
    { num: 9, color: "faded blue" },
  ],
  "shiny gold": [
    { num: 1, color: "dark olive" },
    { num: 2, color: "vibrant plum" },
  ],
  "dark olive": [
    { num: 3, color: "faded blue" },
    { num: 4, color: "dotted black" },
  ],
  "vibrant plum": [
    { num: 5, color: "faded blue" },
    { num: 6, color: "dotted black" },
  ],
  "faded blue": [],
  "dotted black": [],
};

test("can process a bag containing 2 bags into a map", () => {
  expect(
    day7.convert(
      "light red bags contain 1 bright white bag, 2 muted yellow bags."
    )
  ).toEqual({
    "light red": [
      { num: 1, color: "bright white" },
      { num: 2, color: "muted yellow" },
    ],
  });

  expect(
    day7.convert(
      "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags."
    )
  ).toEqual({
    "vibrant plum": [
      { num: 5, color: "faded blue" },
      { num: 6, color: "dotted black" },
    ],
  });

  expect(
    day7.convert(
      "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags."
    )
  ).toEqual({
    "muted yellow": [
      { num: 2, color: "shiny gold" },
      { num: 9, color: "faded blue" },
    ],
  });

  expect(
    day7.convert(
      "dark orange bags contain 3 bright white bags, 4 muted yellow bags."
    )
  ).toEqual({
    "dark orange": [
      { num: 3, color: "bright white" },
      { num: 4, color: "muted yellow" },
    ],
  });
});

test("can process a bag containing no bags", () => {
  expect(day7.convert("faded blue bags contain no other bags.")).toEqual({
    "faded blue": [],
  });
});

test("can process a bag containing single bag", () => {
  expect(day7.convert("bright white bags contain 1 shiny gold bag.")).toEqual({
    "bright white": [{ num: 1, color: "shiny gold" }],
  });
});

test("can count the number of bags given a rule map", () => {
  expect(day7.count(rules, "shiny gold")).toEqual(4);
});

test("test parsing of file", () => {
  const line =
    "light red bags contain 1 bright white bag, 2 muted yellow bags.";
  expect(day7.parseFile("test.txt")).toEqual(expect.arrayContaining([line]));
});

test("test 1", () => {
  expect(day7.part1("test.txt")).toEqual(4);
  expect(day7.part1("day7input.txt")).toEqual(142);
});

test("test 2", () => {
  expect(day7.traverseTotal(rules, "shiny gold")).toEqual(32);
  expect(day7.part2("test.txt", "shiny gold")).toEqual(32);
  expect(day7.part2("day7input.txt", "shiny gold")).toEqual(10219);
});
