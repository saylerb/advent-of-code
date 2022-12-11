package solution

import (
	"bufio"
	"log"
	"os"
)

type Shape int // Rock, Paper, Scissors: 0,1,2

type Outcome string

var Loss Outcome = "X"
var Draw Outcome = "Y"
var Win Outcome = "Z"

func (s Shape) Points() int {
	// rock - 1 point
	// paper - 2 points
	// scissors - 3 points
	return int(s) + 1
}

func AtoShape(letter string) Shape {
	mapping := map[string]int{
		"A": 0,
		"X": 0,
		"B": 1,
		"Y": 1,
		"C": 2,
		"Z": 2,
	}

	return Shape(mapping[letter])
}

func AtoOutcome(letter string) Outcome {
	return Outcome(letter)
}

func CalculatePoints(opp Shape, me Shape) int {
	outcomePoints := 0
	if opp == me {
		//draw
		outcomePoints += 3
	} else if (opp+1)%3 == me {
		// I wins, since num is one more than opp
		outcomePoints += 6
	} else {
		// I lose
		outcomePoints += 0
	}
	shapePoints := me.Points()

	return outcomePoints + shapePoints
}

func SolvePart2(input []string) int {
	sum := 0
	for _, round := range input {
		outcomeNeeded := AtoOutcome(round[2:])
		opp := AtoShape(round[:1])

		if outcomeNeeded == Loss {
			if opp == Shape(0) {
				// choose scissors to lose
				sum += 3
			} else if opp == Shape(2) {
				// choose paper to lose
				sum += 2
			} else if opp == Shape(1) {
				// choose rock to lose
				sum += 1
			}
		} else if outcomeNeeded == Draw {
			// want draw
			sum += 3
			if opp == Shape(0) {
				// choose rock to draw
				sum += 1
			} else if opp == Shape(1) {
				// choose paper to draw
				sum += 2
			} else if opp == Shape(2) {
				// choose scissors to draw
				sum += 3
			}
		} else if outcomeNeeded == Win {
			// want win
			sum += 6
			if opp == Shape(0) {
				// choose paper to win
				sum += 2
			} else if opp == Shape(1) {
				// choose scissors to win
				sum += 3
			} else if opp == Shape(2) {
				// choose rock to win
				sum += 1
			}
		}
	}

	return sum
}

func SolvePart1(input []string) int {
	sum := 0

	for _, round := range input {
		me := AtoShape(round[2:])
		opp := AtoShape(round[:1])

		sum += CalculatePoints(opp, me)
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
