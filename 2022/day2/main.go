package main

import (
	"fmt"
	"saylerb/advent-of-code/2022/day2/solution"
)

func main() {
	input := solution.ScanIntoSlice("input.txt")

	res := solution.Solve(input)

	fmt.Println("sum: ", res)
}
