import * as React from "react";
import { useEffect, useRef, useState } from "react";

import Game from "../tetris/game";

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

function formatTimer(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

interface TetrisResult {
  gameStarted: number;
  gameEnded: number;
  generatedPieces: Array<string>;
  rowsFilled: Array<number>;
  numRowsFilled: number;
  gameEndedThrough: "timerExpired" | "gameOver";
  difficulty: TetrisDifficulty;
}

interface TetrisBoardProps {
  difficulty: TetrisDifficulty;
  timeLimit?: number;
  onContinue: (data: TetrisResult) => void;
}

const TetrisBoard: React.FC<TetrisBoardProps> = (props) => {
  const { difficulty, timeLimit, onContinue } = props;

  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(timeLimit || 0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.current!;
    const game = new Game(canvas, mapDifficulty(difficulty), 30, [10, 20]);

    const gameStarted = Date.now() / 1000;
    let timerExpired = false;

    game.run();

    if (timeLimit) {
      let countdown = timeLimit;

      const timerInterval = setInterval(() => {
        countdown -= 1;

        setTimer(countdown);
      }, 1000);

      setTimeout(() => {
        clearInterval(timerInterval);
        timerExpired = true;

        game.stopGame();
      }, timeLimit * 1000);
    }

    game.once("gameover", (rowsFilled: Array<number>, generatedPieces: Array<string>) => {
      console.log("Game ended with score:", rowsFilled.length);

      onContinue({
        gameStarted, rowsFilled, generatedPieces, difficulty,
        gameEnded: Date.now() / 1000,
        gameEndedThrough: (timerExpired) ? "timerExpired" : "gameOver",
        numRowsFilled: rowsFilled.length
      });
    });

    game.on("rowCompleted", (rowsFilled: number) => {
      console.log("New row completed");
      setScore(rowsFilled);
    });
  }, []);

  return (
    <div>
      <div className="score" style={{ top: (timeLimit) ? 50 : 80}}>
        {score * 10}
        {(timeLimit)
          ? <span style={{ color: (timer <= 10) ? "#B60E11" : "inherit"}}>
              {formatTimer(timer)}
            </span>
          : null
        }
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
