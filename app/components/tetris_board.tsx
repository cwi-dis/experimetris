import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Board } from "../tetris/board";

export type TetrisDifficulty = "easy" | "normal" | "hard" | "insane";

function mapDifficulty(difficulty: TetrisDifficulty): number {
  switch (difficulty) {
    case "easy":
      return 500;
    case "hard":
      return 100;
    case "insane":
      return 50;
    case "normal":
    default:
      return 200;
  }
}

interface TetrisResult {
  gameStarted: number;
  gameEnded: number;
  generatedPieces: Array<string>;
  rowsFilled: Array<number>;
  numRowsFilled: number;
}

interface TetrisBoardProps {
  difficulty: TetrisDifficulty;
  onContinue: (data: TetrisResult) => void;
}

const TetrisBoard: React.FC<TetrisBoardProps> = (props) => {
  const [score, setScore] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { difficulty, onContinue } = props;

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current!;
    const board = new Board(canvas, mapDifficulty(difficulty), 30, [10, 20]);

    const gameStarted = Date.now() / 1000;
    board.run();

    board.once("gameover", (rowsFilled: Array<number>, generatedPieces: Array<string>) => {
      console.log("Game ended with score:", rowsFilled.length);

      onContinue({
        gameStarted, rowsFilled, generatedPieces,
        gameEnded: Date.now() / 1000,
        numRowsFilled: rowsFilled.length
      });
    });

    board.on("pieceGenerated", (name: string) => {
      console.log("New piece generated:", name);
    });

    board.on("rowCompleted", (rowsFilled: number) => {
      console.log("New row completed");
      setScore(rowsFilled);
    });
  }, []);

  return (
    <div>
      <div className="score">
        {score * 10}
      </div>

      <canvas
        style={{ margin: "calc(50vh - 300px) calc(50vw - 150px)", border: "1px solid #555555" }}
        width={300}
        height={600}
        ref={canvasRef}
      />
    </div>
  );
};

export default TetrisBoard;
