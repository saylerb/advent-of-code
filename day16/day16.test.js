import {
  part1,
  part2,
  parseFile,
  getNotes,
  getInvalidTicketValues,
  isTicketValueForRule,
} from "./day16";

describe("part 1", () => {
  test("test part 1", () => {
    expect(part1("test.txt")).toEqual(71);
    expect(part1("day16input.txt")).toEqual(25916);
  });
  test("test parsing of file", () => {
    expect(parseFile("test.txt")).toEqual(
      expect.arrayContaining(["class: 1-3 or 5-7", "38,6,12"])
    );
  });

  test("can extract rules", () => {
    const { rules, yourTicket, nearbyTickets } = getNotes("test.txt");
    expect(rules).toEqual([
      "class: 1-3 or 5-7",
      "row: 6-11 or 33-44",
      "seat: 13-40 or 45-50",
    ]);

    expect(yourTicket).toEqual("7,1,14");
    expect(nearbyTickets).toEqual(["7,3,47", "40,4,50", "55,2,20", "38,6,12"]);
  });

  test("a ticket value passes rule", () => {
    expect(isTicketValueForRule("class: 1-3 or 5-7", 0)).toBe(false);
    expect(isTicketValueForRule("class: 1-3 or 5-7", 1)).toBe(true);
    expect(isTicketValueForRule("class: 1-3 or 5-7", 4)).toBe(false);
    expect(isTicketValueForRule("class: 1-3 or 5-7", 3)).toBe(true);
    expect(isTicketValueForRule("class: 1-3 or 5-7", 5)).toBe(true);
    expect(isTicketValueForRule("class: 1-3 or 5-7", 7)).toBe(true);
    expect(isTicketValueForRule("class: 1-3 or 5-7", 8)).toBe(false);
  });

  test("a ticket with values that pass at least one rule yields no invalid values", () => {
    const rules = [
      "class: 1-3 or 5-7",
      "row: 6-11 or 33-44",
      "seat: 13-40 or 45-50",
    ];
    const ticket = "7,3,47";

    expect(getInvalidTicketValues(rules, ticket)).toEqual([]);
  });

  test("a ticket with one value is does not pass any of the rules", () => {
    const rules = [
      "class: 1-3 or 5-7",
      "row: 6-11 or 33-44",
      "seat: 13-40 or 45-50",
    ];
    const ticket = "40,4,50";

    expect(getInvalidTicketValues(rules, ticket)).toEqual([4]);
  });

  test("a ticket with one value is does not pass any of the rules", () => {
    const rules = [
      "class: 1-3 or 5-7",
      "row: 6-11 or 33-44",
      "seat: 13-40 or 45-50",
    ];
    const ticket = "55,2,20";

    expect(getInvalidTicketValues(rules, ticket)).toEqual([55]);
  });

  test("a ticket with one value is does not pass any of the rules", () => {
    const rules = [
      "class: 1-3 or 5-7",
      "row: 6-11 or 33-44",
      "seat: 13-40 or 45-50",
    ];
    const ticket = "38,6,12";

    expect(getInvalidTicketValues(rules, ticket)).toEqual([12]);
  });
});

describe("part 2", () => {
  test("test part 2", () => {
    expect(part2()).toBeUndefined();
  });
});
