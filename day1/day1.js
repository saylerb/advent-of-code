export function findTwo(numbers) {
  let answer;
  let indexA = 0;
  let numberA = numbers[indexA];
  let numberB;

  while (typeof answer === "undefined") {
    for (let indexB = 0; indexB < numbers.length - 1; indexB++) {
      numberB = numbers[indexB];

      for (let indexC = 0; indexC < numbers.length - 1; indexC++) {
        // console.log("A: ", numberA, "B: ", numberB);

        if (numberA + numberB === 2020) {
          answer = [numberA, numberB];
          break;
        }
      }
    }

    if (indexA === numbers.length - 1) {
      // console.log("Done!");
      break;
    }

    indexA++;
    numberA = numbers[indexA];

    // console.log("The numbers are: ", answer);
    // console.log(
    //   "multiplied together: ",
    //   answer.reduce((acc, num) => acc * num, 1)
    // );

    return answer;
  }
}

export function findThree(numbers) {
  // console.log("starting..");

  let answer;
  let indexA = 0;
  let numberA = numbers[indexA];
  let numberB;
  let numberC;

  while (typeof answer === "undefined") {
    for (let indexB = 0; indexB < numbers.length - 1; indexB++) {
      numberB = numbers[indexB];

      for (let indexC = 0; indexC < numbers.length - 1; indexC++) {
        numberC = numbers[indexC];
        //  console.log("A: ", numberA, "B: ", numberB, "C: ", numberC);

        if (numberA + numberB + numberC === 2020) {
          answer = [numberA, numberB, numberC];
          break;
        }
      }
    }

    if (indexA === numbers.length - 1) {
      //console.log("Done!");
      break;
    }

    indexA++;
    numberA = numbers[indexA];
  }
  return answer;
}

