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
    const board = new Board(canvas, 30, [10, 20]);

    const gameTick = setInterval(() => {
      board.tick();
    }, 200);

    board.once("gameover", (rowsFilled: number) => {
      console.log("Game ended with score:", rowsFilled);
      onContinue();
    });

    board.on("pieceGenerated", (name: string) => {
      console.log("New piece generated:", name);
    });

    board.on("rowCompleted", () => {
      console.log("New row completed");
    });

    return () => {
      clearInterval(gameTick);
    };
  });

  return (
    <div>
      <canvas
        style={{ margin: "calc(50vh - 300px) calc(50vw - 150px)" }}
        width={300}
        height={600}
        ref={canvasRef}
      />
    </div>
  );
};

export default TetrisBoard;
