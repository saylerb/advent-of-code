package solution

import (
	"reflect"
	"testing"
)

func TestAtoOutcome(t *testing.T) {
	// not a super valuable test, since type definitions for outcome are just
	// strings but, a good way to learn writing a table-driven test
	outcomeTests := []struct {
		from string
		want Outcome
	}{
		{"X", Loss},
		{"Y", Draw},
		{"Z", Win},
	}

	for _, test := range outcomeTests {
		got := AtoOutcome(test.from)

		if got != test.want {
			t.Errorf("got %v, wanted %v", got, test.want)
		}
	}
}

func TestMapLetterToShape(t *testing.T) {
	assertShape(t, AtoShape("A"), Rock)
	assertShape(t, AtoShape("B"), Paper)
	assertShape(t, AtoShape("C"), Scissors)

	assertShape(t, AtoShape("X"), Rock)
	assertShape(t, AtoShape("Y"), Paper)
	assertShape(t, AtoShape("Z"), Scissors)
}

func TestGamePoints(t *testing.T) {
	t.Run("draw when both choose rock", func(t *testing.T) {
		opp := Rock
		me := Rock

		got := CalculatePoints(opp, me)
		want := 3 + 1

		assertPoints(t, got, want)
	})
	t.Run("I win choosing paper and opp chooses rock", func(t *testing.T) {
		opp := Rock
		me := Paper

		got := CalculatePoints(opp, me)
		want := 2 + 6

		assertPoints(t, got, want)
	})
	t.Run("I win choosing rock and opp chooses scissors", func(t *testing.T) {
		opp := Scissors
		me := Rock

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
