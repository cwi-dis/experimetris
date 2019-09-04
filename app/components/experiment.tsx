import * as React from "react";
import { useState } from "react";

import RatingScale from "./rating_scale";
import EmbeddedVideo from "./embedded_video";
import TetrisBoard, { TetrisDifficulty } from "./tetris_board";

interface TetrisStep {
  type: "tetris";
  difficulty: TetrisDifficulty;
}

interface VideoStep {
  type: "video";
  videoId: string;
  autoplay: boolean;
  stopAfter?: number;
}

interface ScaleStep {
  type: "scale";
  question: string;
  min: number;
  max: number;
  labels: [string, string];
}

export type ExperimentStep = TetrisStep | VideoStep | ScaleStep;

interface ExperimentProps {
  steps: Array<ExperimentStep>;
  closeSession: () => void;
}

const Experiment: React.FC<ExperimentProps> = (props) => {
  const [steps, setSteps] = useState<Array<ExperimentStep>>(props.steps);

  const gotoNextStep = () => {
    console.log("Loading next step");
    steps.shift();

    if (steps.length === 0) {
      props.closeSession();
    } else {
      setSteps([...steps]);
    }
  };

  const [currentStep] = steps;

  if (currentStep) {
    switch (currentStep.type) {
      case "scale":
        return (
          <RatingScale
            question={currentStep.question}
            min={currentStep.min}
            max={currentStep.max}
            labels={currentStep.labels}
            onContinue={gotoNextStep}
          />
        );
      case "video":
        return (
          <EmbeddedVideo
            videoId={currentStep.videoId}
            autoplay={currentStep.autoplay}
            stopAfter={currentStep.stopAfter}
            onContinue={gotoNextStep}
          />
        );
      case "tetris":
        return (
          <TetrisBoard
            difficulty={currentStep.difficulty}
            onContinue={gotoNextStep}
          />
        );
      default:
        return null;
    }
  }

  return null;
};

export default Experiment;
