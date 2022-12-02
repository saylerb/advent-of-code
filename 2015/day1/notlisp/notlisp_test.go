package notlisp

import "testing"

func TestNotLisp(t *testing.T) {
}

func TestItCountsTheFloors(t *testing.T) {
	t.Run("count is zero by default", func(t *testing.T) {
		got, _ := ProcessDirections("")
		want := 0

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})

	t.Run("( increments the floor count", func(t *testing.T) {
		got, _ := ProcessDirections("))(((((")
		want := 3

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})

	t.Run(") decrements the floor count", func(t *testing.T) {
		got, _ := ProcessDirections(")))")
		want := -3

		if got != want {
			t.Errorf("got %v, wanted %v", got, want)
		}
	})
}

func TestItCanReportThePositionWhereSantaEntersTheBasement(t *testing.T) {
	t.Run("instructions are 1-indexed for determining the first position at which the elevator goes negative", func(t *testing.T) {
		_, got := ProcessDirections(")")
		want := 1

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})

	t.Run("when santa enters and exists basement multiple times, reports the position of the first entrance", func(t *testing.T) {
		_, got := ProcessDirections("()())()(())")
		want := 5

		if got != want {
			t.Errorf("got %v, want %v", got, want)
		}
	})
}

func TestReadFile(t *testing.T) {
	got := ReadFile("test_input.txt")
	want := "Hello, World\n"
	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}
