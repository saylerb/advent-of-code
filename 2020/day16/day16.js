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

export function getValidTickets(rules, tickets) {
  return tickets.filter(
    (ticket) => getInvalidTicketValues(rules, ticket).length === 0
  );
}

export function matchValuesToField(rules, tickets) {
  const indexMap = tickets
    .map((ticket) => ticket.split(","))
    .reduce((acc, ticketValues, index) => {
      ticketValues.forEach((value, index) => {
        if (typeof acc[index] === "undefined") {
          acc[index] = [value];
        } else {
          acc[index] = acc[index].concat(value);
        }
      });
      return acc;
    }, {});

  const indexesAndPassedRules = Object.keys(indexMap).map((index) => {
    const values = indexMap[index];

    const passedRules = rules
      .map((rule) => {
        const allPass = values.every((value) => {
          return isTicketValueForRule(rule, value);
        });

        return { rule, allPass };
      })
      .filter(({ allPass }) => allPass)
      .map(({ rule }) => rule);

    return { index, passedRules };
  });

  const sorted = indexesAndPassedRules.sort((a, b) => {
    return a.passedRules.length - b.passedRules.length;
  });

  const result = [];

  sorted.forEach(({ index, passedRules }) => {
    const passedRuleNames = passedRules.map((rule) => rule.split(":")[0]);

    if (passedRules.length === 1) {
      result.push({ index, field: passedRuleNames[0] });
    }

    if (passedRules.length > 1) {
      const remainingRules = passedRuleNames.filter((passedRule) => {
        return !result.map(({ field }) => field).includes(passedRule);
      });

      result.push({ index, field: remainingRules[0] });
    }
  });

  return result.reduce((acc, { field, index }) => {
    acc[index] = field;
    return acc;
  }, {});
}

export function part2(fileName, processFunction = (fields) => fields) {
  const { rules, nearbyTickets, yourTicket } = getNotes(fileName);

  const validTickets = getValidTickets(rules, nearbyTickets);

  const results = matchValuesToField(rules, validTickets);

  const fields = yourTicket.split(",").reduce((acc, ticketValue, index) => {
    const field = results[index];

    acc[field] = ticketValue;
    return acc;
  }, {});

  return processFunction(fields);
}

export function sumFieldsStartingWithDeparture(fields) {
  const keysWithDeparture = Object.keys(fields).filter((key) =>
    key.includes("departure")
  );

  return keysWithDeparture.reduce((acc, key) => {
    const num = fields[key];
    return acc * parseInt(num);
  }, 1);
}

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
