package trebuchet

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strings"
)

func substringIndexes(str string, substr string) []int {
	result := []int{}
	currentPosition := strings.Index(str, substr)

	currentSearchStr := str

	cumulativeLengthObserved := 0
	iterations := 0

	for iterations != 10 {
		if currentPosition > -1 {
			result = append(result, currentPosition+cumulativeLengthObserved)
			cumulativeLengthObserved += currentPosition + len(substr)
			nextStr := currentSearchStr[currentPosition+len(substr):]
			currentPosition = strings.Index(nextStr, substr)
			currentSearchStr = nextStr
		}
		iterations += 1
	}

	return result
}

func stringExists(tofind string, input string) bool {
	return strings.Index(input, tofind) >= 0
}

type Digit struct {
	startIndex int
	digit      string
}

func convertToDigits(str string) string {
	digits := []Digit{}
	numbers := []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}

	for i, number := range numbers {

		indexes := substringIndexes(str, number)
		for _, index := range indexes {
			if index != -1 {
				if i < 10 {
					digits = append(digits, Digit{startIndex: index, digit: fmt.Sprint(i)})
				} else {
					digits = append(digits, Digit{startIndex: index, digit: number})
				}
			}
		}
	}
	sort.Slice(digits, func(i, j int) bool { return digits[i].startIndex < digits[j].startIndex })

	result := ""
	for _, digit := range digits {
		result += digit.digit
	}
	return result
}

func getCalibrationValuePartTwo(input string) int {
	toDigits := convertToDigits(input)
	value := getCalibrationValue(toDigits)

	return value
}

func firstAndLastDigit(input string) []string {
	var numeric []string

	for _, r := range input {
		if 47 < r && r < 58 {
			numeric = append(numeric, string(r))
		}
	}

	length := len(numeric)

	if length == 1 {
		return []string{numeric[0], numeric[0]}
	}

	if length > 2 {
		return []string{numeric[0], numeric[length-1]}
	}
	return numeric
}

func getCalibrationValue(input string) int {
	numeric := firstAndLastDigit(input)

	result := 0
	for i := len(numeric) - 1; i >= 0; i-- {
		runey := rune(numeric[i][0])
		//fmt.Printf("runey: %v \n", runey)
		//dec := int(runey - '0')
		//fmt.Printf("dec: %v \n", dec)

		result += int(runey-'0') * pow(10, len(numeric)-1-i)
		//fmt.Printf("total: %v \n", result)
	}
	return result
}

func Solution(filename string) int {
	inputs := ScanIntoSlice(filename)

	sum := 0
	for _, input := range inputs {
		value := getCalibrationValue(input)
		sum += value
	}
	return sum
}

func SolutionTwo(filename string) int {
	inputs := ScanIntoSlice(filename)

	sum := 0
	for _, input := range inputs {
		value := getCalibrationValuePartTwo(input)
		sum += value
	}
	return sum
}

func pow(base int, power int) int {
	result := 1
	for power != 0 {
		result = result * base
		power = power - 1
	}

	return result
}

func ScanIntoSlice(fileName string) []string {
	file, err := os.Open(fileName)

	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(file)

	var data []string

	for scanner.Scan() {
		text := scanner.Text()
		data = append(data, text)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return data
}
