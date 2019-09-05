import * as React from "react";
import { useState } from "react";

import Scale from "./scale";

interface RatingResult {
  questionStarted: number;
  questionEnded: number;
  value: number;
}

interface RatingScaleProps {
  question: string;
  min: number;
  max: number;
  labels: [string, string];
  onContinue: (data: RatingResult) => void;
}

const RatingScale: React.FC<RatingScaleProps> = (props) => {
  const { question, min, max, labels, onContinue } = props;
  const defaultValue = Math.round((max - min) / 2 + min);

  const [questionStarted] = useState<number>(Date.now() / 1000);
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <div className="question-container">
      <h4 className="title is-4" style={{color: "#E2E2E2"}}>
        {question}
      </h4>

      <Scale
        min={min}
        max={max}
        value={value}
        labels={labels}
        onChange={(n) => setValue(n)}
      />

      <br />
      <button
        className="button is-info"
        onClick={() => onContinue({ questionStarted, value, questionEnded: Date.now() / 1000 })}
      >
        Continue
      </button>
    </div>
  );
};

export default RatingScale;
