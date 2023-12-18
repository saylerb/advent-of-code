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
