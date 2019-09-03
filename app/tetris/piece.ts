import { Tetromino, PIECES } from "./tetromino";

class Piece {
  private shape: Tetromino;
  private color: string;
  private rotation: number;

  constructor(shape: Tetromino, color: string) {
    this.shape = shape;
    this.color = color;
    this.rotation = 0;
  }

  public rotate() {
    this.rotation = (this.rotation + 1) % this.shape.length;
  }

  public getShape() {
    return this.shape[this.rotation];
  }

  public getColor() {
    return this.color;
  }
}

export function getRandomPiece() {
  const i = Math.floor(Math.random() * PIECES.length);
  const [shape, color] = PIECES[i];

  return new Piece(shape, color);
}
