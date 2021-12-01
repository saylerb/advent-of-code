import day4 from "./day4.js";

test("can parse the file of passports into an array of strings without new lines", () => {
  const result = day4.parseFile("./test.txt");

  expect(result).toEqual(expect.any(Array));
  expect(result.length).toEqual(4);
  expect(result[2]).toEqual(
    "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm"
  );
  expect(result).toEqual(
    expect.arrayContaining([
      "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm",
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm",
    ])
  );
});

test("transform passport to object", () => {
  const result = day4.transformPassport(
    "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
  );

  expect(result).toEqual(
    expect.objectContaining({
      ecl: "gry",
      pid: "860033327",
      eyr: "2020",
      hcl: "#fffffd",
      byr: "1937",
      iyr: "2017",
      cid: "147",
      hgt: "183cm",
    })
  );
});

test("can validate a passport", () => {
  const valid = {
    ecl: "gry",
    pid: "860033327",
    eyr: "2020",
    hcl: "#fffffd",
    byr: "1937",
    iyr: "2017",
    cid: "147",
    hgt: "183cm",
  };
  const { byr, ...missingOne } = valid;
  const { cid, ...missingCountry } = valid;

  expect(day4.requiredFieldsPresent(valid)).toBe(true);
  expect(day4.requiredFieldsPresent(missingOne)).toBe(false);
  expect(day4.requiredFieldsPresent(missingCountry)).toBe(true);
});

test("main", () => {
  expect(day4.main("./test.txt")).toEqual(2);
});

test("withInRange", () => {
  expect(day4.withInRange("2004", 2002, 2004)).toEqual(true);
  expect(day4.withInRange("2002", 2002, 2004)).toEqual(true);
  expect(day4.withInRange("2003", 2002, 2004)).toEqual(true);
  expect(day4.withInRange("2001", 2002, 2004)).toEqual(false);
  expect(day4.withInRange("", 2002, 2004)).toEqual(false);
  expect(day4.withInRange("~", 2002, 2004)).toEqual(false);
  expect(day4.withInRange(null, 2002, 2004)).toEqual(false);
  expect(day4.withInRange("23", 2002, 2004)).toEqual(false);
});

test("height", () => {
  expect(day4.validHeight("2004")).toEqual(false);
  expect(day4.validHeight("190cm")).toEqual(true);
  expect(day4.validHeight("60in")).toEqual(true);

  expect(day4.validHeight("58in")).toEqual(false);
  expect(day4.validHeight("59in")).toEqual(true);
  expect(day4.validHeight("60in")).toEqual(true);
  expect(day4.validHeight("77in")).toEqual(false);

  expect(day4.validHeight("149cm")).toEqual(false);
  expect(day4.validHeight("150cm")).toEqual(true);
  expect(day4.validHeight("193cm")).toEqual(true);
  expect(day4.validHeight("194cm")).toEqual(false);
});

test("hair", () => {
  expect(day4.validHair("#dfdfdf")).toEqual(true);
  expect(day4.validHair("#df")).toEqual(false);
  expect(day4.validHair("dfdfdff")).toEqual(false);
  expect(day4.validHair("#$23$23")).toEqual(false);
  expect(day4.validHair("#a23a23")).toEqual(true);
  expect(day4.validHair("#######")).toEqual(false);
});

test("eye", () => {
  //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  expect(day4.validEye("amb")).toEqual(true);
  expect(day4.validEye("blu")).toEqual(true);
  expect(day4.validEye("brn")).toEqual(true);
  expect(day4.validEye("gry")).toEqual(true);
  expect(day4.validEye("grn")).toEqual(true);
  expect(day4.validEye("hzl")).toEqual(true);
  expect(day4.validEye("oth")).toEqual(true);
  expect(day4.validEye("sdf")).toEqual(false);
  expect(day4.validEye("")).toEqual(false);
  expect(day4.validEye("hzlamb")).toEqual(false);
});

test("passportNumber", () => {
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  expect(day4.validPassportNumber("asdfasdfa")).toEqual(false);
  expect(day4.validPassportNumber("0asdfsdf9")).toEqual(false);

  expect(day4.validPassportNumber("000000000")).toEqual(true);
  expect(day4.validPassportNumber("000000001")).toEqual(true);
  expect(day4.validPassportNumber("00123456789")).toEqual(false);
});

test("part two", () => {
  const valid = {
    pid: "087499704",
    hgt: "74in",
    ecl: "grn",
    iyr: "2012",
    eyr: "2030",
    byr: "1980",
    hcl: "#623a2f",
  };
  const invalid = {
    eyr: "1972",
    cid: "100",
    hcl: "#18171d",
    ecl: "amb",
    hgt: "170",
    pid: "186cm",
    iyr: "2018",
    byr: "1926",
  };

  expect(day4.isValidPassport(valid)).toBe(true);
  expect(day4.isValidPassport(invalid)).toBe(false);
});

test("part two main", () => {
  expect(day4.main("valid.txt", day4.isValidPassport)).toEqual(4);
  expect(day4.main("invalid.txt", day4.isValidPassport)).toEqual(0);
  expect(day4.main("day4input.txt", day4.isValidPassport)).toEqual(184);
});
