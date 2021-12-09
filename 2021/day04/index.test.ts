import { parseBingo, Board, Game } from "./index.js";

describe("bingo", () => {
  test("test parsing of file", () => {
    expect(parseBingo("test.txt")).toEqual(
      expect.objectContaining({
        drawings: [
          7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12,
          22, 18, 20, 8, 19, 3, 26, 1,
        ],
        boards: expect.arrayContaining([
          [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19],
          ],
          [
            [3, 15, 0, 2, 22],
            [9, 18, 13, 17, 5],
            [19, 8, 7, 25, 23],
            [20, 11, 10, 24, 4],
            [14, 21, 16, 12, 6],
          ],
        ]),
      })
    );
  });

  test("a board should know if it has won", () => {
    const board = new Board([]);

    expect(board.hasWon()).toBe(false);
  });

  test("a board can index its numbers into a map for easy checking", () => {
    const board = new Board([[22, 13, 17, 11, 0]]);

    expect(board.index).toEqual({
      22: { row: 0, col: 0, marked: false },
      13: { row: 0, col: 1, marked: false },
      17: { row: 0, col: 2, marked: false },
      11: { row: 0, col: 3, marked: false },
      0: { row: 0, col: 4, marked: false },
    });
  });

  test("can mark a number when present in board", () => {
    const board = new Board([
      [22, 13],
      [8, 2],
    ]);

    board.addDrawing(22);

    expect(board.index).toEqual({
      22: { row: 0, col: 0, marked: true },
      13: { row: 0, col: 1, marked: false },
      8: { row: 1, col: 0, marked: false },
      2: { row: 1, col: 1, marked: false },
    });
  });

  test("can check if a row has all numbers marked", () => {
    const board = new Board([
      [22, 13],
      [8, 2],
    ]);

    board.addDrawing(22);
    board.addDrawing(13);

    expect(board.isRowFilled(0)).toEqual(true);
    expect(board.isRowFilled(1)).toEqual(false);

    expect(board.index).toEqual({
      22: { row: 0, col: 0, marked: true },
      13: { row: 0, col: 1, marked: true },
      8: { row: 1, col: 0, marked: false },
      2: { row: 1, col: 1, marked: false },
    });
  });

  test("can check if a row has all numbers marked", () => {
    const board = new Board([
      [22, 13],
      [8, 2],
    ]);

    board.addDrawing(13);
    board.addDrawing(2);

    expect(board.isColFilled(0)).toEqual(false);
    expect(board.isColFilled(1)).toEqual(true);

    expect(board.index).toEqual({
      22: { row: 0, col: 0, marked: false },
      13: { row: 0, col: 1, marked: true },
      8: { row: 1, col: 0, marked: false },
      2: { row: 1, col: 1, marked: true },
    });
  });

  test("a board wins if a row is filled", () => {
    const board = new Board([
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ]);

    board.addDrawing(21);
    board.addDrawing(9);
    board.addDrawing(14);
    board.addDrawing(16);
    board.addDrawing(7);

    expect(board.hasWon()).toEqual(true);
  });

  test("a board wins if a col is filled", () => {
    const board = new Board([
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ]);

    board.addDrawing(22);
    board.addDrawing(8);
    board.addDrawing(21);
    board.addDrawing(6);
    board.addDrawing(1);

    expect(board.hasWon()).toEqual(true);
  });

  test("can calculate score when a board wins", () => {
    const board = new Board([
      [22, 13],
      [8, 2],
    ]);

    board.addDrawing(13);
    board.addDrawing(2);

    const expectedScore: number = 2 * (22 + 8);

    expect(board.getScore()).toEqual(expectedScore);
  });

  test("should be able to keep track of the state of multiple boards", () => {
    const boardOne = new Board([
      [22, 13],
      [8, 2],
    ]);

    const boardTwo = new Board([
      [6, 10],
      [1, 12],
    ]);

    const drawings = [2, 13];

    const game = new Game([boardOne, boardTwo], drawings);

    const result = game.playUntilWon();

    expect(game.someoneWon).toEqual(true);
    const expectedScore: number = 13 * (22 + 8);

    expect(result).toEqual(expectedScore);
  });

  test("can play until all boards except one have already won", () => {
    const boardOne = new Board([
      [22, 13],
      [8, 2],
    ]);

    const boardTwo = new Board([
      [6, 10],
      [1, 12],
    ]);

    const boardThree = new Board([
      [25, 12],
      [99, 11],
    ]);

    const drawings = [2, 13, 10, 12, 11];

    const game = new Game([boardOne, boardTwo, boardThree], drawings);

    const result = game.playUntilSingleBoardLeft();
    const expectedScore = 11 * (25 + 99);

    // expect(game.someoneWon).toEqual(true);
    expect(result).toEqual(expectedScore);
  });

  test("provided example", () => {
    const drawings = [
      7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
      18, 20, 8, 19, 3, 26, 1,
    ];
    const boards = [
      [
        [22, 13, 17, 11, 0],
        [8, 2, 23, 4, 24],
        [21, 9, 14, 16, 7],
        [6, 10, 3, 18, 5],
        [1, 12, 20, 15, 19],
      ],
      [
        [3, 15, 0, 2, 22],
        [9, 18, 13, 17, 5],
        [19, 8, 7, 25, 23],
        [20, 11, 10, 24, 4],
        [14, 21, 16, 12, 6],
      ],
      [
        [14, 21, 17, 24, 4],
        [10, 16, 15, 9, 19],
        [18, 8, 23, 2, 20],
        [22, 11, 13, 6, 5],
        [2, 0, 12, 3, 7],
      ],
    ];

    const game = new Game(
      boards.map((board) => new Board(board)),
      drawings
    );

    const result = game.playUntilSingleBoardLeft();

    expect(result).toEqual(1924);
  });
});
