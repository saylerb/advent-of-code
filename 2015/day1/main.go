package main

import (
	"fmt"
	"saylerb/advent-of-code/2015/day1/notlisp"
)

func main() {
	directions := notlisp.ReadFile("input.txt")

	floor, positionWhereSantaFirstEntersTheBasement := notlisp.ProcessDirections(directions)
	fmt.Println("Final floor:", floor)
	fmt.Println("Santa enters the basement at:", positionWhereSantaFirstEntersTheBasement)
}
