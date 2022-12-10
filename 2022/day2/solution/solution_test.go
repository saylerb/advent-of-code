package solution

import (
	"reflect"
	"testing"
)

func TestMapLetterToShape(t *testing.T) {
	assertShape(t, AtoShape("A"), Shape(0))
	assertShape(t, AtoShape("B"), Shape(1))
	assertShape(t, AtoShape("C"), Shape(2))

	assertShape(t, AtoShape("X"), Shape(0))
	assertShape(t, AtoShape("Y"), Shape(1))
	assertShape(t, AtoShape("Z"), Shape(2))
}

func TestGamePoints(t *testing.T) {
	t.Run("draw when both choose rock", func(t *testing.T) {
		opp := Shape(0)
		me := Shape(0)

		got := CalculatePoints(opp, me)
		want := 3 + 1

		assertPoints(t, got, want)
	})
	t.Run("I win choosing paper and opp chooses rock", func(t *testing.T) {
		opp := Shape(0)
		me := Shape(1)

		got := CalculatePoints(opp, me)
		want := 2 + 6

		assertPoints(t, got, want)
	})
	t.Run("I win choosing rock and opp chooses scissors", func(t *testing.T) {
		opp := Shape(2)
		me := Shape(0)

		got := CalculatePoints(opp, me)
		want := 1 + 6

		assertPoints(t, got, want)
	})
}

func TestSolutionPart1(t *testing.T) {
	t.Run("second column indicates shape played by me", func(t *testing.T) {
		input := []string{"A Y", "B X", "C Z"}

		got := SolvePart1(input)
		want := 15

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})

	t.Run("", func(t *testing.T) {
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
func assertShape(t *testing.T, got, want Shape) {
	t.Helper()
	if got != want {
		t.Errorf("got %v, wanted %v", got, want)
	}
}

func assertPoints(t *testing.T, got, want int) {
	t.Helper()
	if got != want {
		t.Errorf("got %v, wanted %v", got, want)
	}
}
