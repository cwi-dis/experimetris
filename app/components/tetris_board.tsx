import * as React from "react";
import { useEffect, useRef } from "react";

import { Board } from "../tetris/board";

const TetrisBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current!;
    const board = new Board(canvas, 30);

    const gameTick = setInterval(() => {
      board.tick();
    }, 200);

    return () => {
      clearInterval(gameTick);
    };
  });

  return (
    <div>
      <canvas width={600} height={600} ref={canvasRef} />
    </div>
  );
};

export default TetrisBoard;
