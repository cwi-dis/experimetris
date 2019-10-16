import * as React from "react";
import { useState } from "react";

import Scale from "./scale";

interface QuestionnaireResult {
  questionStarted: number;
  questionEnded: number;
  responses: Array<number>;
}

interface QuestionnaireProps {
  questions: Array<string>;
  min: number;
  max: number;
  labels: [string, string];
  onContinue: (data: QuestionnaireResult) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = (props) => {
  const { questions, min, max, labels, onContinue } = props;

  const [questionStarted] = useState<number>(Date.now() / 1000);
  const [responses, setResponses] = useState<Array<number | undefined>>(
    new Array(questions.length).fill(undefined)
  );

  const updateResponse = (i: number, value: number) => {
    console.log("Updating entry at", i, "with value", value);

    responses[i] = value;
    setResponses([...responses]);
  };

  const renderQuestion = (question: string, value: number | undefined, index: number) => {
    return (
      <div key={index}>
        <h5 className="title is-5" style={{color: "#DDDDDD"}}>
          {question}
        </h5>

        <Scale
          min={min}
          max={max}
          value={value}
          labels={labels}
          onChange={updateResponse.bind(null, index)}
        />
      </div>
    );
  };

  return (
    <div className="questionnaire-container">
      {questions.map((q, i) => renderQuestion(q, responses[i], i))}

      <br />
      <button
        className="button is-info"
        disabled={responses.some((r) => r === undefined)}
        onClick={() => onContinue({ questionStarted, responses: responses as Array<number>, questionEnded: Date.now() / 1000})}
      >
        Continue
      </button>
    </div>
  );
};

export default Questionnaire;
