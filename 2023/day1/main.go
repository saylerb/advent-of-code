package main

import (
	"fmt"
	"saylerb/advent-of-code/2023/day1/trebuchet"
)

func main() {
	one := trebuchet.Solution("input.txt")
	two := trebuchet.SolutionTwo("input.txt")

	fmt.Println("part one solution: ", one)
	fmt.Println("part two solution: ", two)
}
