package notlisp

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

const Up rune = 40   // (
const Down rune = 41 // )
const initialPosition = 0

func ProcessDirections(directions string) (int, int) {
	var count int
	var basementPosition int = initialPosition

	for index, char := range directions {
		if char == Up {
			count++
		} else {
			count--
		}

		if basementPosition == initialPosition && count < 0 {
			basementPosition = index + 1
		}
	}
	return count, basementPosition
}

func ReadFile(fileName string) string {
	file, err := os.Open(fileName)

	if err != nil {
		log.Fatal(err)
	}

	data, err := ioutil.ReadAll(file)

	if err != nil {
		log.Fatal(err)
	}

	return fmt.Sprintf("%s", data)
}
