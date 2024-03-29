import { countIncreases, processDepths, getWindowSums } from "./index";

describe("part 1", () => {
  test("is zero when when depth array is empty", () => {
    expect(countIncreases([])).toBe(0);
  });

  test("increments when numbers are ascending", () => {
    expect(countIncreases([1, 2])).toBe(1);
  });

  test("is zero when depths are descending", () => {
    expect(countIncreases([4, 3, 2, 1])).toBe(0);
  });

  test("test case one", () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

    expect(countIncreases(depths)).toBe(7);
  });

  test("can process file", () => {
    expect(processDepths("input.txt")).toEqual([
      199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
    ]);
  });
});

describe("part 2", () => {
  test("calculates the 3 measurement windows sums", () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

    const expectedSums = [607, 618, 618, 617, 647, 716, 769, 792];

    const result = getWindowSums(depths);

    expect(result).toEqual(expectedSums);
  });
});
