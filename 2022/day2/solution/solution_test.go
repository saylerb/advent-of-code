package solution

import (
	"reflect"
	"testing"
)

func TestSolution(t *testing.T) {
	input := []string{"A Y", "B X", "C Z"}

	got := Solve(input)
	want := 15

	if got != want {
		t.Errorf("got %v, wanted %v", got, want)
	}

}

func TestScanning(t *testing.T) {
	got := ScanIntoSlice("test_input.txt")
	want := []string{"A Y", "B X", "C Z"}

	if len(got) != len(want) {
		t.Errorf("got %v, wanted %v", len(got), len(want))
	}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %q, wanted %q", got, want)
	}
}
