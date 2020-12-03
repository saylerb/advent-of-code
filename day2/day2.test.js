const day2 = require("./day2.js");
const fs = require("fs");

test("can parse a single line into three parts", () => {
  const line = "1-3 a: abcde";
  const result = day2.parseLine(line);

  expect(result).toEqual({
    min: 1,
    max: 3,
    char: "a",
    password: "abcde",
  });
});

test("password with count equal to min is valid valid", () => {
  const line = { min: 1, max: 3, char: "a", password: "abcde" };
  const result = day2.isValid(line);

  expect(result).toBe(true);
});

test("password with count less than min is invalid", () => {
  const line = { min: 1, max: 3, char: "b", password: "cdefg" };
  const result = day2.isValid(line);

  expect(result).toBe(false);
});

test("password with greater than min and less than max is valid", () => {
  const line = { min: 2, max: 9, char: "c", password: "ccccccccc" };

  const result = day2.isValid(line);

  expect(line.password.length).toEqual(9);
  expect(result).toBe(true);
});

test("readers lines of text into lines", () => {
  const result = day2.parseFile("./day2test.txt");

  expect(result.length).toEqual(3);
  expect(result).toEqual(
    expect.arrayContaining([
      { min: 1, max: 3, char: "b", password: "cdefg" },
      { min: 2, max: 9, char: "c", password: "ccccccccc" },
    ])
  );
});

test("main for part 1", () => {
  const result = day2.countPasswords("./day2test.txt", day2.isValid);

  expect(result).toEqual(2);
});

test("main for part 2", () => {
  const result = day2.countPasswords("./day2test.txt", day2.isValidTwo);

  expect(result).toEqual(1);
});

test("part2 if one position contains the character it is valid", () => {
  const line = { min: 1, max: 3, char: "a", password: "abcde" };

  const result = day2.isValidTwo(line);

  expect(result).toBe(true);
});

test("part2 if two positions contain the character it is invalid", () => {
  const line = { min: 2, max: 9, char: "c", password: "ccccccccc" };

  const result = day2.isValidTwo(line);

  expect(result).toBe(false);
});
