import * as React from "react";
import { string } from "prop-types";

interface VideoStep {
  type: "video";
  url: string;
}

interface ScaleStep {
  type: "scale";
  question: string;
  min: number;
  max: number;
}

export type ExperimentStep = VideoStep | ScaleStep;

interface ExperimentProps {
  steps: Array<ExperimentStep>;
}

const Experiment: React.FC<ExperimentProps> = (props) => {
  const { steps } = props;

  return (
    <div>Loaded experiment: {steps}</div>
  );
};

export default Experiment;
