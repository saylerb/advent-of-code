package solution

import (
	"bufio"
	"log"
	"os"
)

type Shape int

const (
	Rock Shape = iota // iota will auto-increment values
	Paper
	Scissors
)

func (s Shape) Points() int {
	// rock - 1 point
	// paper - 2 points
	// scissors - 3 points
	return int(s) + 1
}

func (s Shape) String() string {
	return []string{"Rock", "Paper", "Scissors"}[s]
}

func AtoShape(letter string) Shape {
	mapping := map[string]Shape{
		"A": Rock,
		"X": Rock,
		"B": Paper,
		"Y": Paper,
		"C": Scissors,
		"Z": Scissors,
	}
	return mapping[letter]
}

func AtoOutcome(letter string) Outcome {
	switch letter {
	case "X":
		return Loss
	case "Y":
		return Draw
	case "Z":
		return Win
	default:
		panic("invalid input")
	}
}

type Outcome int

const (
	Loss Outcome = 0
	Draw Outcome = 3
	Win  Outcome = 6
)

func (o Outcome) Points() int {
	return int(o)
}

func (o Outcome) String() string {
	return []string{"Loss", "Draw", "Win"}[o/3]

}

func ShapeForOutcome(desired Outcome, opponent Shape) Shape {
	switch desired {
	case Loss:
		return Shape(opponent+3-1) % 3
	case Draw:
		return opponent
	case Win:
		return Shape(opponent+3+1) % 3
	default:
		panic("invalid input")
	}
}

func getMyOutcome(opp Shape, me Shape) Outcome {
	// golang modulus returns the 'least negative remainder'
	// but I want the 'least positive remainder'
	switch (((opp - me) % 3) + 3) % 3 {
	case 0:
		return Draw
	case 1:
		return Loss
	case 2:
		return Win
	default:
		panic("something went wrong")
	}
}

func SolvePart2(input []string) int {
	sum := 0

	for _, round := range input {
		outcomeNeeded := AtoOutcome(round[2:])
		opp := AtoShape(round[:1])
		me := ShapeForOutcome(outcomeNeeded, opp)

		sum += outcomeNeeded.Points()
		sum += me.Points()
	}

	return sum
}

func SolvePart1(input []string) int {
	sum := 0

	for _, round := range input {
		me := AtoShape(round[2:])
		opp := AtoShape(round[:1])

		outcome := getMyOutcome(opp, me)

		sum += outcome.Points()
		sum += me.Points()
	}

	return sum
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
