package solution

import (
	"bufio"
	"log"
	"os"
)

func Solve(input []string) int {
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
