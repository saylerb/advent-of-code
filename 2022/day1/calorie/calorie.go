package calorie

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func newTopSubtotals(candidate int, oldSubtotals []int) []int {
	var newSubtotals = make([]int, len(oldSubtotals))
	copy(newSubtotals, oldSubtotals)

	lastReplaced := -1

	for i, current := range oldSubtotals {
		if lastReplaced != -1 {
			if lastReplaced > current {
				newSubtotals[i] = lastReplaced
				lastReplaced = current
			}
		} else if candidate > current {
			newSubtotals[i] = candidate
			lastReplaced = current
		} else {
			newSubtotals[i] = current
		}
	}
	return newSubtotals
}

func SumOfTopNSubtotals(calories []string, numberOfSubTotals int) int {
	topThree := make([]int, numberOfSubTotals)
	subTotal := 0

	for i, item := range calories {
		if item == "" {
			topThree = newTopSubtotals(subTotal, topThree)
			subTotal = 0
			continue
		}

		num, err := strconv.Atoi(item)

		if err != nil {
			log.Fatal(err)
		}

		subTotal += num

		if i == len(calories)-1 {
			topThree = newTopSubtotals(subTotal, topThree)
		}
	}

	return func() int {
		s := 0
		for _, num := range topThree {
			s += num
		}
		return s
	}()
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
