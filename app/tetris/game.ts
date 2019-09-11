import { EventEmitter } from "events";

import Piece from "./piece";
import { PIECES } from "./tetromino";
import { Range } from "../util";

export const EMPTY = "transparent";

export default class Game extends EventEmitter {
  private readonly SQAURESIZE: number;
  private readonly DIMENSIONS: [number, number];

  private ctx: CanvasRenderingContext2D;
  private board: string[][];
  private rowsFilled: Array<number> = [];

  private generatedPieces: Array<[string, number]> = [];
  private currentPiece?: Piece;

  private tickLength: number;
  private gameOver: boolean = false;

  constructor(canvas: HTMLCanvasElement, tickLength = 200, squareSize = 20, dimensions: [number, number] = [10, 20]) {
    super();

    this.ctx = canvas.getContext("2d")!;

    this.tickLength = tickLength;
    this.SQAURESIZE = squareSize;
    this.DIMENSIONS = dimensions;

    const [cols, rows] = this.DIMENSIONS;
    this.board = Range(0, rows).map(() => new Array(cols).fill(EMPTY));

    document.addEventListener("keydown", (e) => {
      if (!this.currentPiece) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          this.currentPiece.moveLeft();
          break;
        case "ArrowUp":
          this.currentPiece.rotate();
          break;
        case "ArrowRight":
          this.currentPiece.moveRight();
          break;
        case "ArrowDown":
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
    return this.rowsFilled.length;
  }

  public isGameOver() {
    return this.gameOver;
  }

  public stopGame() {
    this.gameOver = true;
  }

  public getTickLength() {
    return this.tickLength;
  }

  public setTickLength(tickLength: number) {
    this.tickLength = tickLength;
  }

  private getRandomPiece() {
    const i = Math.floor(Math.random() * PIECES.length);
    const [name, shape, color] = PIECES[i];

    const initialPosition: [number, number] = [
      Math.floor(this.DIMENSIONS[0] / 2) - 2,
      -2
    ];

    this.generatedPieces.push([name, Date.now() / 1000]);
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

        this.rowsFilled.push(Date.now() / 1000);
        this.emit("rowCompleted", this.rowsFilled.length);
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

  private tick() {
    if (this.gameOver) {
      return;
    }

    if (!this.currentPiece) {
      this.currentPiece = this.getRandomPiece();
    }

    this.currentPiece.moveDown();

    if (this.currentPiece.isLocked()) {
      this.generatedPieces[this.generatedPieces.length - 1].push(Date.now() / 1000);

      this.updateBoard(this.currentPiece);
      this.currentPiece = undefined;
    }
  }

  public run() {
    let lastTick = Date.now();

    const gameLoop = () => {
      if (Date.now() - lastTick > this.tickLength) {
        lastTick = Date.now();
        this.tick();
      }

      this.draw();

      if (!this.gameOver) {
        requestAnimationFrame(gameLoop);
      } else {
        console.log("requestAnimationFrame cancelled");
        this.emit("gameover", this.rowsFilled, this.generatedPieces);
      }
    };

    gameLoop();
  }
}
