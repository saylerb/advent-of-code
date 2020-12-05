const fs = require("fs");
const path = require("path");

function parseFile(filename) {
  let data;
  let passports;

  try {
    data = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
    passports = data
      .split("\n\n")
      .map((passport) => passport.replace(/\n/g, " "));
  } catch (err) {
    console.error(err);
  }

  return passports;
}

function transformPassport(rawPassport) {
  return rawPassport.split(" ").reduce((acc, kv) => {
    const [one, two] = kv.split(":");

    acc[one] = two;
    return acc;
  }, {});
}

function requiredFieldsPresent(passport) {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const optional = ["cid"];

  const keys = Object.keys(passport);

  return !required
    .map((key) => typeof passport[key] !== "undefined")
    .some((thing) => !thing);
}
//byr (Birth Year) - four digits; at least 1920 and at most 2002.
//iyr (Issue Year) - four digits; at least 2010 and at most 2020.
//eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
//hgt (Height) - a number followed by either cm or in:
//If cm, the number must be at least 150 and at most 193.
//If in, the number must be at least 59 and at most 76.
//hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
//ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
//pid (Passport ID) - a nine-digit number, including leading zeroes.
//cid (Country ID) - ignored, missing or not.

function withInRange(string, start, end) {
  try {
    const num = parseInt(string);

    return start <= num && num <= end;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function validHeight(height) {
  const units = height.substring(height.length - 2);

  if (units !== "in" && units !== "cm") {
    return false;
  }

  const num = height.replace(units, "");

  if (units === "cm") {
    return withInRange(num, 150, 193);
  }

  if (units === "in") {
    return withInRange(num, 59, 76);
  }

  return true;
}

function validPassportNumber(num) {
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  return num.length === 9 && /\d{9}/.test(num);
}

function isValidPassport(passport) {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const validations = {
    byr: (birthYear) => withInRange(birthYear, 1920, 2002),
    iyr: (issueYear) => withInRange(issueYear, 2010, 2020),
    eyr: (expiration) => withInRange(expiration, 2020, 2030),
    hgt: (height) => validHeight(height),
    hcl: (hair) => validHair(hair),
    ecl: (eye) => validEye(eye),
    pid: (pid) => validPassportNumber(pid),
  };

  if (!requiredFieldsPresent(passport)) {
    return false;
  } else {
    return required
      .map((key) => validations[key].call(this, passport[key]))
      .every((thing) => thing === true);
  }
}

function validEye(eye) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  return validEyeColors.some((validColor) => validColor === eye);
}

function main(filename, validityFunction = requiredFieldsPresent) {
  const passports = parseFile(filename);

  const objects = passports.map((passport) => transformPassport(passport));

  //console.log(objects);

  const valid = objects.map((obj) => validityFunction(obj));

  const count = valid.reduce((acc, valid) => {
    if (valid) {
      acc++;
    }
    return acc;
  }, 0);

  return count;
}

function validHair(hair) {
  if (hair[0] !== "#" || hair.length !== 7) {
    return false;
  }

  const letters = hair.substring(hair.length - 6);

  return /\w{6}/.test(letters);
}

module.exports = {
  main,
  parseFile,
  transformPassport,
  requiredFieldsPresent,
  isValidPassport,
  withInRange,
  validHeight,
  validHair,
  validEye,
  validPassportNumber,
};
