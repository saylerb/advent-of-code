package solution

import (
	"bufio"
	"log"
	"os"
)

func SolvePart2(input []string) int {
	sum := 0
	for _, round := range input {
		me := round[2:]
		opp := round[:1]
		// rock (AX) beats scisors (CZ) (rock - 1 point)
		// scissor (CZ) beats paper (BY) (scissors - 3 points)
		// paper (BY) beats rock (AX) (paper - 2 points)

		if me == "X" {
			// want loss
			sum += 0
			if opp == "A" {
				// choose scissors to lose
				sum += 3
			} else if opp == "C" {
				// choose paper to lose
				sum += 2
			} else if opp == "B" {
				// choose rock to lose
				sum += 1
			}
		} else if me == "Y" {
			// want draw
			sum += 3
			if opp == "A" {
				// choose rock to draw
				sum += 1
			} else if opp == "B" {
				// choose paper to draw
				sum += 2
			} else if opp == "C" {
				// choose scissors to draw
				sum += 3
			}
		} else if me == "Z" {
			// want win
			sum += 6
			if opp == "A" {
				// choose paper to win
				sum += 2
			} else if opp == "B" {
				// choose scissors to win
				sum += 3
			} else if opp == "C" {
				// choose rock to win
				sum += 1
			}
		}
	}

	return sum
}

func SolvePart1(input []string) int {
	sum := 0
	// rock AX beats CZ
	// paper BY beats AX
	// scissor CZ beats BY

	for _, round := range input {
		me := round[2:]
		opp := round[:1]

		//fmt.Printf("opp: %q, me: %q", opp, me)

		if me == "X" {
			sum += 1
			if opp == "B" {
				// loss
				sum += 0
			} else if opp == "C" {
				// win
				sum += 6
			} else {
				sum += 3
			}
		} else if me == "Y" {
			sum += 2
			if opp == "C" {
				//loss
				sum += 0
			} else if opp == "A" {
				// win
				sum += 6
			} else {
				sum += 3
			}
		} else if me == "Z" {
			sum += 3
			if opp == "A" {
				// loss
				sum += 0
			} else if opp == "B" {
				// win
				sum += 6
			} else {
				sum += 3
			}
		}
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
