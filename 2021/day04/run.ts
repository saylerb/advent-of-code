import { Game, Board, parseBingo } from "./index.js";
import { parseFile } from "./parseFile.js";

(() => {
  const { drawings, boards: rawBoards } = parseBingo(
    "../../inputs/2021/day04.txt"
  );

  const boards = rawBoards.map((rawBoard) => new Board(rawBoard));

  const game = new Game(boards, drawings);

  const result = game.play();

  console.log({ result });
})();
