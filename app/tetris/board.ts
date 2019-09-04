const EMPTY = "transparent";

export class Board {
  private readonly SQAURESIZE: number;
  private readonly DIMENSIONS: [number, number];

  private ctx: CanvasRenderingContext2D;
  private board: string[][];

  constructor(canvas: HTMLCanvasElement, squareSize = 20, dimensions: [number, number] = [10, 20]) {
    this.ctx = canvas.getContext("2d");

    this.SQAURESIZE = squareSize;
    this.DIMENSIONS = dimensions;

    const [cols, rows] = this.DIMENSIONS;

    for (let i = 0; i < rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < rows; j++) {
        this.board[i][j] = EMPTY;
      }
    }
  }

  private draw() {
    this.board.forEach((row, y) => {
      row.forEach((color, x) => {
        this.ctx.fillStyle = color;

        this.ctx.fillRect(
          x * this.SQAURESIZE,
          y * this.SQAURESIZE,
          this.SQAURESIZE,
          this.SQAURESIZE
        );
      });
    });
  }

  public tick() {

  }
}
