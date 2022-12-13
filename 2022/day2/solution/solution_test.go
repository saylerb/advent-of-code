package solution

import (
	"reflect"
	"testing"
)

func TestModulo(t *testing.T) {
	got := (-1%3 + 3) % 3
	want := 2
	if got != want {
		t.Errorf("got %v, wanted %v", got, want)
	}
}

func TestShapeForOutcome(t *testing.T) {
	assertShape(t, ShapeForOutcome(Loss, Rock), Scissors)
	assertShape(t, ShapeForOutcome(Draw, Rock), Rock)
	assertShape(t, ShapeForOutcome(Win, Rock), Paper)
}

func TestGetMyOutcome(t *testing.T) {
	assertOutcome(t, getMyOutcome(Rock, Rock), Draw)
	assertOutcome(t, getMyOutcome(Rock, Scissors), Loss)
	assertOutcome(t, getMyOutcome(Rock, Paper), Win)
	assertOutcome(t, getMyOutcome(Paper, Rock), Loss)
	assertOutcome(t, getMyOutcome(Scissors, Rock), Win)
	assertOutcome(t, getMyOutcome(Scissors, Paper), Loss)
}

func TestAtoOutcome(t *testing.T) {
	// not a super valuable test,
	// (just testing the hardcoded string values
	// but, a good way to learn writing a table-driven test
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

func TestSolutionPart1(t *testing.T) {
	t.Run("second column indicates shape played by me", func(t *testing.T) {
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

func assertOutcome(t *testing.T, got, want Outcome) {
	t.Helper()
	if got != want {
		t.Errorf("got %v, wanted %v", got, want)
	}
}
