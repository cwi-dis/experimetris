import { Tetromino } from "./tetromino";
import Game, { EMPTY } from "./game";

export default class Piece {
  private shape: Tetromino;
  private color: string;

  private rotation: number;
  private position: [number, number];
  private board: Game;

  private locked: boolean;

  constructor(board: Game, shape: Tetromino, color: string, position: [number, number] = [0, 0]) {
    this.board = board;
    this.shape = shape;
    this.color = color;
    this.rotation = 0;
    this.position = position;

    this.locked = false;
  }

  public getShape() {
    return this.shape[this.rotation];
  }

  public getColor() {
    return this.color;
  }

  public rotate() {
    this.rotation = (this.rotation + 1) % this.shape.length;

    const [x] = this.getPosition();
    let rotationXShift = 0;

    if (this.collision(0, 0)) {
      if (x > this.board.getDimensions()[0] / 2) {
        rotationXShift = -1;
      } else {
        rotationXShift = 1;
      }
    }

    if (!this.collision(rotationXShift, 0)) {
      this.position[0] += rotationXShift;
    }
  }

  public moveDown() {
    if (this.collision(0, 1)) {
      this.locked = true;
    } else {
      this.position[1] += 1;
    }
  }

  public moveLeft() {
    if (!this.collision(-1, 0)) {
      this.position[0] -= 1;
    }
  }

  public moveRight() {
    if (!this.collision(1, 0)) {
      this.position[0] += 1;
    }
  }

  public getPosition() {
    return this.position;
  }

  public isLocked() {
    return this.locked;
  }

  public collision(dX: number, dY: number): boolean {
    const currentShape = this.getShape();
    const [nextX, nextY] = [this.position[0] + dX, this.position[1] + dY];

    for (let y = 0; y < currentShape.length; y++) {
      for (let x = 0; x < currentShape[y].length; x++) {
        if (currentShape[y][x] === 0) {
          continue;
        }

        const [newX, newY] = [
          nextX + x,
          nextY + y
        ];

        if (newX < 0 || newX >= this.board.getDimensions()[0] || newY >= this.board.getDimensions()[1]) {
          return true;
        }

        if (newY < 0) {
          continue;
        }

        if (this.board.getBoard()[newY][newX] !== EMPTY) {
          return true;
        }
      }
    }

    return false;
  }
}
