import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Board } from "../tetris/board";

interface TetrisBoardProps {
  onContinue: () => void;
}

const TetrisBoard: React.FC<TetrisBoardProps> = (props) => {
  const [score, setScore] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { onContinue } = props;

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current!;
    const board = new Board(canvas, 30, [10, 20]);

    runGame(board, mapDifficulty(difficulty));

    board.once("gameover", (rowsFilled: number) => {
      console.log("Game ended with score:", rowsFilled);
      onContinue();
    });

    board.on("pieceGenerated", (name: string) => {
      console.log("New piece generated:", name);
    });

    board.on("rowCompleted", (rowsFilled: number) => {
      console.log("New row completed");
      setScore(rowsFilled);
    });

    return () => {
      clearInterval(gameTick);
    };
  }, []);

  return (
    <div>
      <div className="score">
        {score * 10}
      </div>

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
