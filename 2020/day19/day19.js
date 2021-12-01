import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function matchesRuleList(rules, listOfRules, message) {
  console.log({ listOfRules, message });

  if (message.length < listOfRules.length) {
    console.log("messages length less than rule, stopping");
    return false;
  }

  if (message.length === 0 && listOfRules.length === 0) {
    console.log("message and rulelist are both length of zero, stopping");
    return true;
  }

  if (listOfRules.length === 0) {
    console.log("list of rules is empty, stopping");
    return false;
  }

  for (let i = 1; i < message.length; i++) {
    const prefix = message.substring(0, i);
    const back = message.substring(i);

    // first check to see if the prefix matches the first rule in the list

    const [firstRule, ...rest] = listOfRules;
    console.log({ firstRule, rest, prefix, back });

    console.log("recursing");
    const matchesFirstRule = isMatchForRule(rules, firstRule, prefix);

    if (matchesFirstRule) {
      console.log(
        `First rule ${firstRule} matched ${prefix} let's see if the rest ${back} matches the rules ${rest}:`
      );
      const matchesRest = matchesRuleList(rules, rest, back);

      if (matchesRest) {
        console.log(`${back} matched ${rest}, returning true`);
        return true;
        break;
      } else {
        console.log(`${back} DID NOT match ${rest}!`);
      }
    } else {
      console.log("First rule did not match");
    }
  }

  return false;
}

export function isMatchForRule(rules, ruleNumber, message) {
  let ruleOfInterest = rules[ruleNumber];
  console.log("INITIAL MATCH");
  console.log({ ruleOfInterest, message });

  return ruleOfInterest.some((option) => {
    if (option.length === 1) {
      // No OR logic branching
      // Determine if branching, or if "a" or "b"
      const [[thing]] = ruleOfInterest;
      console.log(thing);

      if (/a|b/.test(thing)) {
        return thing === message;
      }
    }

    return matchesRuleList(rules, option, message);
  });
}

export function part1() {}

export function part2() {}

export function parseFile(filename) {
  let data;
  let rows;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    rows = data.split("\n\n").filter((row) => row !== "");
  } catch (err) {
    console.error(err);
  }

  const [rawRules, rawMessages] = rows;

  const rules = rawRules.split("\n").reduce((ruleMap, rule) => {
    const [ruleNumber, ruleParts] = rule.split(":");

    ruleMap[ruleNumber] = ruleParts
      .replace(/"/g, "")
      .trim()
      .split("|")
      .map((option) => option.trim())
      .map((rule) => rule.split(" "));
    return ruleMap;
  }, {});

  const messages = rawMessages.split("\n");

  return { rules, messages };
}
