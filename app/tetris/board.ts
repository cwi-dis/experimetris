import Piece from "./piece";
import { PIECES } from "./tetromino";
import { EventEmitter } from "events";

export const EMPTY = "transparent";

export function runGame(board: Board, tickLength = 200) {
  let gameOver = false;
  let lastTick = Date.now();

  board.once("gameover", () => gameOver = true);

  const run = () => {
    if (Date.now() - lastTick > tickLength) {
      lastTick = Date.now();
      board.tick();
    }

    if (!gameOver) {
      requestAnimationFrame(run);
    } else {
      console.log("requestAnimationFrame cancelled");
    }
  };

  run();
}

export class Board extends EventEmitter {
  private readonly SQAURESIZE: number;
  private readonly DIMENSIONS: [number, number];

  private ctx: CanvasRenderingContext2D;
  private board: string[][];
  private rowsFilled: number = 0;
  private gameOver: boolean = false;

  private generatedPieces: Array<string> = [];
  private currentPiece?: Piece;

  constructor(canvas: HTMLCanvasElement, squareSize = 20, dimensions: [number, number] = [10, 20]) {
    super();

    this.ctx = canvas.getContext("2d")!;

    this.SQAURESIZE = squareSize;
    this.DIMENSIONS = dimensions;

    const [cols, rows] = this.DIMENSIONS;
    this.board = [];

    for (let i = 0; i < rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < cols; j++) {
        this.board[i][j] = EMPTY;
      }
    }

    document.addEventListener("keydown", (e) => {
      if (!this.currentPiece) {
        return;
      }

      switch (e.keyCode) {
        case 37:
          this.currentPiece.moveLeft();
          break;
        case 38:
          this.currentPiece.rotate();
          break;
        case 39:
          this.currentPiece.moveRight();
          break;
        case 40:
          this.currentPiece.moveDown();
      }
    });
  }

  public getDimensions() {
    return this.DIMENSIONS;
  }

  public getBoard() {
    return this.board;
  }

  public getRowsFilled() {
    return this.rowsFilled;
  }

  public isGameOver() {
    return this.gameOver;
  }

  private getRandomPiece() {
    const i = Math.floor(Math.random() * PIECES.length);
    const [name, shape, color] = PIECES[i];

    const initialPosition: [number, number] = [
      Math.floor(this.DIMENSIONS[0] / 2) - 2,
      -2
    ];

    this.generatedPieces.push(name);
    this.emit("pieceGenerated", name);

    return new Piece(this, shape, color, initialPosition);
  }

  private drawSquare(x: number, y: number, color: string) {
    this.ctx.strokeStyle = "#555555";
    this.ctx.fillStyle = color;

    this.ctx.strokeRect(
      x * this.SQAURESIZE,
      y * this.SQAURESIZE,
      this.SQAURESIZE,
      this.SQAURESIZE
    );

    this.ctx.fillRect(
      x * this.SQAURESIZE,
      y * this.SQAURESIZE,
      this.SQAURESIZE,
      this.SQAURESIZE
    );
  }

  private updateBoard(piece: Piece) {
    const shape = piece.getShape();
    const color = piece.getColor();
    const position = piece.getPosition();

    shape.forEach((row, y) => {
      row.forEach((filled, x) => {
        if (filled === 1) {
          const [boardX, boardY] = [x + position[0], y + position[1]];

          if (boardY < 0) {
            this.gameOver = true;
            return;
          }

          this.board[boardY][boardX] = color;
        }
      });
    });

    for (let y = 0; y < this.board.length; y++) {
      const isFull = this.board[y].every((col) => col !== EMPTY);

      if (isFull) {
        for (let dy = y; dy > 1; dy--) {
          for (let dx = 0; dx < this.board[y].length; dx++) {
            this.board[dy][dx] = this.board[dy - 1][dx];
          }
        }

        for (let dx = 0; dx < this.board[y].length; dx++) {
          this.board[0][dx] = EMPTY;
        }

        this.rowsFilled += 1;
        this.emit("rowCompleted", this.rowsFilled);
      }
    }
  }

  private draw() {
    this.ctx.clearRect(
      0, 0,
      this.DIMENSIONS[0] * this.SQAURESIZE, this.DIMENSIONS[1] * this.SQAURESIZE
    );

    this.board.forEach((row, y) => {
      row.forEach((color, x) => {
        this.drawSquare(x, y, color);
      });
    });

    if (this.currentPiece) {
      const shape = this.currentPiece.getShape();
      const color = this.currentPiece.getColor();
      const position = this.currentPiece.getPosition();

      shape.forEach((row, y) => {
        row.forEach((filled, x) => {
          if (filled === 1) {
            this.drawSquare(
              x + position[0],
              y + position[1],
              color
            );
          }
        });
      });
    }
  }

  public tick() {
    if (this.gameOver) {
      this.emit("gameover", this.rowsFilled, this.generatedPieces);
      return;
    }

    if (!this.currentPiece) {
      this.currentPiece = this.getRandomPiece();
    }

    this.currentPiece.moveDown();

    if (this.currentPiece.isLocked()) {
      this.updateBoard(this.currentPiece);
      this.currentPiece = undefined;
    }

    this.draw();
  }
}
