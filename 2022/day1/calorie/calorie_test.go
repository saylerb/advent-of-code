package calorie

import (
	"reflect"
	"testing"
)

func TestCountingCalories(t *testing.T) {
	t.Run("if one collections of calories, returns the sum", func(t *testing.T) {
		calories := []string{"1000", "2000", "3000"}
		got := SumOfTopNSubtotals(calories, 1)
		want := 6000

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})

	t.Run("if multiple collections of calories, return the largest sum", func(t *testing.T) {
		calories := []string{"", "1000", "2000", "3000", "", "8000", "", "5000", "2000", "", "4000", "1000", "1000", ""}
		got := SumOfTopNSubtotals(calories, 1)
		want := 8000

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func TestCanCreateANewTopThree(t *testing.T) {
	t.Run("adds to the top three if current top three is < 3", func(t *testing.T) {
		number := 2000
		totals := []int{500, 0, 0}

		got := newTopSubtotals(number, totals)
		want := []int{2000, 500, 0}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
	t.Run("if number smaller than current top three, current top three is returned", func(t *testing.T) {
		number := 100
		totals := []int{1000, 500, 200}

		got := newTopSubtotals(number, totals)
		want := []int{1000, 500, 200}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
	t.Run("if number is larger than one of of top three, replace it", func(t *testing.T) {
		number := 300
		totals := []int{1000, 500, 200}

		got := newTopSubtotals(number, totals)
		want := []int{1000, 500, 300}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
	t.Run("if number is larger than two of of top three, shift off the last one", func(t *testing.T) {
		number := 600
		totals := []int{1000, 500, 200}

		got := newTopSubtotals(number, totals)
		want := []int{1000, 600, 500}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
	t.Run("test multiple replacements", func(t *testing.T) {
		number := 600
		totals := []int{100, 50, 10}

		got := newTopSubtotals(number, totals)
		want := []int{600, 100, 50}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
	t.Run("test multiple replacements", func(t *testing.T) {
		number := 600
		totals := []int{0, 0, 0}

		got := newTopSubtotals(number, totals)
		want := []int{600, 0, 0}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func TestSummingTopThreeElvesByCalorieCount(t *testing.T) {
	t.Run("returns the sum of the top three calorie holders", func(t *testing.T) {
		calories := []string{"1000", "2000", "3000", "",
			"4000", "",
			"5000", "6000", "",
			"7000", "8000", "9000", "",
			"10000"}
		numberOfSubTotalToKeepTrackOf := 3
		got := SumOfTopNSubtotals(calories, numberOfSubTotalToKeepTrackOf)
		want := 45000

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func TestReadFileByLine(t *testing.T) {
	got := ScanIntoSlice("test_input.txt")
	want := []string{"Hello,", "", "World"}

	if len(got) != len(want) {
		t.Errorf("got %v, wanted %v", len(got), len(want))
	}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %q, wanted %q", got, want)
	}
}
