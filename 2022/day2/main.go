package main

import (
	"fmt"
	"saylerb/advent-of-code/2022/day2/solution"
)

func main() {
	input := solution.ScanIntoSlice("input.txt")

	one := solution.SolvePart1(input)
	two := solution.SolvePart2(input)

	fmt.Println("one: ", one)
	fmt.Println("two: ", two)
}
