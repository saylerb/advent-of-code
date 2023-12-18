package trebuchet

import (
	"bufio"
	"log"
	"os"
)

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
