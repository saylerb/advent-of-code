import { Game, Board, parseBingo } from "./index.js";

(() => {
  const { drawings, boards: rawBoards } = parseBingo(
    "../../inputs/2021/day04.txt"
  );

  const boardsGameOne = rawBoards.map((rawBoard) => new Board(rawBoard));
  // Need to create new boards for each game, since it is passing by reference
  const boardsGameTwo = rawBoards.map((rawBoard) => new Board(rawBoard));

  const gameOne = new Game(boardsGameOne, drawings);
  const gameTwo = new Game(boardsGameTwo, drawings);

  console.log("Playing game 1");
  const part1Result = gameOne.playUntilWon();
  console.log("Playing game two");
  const part2Result = gameTwo.playUntilSingleBoardLeft();

  console.log({ part1Result, part2Result });
})();
