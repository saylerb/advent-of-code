import { parseFile } from "./parseFile";

test("can read the file", () => {
  const expected = [
    "199",
    "200",
    "208",
    "210",
    "200",
    "207",
    "240",
    "269",
    "260",
    "263",
  ];
  expect(parseFile("input.txt")).toEqual(expected);
});
