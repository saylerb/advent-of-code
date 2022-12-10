package solution

import (
	"reflect"
	"testing"
)

func TestSolution(t *testing.T) {
	t.Run("second column indicates desired ", func(t *testing.T) {
		input := []string{"A Y", "B X", "C Z"}

		got := SolvePart1(input)
		want := 15

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})
}

func TestSolutionPart2(t *testing.T) {
	t.Run("second column indicates desired result", func(t *testing.T) {
		input := []string{"A Y", "B X", "C Z"}

		got := SolvePart2(input)
		want := 12

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})
	t.Run("Y in second column indicates need draw", func(t *testing.T) {
		input := []string{"A Y"}

		got := SolvePart2(input)
		want := 3 + 1

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})
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
