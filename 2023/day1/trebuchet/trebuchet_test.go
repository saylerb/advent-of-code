package trebuchet

import (
	"reflect"
	"testing"
)

func TestSolution(t *testing.T) {
	got := Solution("test_input.txt")

	want := 142

	if got != want {
		t.Errorf("got %v, want %v", got, want)
	}
}

func TestSolutionTwo(t *testing.T) {
	got := SolutionTwo("test_input_two.txt")

	want := 281

	if got != want {
		t.Errorf("got %v, want %v", got, want)
	}
}

func TestRetrieveFirstAndLastDigit(t *testing.T) {
	inputs := []string{"1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"}
	wants := [][]string{{"1", "2"},
		{"3", "8"}, {"1", "5"}, {"7", "7"}}

	for i, input := range inputs {
		got := firstAndLastDigit(input)
		want := wants[i]
		// TODO: use go 1.21 for new slices methods
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %q, wanted %q", got, want)
		}
	}
}

func TestCalibrationValue(t *testing.T) {
	inputs := []string{"1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"}
	wants := []int{12, 38, 15, 77}

	for i, input := range inputs {
		got := getCalibrationValue(input)
		want := wants[i]

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	}
}

func TestSubstringInstances(t *testing.T) {
	inputs := [][]string{
		{"two", "one"},
		{"one", "one"},
		{"oneone", "one"},
		{"onetwoonetwoone", "one"},
	}
	wants := [][]int{
		{},
		{0},
		{0, 3},
		{0, 6, 12},
	}

	for i, input := range inputs {
		want := wants[i]
		got := substringIndexes(input[0], input[1])

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, wanted %v", got, want)
		}
	}
}

func TestNumberToDigitWithRepeats(t *testing.T) {
	got := convertToDigits("7nxjjzhfhpshccknpbpttrjhqkxmmssvtlxtmbxlhvtjczone5twonecf")

	want := "71521"

	if got != want {
		t.Errorf("got %v, wanted %v", got, want)
	}
}

func TestCalibrationValuePartTwo(t *testing.T) {
	inputs := []string{"two1nine",
		"eightwothree",
		"abcone2threexyz",
		"xtwone3four",
		"4nineeightseven2",
		"zoneight234",
		"7pqrstsixteen",
		"abc2x3oneight",
		"eighthree",
		"sevenine",
		"three",
		"3three7three",
	}
	wants := []int{29, 83, 13, 24, 42, 14, 76, 28, 83, 79, 33, 33}

	for i, input := range inputs {
		got := getCalibrationValuePartTwo(input)
		want := wants[i]

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	}
}
