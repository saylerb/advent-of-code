import { parseFile } from "./parseFile.js";

interface BingoGame {
  boards: number[][][];
  drawings: number[];
}
interface BoardIndex {
  [key: number]: Cell;
}
interface Cell {
  row: number;
  col: number;
  marked: boolean;
}

export class Game {
  boards: Board[];
  drawings: number[];
  someoneWon: boolean = false;

  constructor(boards: Board[], drawings: number[]) {
    this.boards = boards;
    this.drawings = drawings;
  }

  play() {
    let currentDrawingIndex = 0;
    let currentDrawing: number = this.drawings[currentDrawingIndex];

    let finalScore = 0;

    while (!this.someoneWon && currentDrawingIndex < this.drawings.length) {
      currentDrawing = this.drawings[currentDrawingIndex];

      this.boards.forEach((board) => {
        board.addDrawing(currentDrawing);
        const won = board.hasWon();

        if (won) {
          // console.log("Board won!");
          // console.log("Winning board");
          // board.print();
          this.someoneWon = true;
          finalScore = board.getScore();
          // console.log("score:", finalScore);
        }
      });

      currentDrawingIndex += 1;
    }

    // this.boards.forEach((board) => board.print());
    return finalScore;
  }
}

export class Board {
  grid: number[][];
  index: BoardIndex;
  drawings: number[];

  constructor(grid: number[][]) {
    this.grid = grid;
    this.index = this.createIndex();
    this.drawings = [];
  }

  getScore() {
    const lastDrawing: number = this.drawings[this.drawings.length - 1];

    let sumOfMarked = 0;

    Object.keys(this.index).forEach((currentKey: string) => {
      const currentNum: number = parseInt(currentKey, 10);
      const marked: boolean = this.index[currentNum].marked;

      if (!marked) {
        sumOfMarked += currentNum;
      }
    });
    // console.log({ lastDrawing, sumOfMarked });

    return lastDrawing * sumOfMarked;
  }

  print() {
    console.log({ index: this.index, won: this.hasWon() });
  }

  hasWon(): boolean {
    if (this.grid.length === 0) {
      return false;
    }

    const aRowIsFilled = this.grid.some((_, rowIndex) => {
      return this.isRowFilled(rowIndex);
    });

    if (aRowIsFilled) {
      return true;
    }

    const aColIsFilled = this.grid[0].some((_, colIndex) => {
      const colFilled = this.isColFilled(colIndex);
      return colFilled;
    });

    return aColIsFilled;
  }

  addDrawing(drawing: number) {
    this.drawings = [...this.drawings, drawing];

    this.markNumberIfPresent(drawing);
  }

  isRowFilled(rowNumber: number) {
    const row = this.grid[rowNumber];

    return row.every((num) => this.index[num].marked);
  }

  isColFilled(colNumber: number): boolean {
    return this.grid.every((row) => {
      return this.index[row[colNumber]].marked;
    });
  }

  markNumberIfPresent(drawing: number) {
    const present = typeof this.index[drawing] !== "undefined";

    if (present) {
      this.index[drawing] = { ...this.index[drawing], marked: true };
    }
  }

  createIndex() {
    const index: BoardIndex = {};
    this.grid.forEach((rowOfNumbers, row) => {
      rowOfNumbers.forEach((num, col) => {
        index[num] = { row, col, marked: false };
      });
    });

    return index;
  }
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
