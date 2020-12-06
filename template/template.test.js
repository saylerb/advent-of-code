import template from "./template.js";

test("test 1", () => {
  expect(template.part1()).toBeUndefined();
  expect(template.part2()).toBeUndefined();
});

test("test parsing of file", () => {
  expect(template.parseFile("test.txt")).toEqual(
    expect.arrayContaining(["Hello", "World"])
  );
});
