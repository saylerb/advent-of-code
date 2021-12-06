import { parseFile } from "./parseFile.js";

interface BingoGame {
  boards: number[][][];
  drawings: number[];
}

export function parseBingo(fileName: string): BingoGame {
  const rows: string[] = parseFile(fileName);

  const [rawDrawings, ...rawBoards] = rows;

  let boards: number[][][] = [];

  let currentBoardIndex: number = 0;
  let currentBoardRows: number[][] = [];

  rawBoards.forEach((row, index) => {
    if (row === "") {
      boards.push([]);
      if (index !== 0) {
        boards = [...boards, currentBoardRows];
        currentBoardIndex += 1;
        currentBoardRows = [];
      }
    } else {
      const parsedRow: number[] = row
        .split(/\s+/)
        .filter((column) => column !== "")
        .map((num) => parseInt(num, 10));
      currentBoardRows = [...currentBoardRows, parsedRow];
    }
  });

  // filter out an blank boards from trailing blank rows
  boards = boards.filter((board) => board.length > 0);

  const drawings = rawDrawings
    .split(",")
    .map((drawing) => parseInt(drawing, 10));

  return { drawings, boards };
}

export function part2() {}
