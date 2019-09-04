import * as React from "react";
import { useEffect, useRef } from "react";

import { Board } from "../tetris/board";

interface TetrisBoardProps {
  onContinue: () => void;
}

const TetrisBoard: React.FC<TetrisBoardProps> = (props) => {
  const { onContinue } = props;
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

    board.once("gameover", (rowsFilled: number) => {
      console.log("Game ended with score:", rowsFilled);
      onContinue();
    });

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
