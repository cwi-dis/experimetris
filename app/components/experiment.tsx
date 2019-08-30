import * as React from "react";
import { useState } from "react";

import RatingScale from "./rating_scale";
import EmbeddedVideo from "./embedded_video";

interface VideoStep {
  type: "video";
  url: string;
  autoplay: boolean;
}

interface ScaleStep {
  type: "scale";
  question: string;
  min: number;
  max: number;
  labels: [string, string];
}

export type ExperimentStep = VideoStep | ScaleStep;

interface ExperimentProps {
  steps: Array<ExperimentStep>;
  closeSession: () => void;
}

const Experiment: React.FC<ExperimentProps> = (props) => {
  const [steps, setSteps] = useState<Array<ExperimentStep>>(props.steps);

  const gotoNextStep = () => {
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
            url={currentStep.url}
            autoplay={currentStep.autoplay}
          />
        );
      default:
        return null;
    }
  }

  return null;
};

export default Experiment;
