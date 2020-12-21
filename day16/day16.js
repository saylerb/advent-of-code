import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1(fileName) {
  const { rules, nearbyTickets } = getNotes(fileName);

  return nearbyTickets
    .flatMap((ticket) => getInvalidTicketValues(rules, ticket))
    .reduce((acc, value) => acc + value, 0);
}

export function part2() {}

export function getNotes(fileName) {
  const [rulesPart, yourTicketPart, nearbyTicketsPart] = parseFile(
    fileName,
    "\n\n"
  );

  const rules = rulesPart.split("\n");
  const yourTicket = yourTicketPart
    .split("\n")
    .filter((ticket) => ticket !== "your ticket:")[0];
  const nearbyTickets = nearbyTicketsPart
    .split("\n")
    .filter((ticket) => ticket !== "nearby tickets:");

  return { rules, yourTicket, nearbyTickets };
}

export function isTicketValueForRule(rule, ticketValue) {
  const [fieldName, rules] = rule.split(":").map((parts) => parts.trim());

  const pairs = rules
    .split("or")
    .map((parts) => parts.trim())
    .map((range) => range.split("-").map((num) => parseInt(num)));

  return pairs.some(([low, high]) => {
    return low <= ticketValue && ticketValue <= high;
  });
}

export function getInvalidTicketValues(rules, ticket) {
  const ticketValues = ticket.split(",");

  const results = ticketValues.map((value) => {
    const allPass = rules.some((rule) => {
      return isTicketValueForRule(rule, value);
    });

    return { value, allPass };
  });

  return results
    .filter(({ allPass }) => !allPass)
    .map(({ value }) => parseInt(value));
}

export function parseFile(filename, splitOn = "\n") {
  let data;
  let rows;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    rows = data.split(splitOn).filter((row) => row !== "");
  } catch (err) {
    console.error(err);
  }

  return rows;
}
