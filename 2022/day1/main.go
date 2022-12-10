package main

import (
	"fmt"
	"saylerb/advent-of-code/2022/day1/calorie"
)

func main() {
	calories := calorie.ScanIntoSlice("input.txt")

	one := calorie.SumOfTopNSubtotals(calories, 1)
	two := calorie.SumOfTopNSubtotals(calories, 3)

	fmt.Println("Part one res:", one)
	fmt.Println("Part two res:", two)
}
