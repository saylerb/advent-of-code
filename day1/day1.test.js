const day1 = require("./day1.js");

const numbers = [1721, 979, 366, 299, 675, 1456];
test("can find two numbers that sum to 2020", () => {
  const result = day1.findTwo(numbers);

  expect(result).toEqual(expect.arrayContaining([1721, 299]));
});

test("can find three numbers that sum to 2020", () => {
  const result = day1.findThree(numbers);

  expect(result).toEqual(expect.arrayContaining([979, 366, 675]));
});
