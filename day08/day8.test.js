import day8 from "./day8.js";

test("test parsing of file", () => {
  const result = day8.parseFile("test.txt");

  expect(result).toEqual(expect.arrayContaining(["nop +0"]));
  expect(result.length).toEqual(9);
});

test("can parse an instruction", () => {
  expect(day8.convert("nop +0")).toEqual({
    instruction: "nop",
    value: 0,
  });
  expect(day8.convert("acc +1")).toEqual({
    instruction: "acc",
    value: 1,
  });
  expect(day8.convert("jmp +4")).toEqual({
    instruction: "jmp",
    value: 4,
  });
  expect(day8.convert("jmp -4")).toEqual({
    instruction: "jmp",
    value: -4,
  });
});

test("returns value of acc right before infinite loop", () => {
  const instructions = [
    { instruction: "nop", value: 0 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: 4 },
    { instruction: "acc", value: 3 },
    { instruction: "jmp", value: -3 },
    { instruction: "acc", value: -99 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: -4 },
    { instruction: "acc", value: 6 },
  ];

  expect(day8.run(instructions)).toEqual({ acc: 5, terminated: false });
});

test("part1", () => {
  expect(day8.part1("test.txt")).toEqual({ acc: 5, terminated: false });
  expect(day8.part1("day8input.txt")).toEqual({ acc: 1446, terminated: false });
});

test("returns value of acc right when program terminates gracefully", () => {
  const instructions = [
    { instruction: "nop", value: 0 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: 4 },
    { instruction: "acc", value: 3 },
    { instruction: "jmp", value: -3 },
    { instruction: "acc", value: -99 },
    { instruction: "acc", value: 1 },
    { instruction: "nop", value: -4 }, // changed to nop to terminate
    { instruction: "acc", value: 6 },
  ];

  expect(day8.run(instructions)).toEqual({ acc: 8, terminated: true });
});

test("can find the locations for a specific instruction", () => {
  const instructions = [
    { instruction: "nop", value: 0 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: 4 },
    { instruction: "acc", value: 3 },
    { instruction: "jmp", value: -3 },
    { instruction: "acc", value: -99 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: -4 },
    { instruction: "acc", value: 6 },
  ];

  expect(day8.findIndexes(instructions, ["jmp", "nop"])).toEqual([
    { index: 0, instruction: "nop" },
    { index: 2, instruction: "jmp" },
    { index: 4, instruction: "jmp" },
    { index: 7, instruction: "jmp" },
  ]);
});

test("replacing a jmp with a nop", () => {
  const instructions = [
    { instruction: "nop", value: 0 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: 4 },
    { instruction: "acc", value: 3 },
    { instruction: "jmp", value: -3 },
    { instruction: "acc", value: -99 },
    { instruction: "acc", value: 1 },
    { instruction: "jmp", value: -4 },
    { instruction: "acc", value: 6 },
  ];

  expect(day8.tryReplacing(instructions, ["nop", "jmp"])).toEqual(
    expect.arrayContaining([{ acc: 8, terminated: true }])
  );
});

test("part2", () => {
  expect(day8.part2("test.txt")).toEqual([{ acc: 8, terminated: true }]);
  expect(day8.part2("day8input.txt")).toEqual([
    { acc: 1403, terminated: true },
  ]);
});
