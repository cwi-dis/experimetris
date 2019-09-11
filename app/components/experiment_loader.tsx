import * as React from "react";
import { useState } from "react";
import * as classNames from "classnames";

import { ExperimentStep } from "./experiment";
import { shuffle } from "../util";

interface ExperimentLoaderProps {
  onDataLoaded: (data: Array<ExperimentStep>) => void;
}

const ExperimentLoader: React.FC<ExperimentLoaderProps> = (props) => {
  const [dropzoneEntered, setDropzoneEntered] = useState(false);
  const { onDataLoaded } = props;

  const parseFormData = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("File dropped");

    const file = e.dataTransfer.files.item(0)!;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const content = e.target.result;
      const experimentData: Array<any> = JSON.parse(content);

      const indicesToRandomize = experimentData.reduce<Array<number>>((foundIndices, step, i) => {
        return (step.randomize && step.randomize === true)
          ? foundIndices.concat([i])
          : foundIndices;
      }, []);

      const shuffledSteps = shuffle(indicesToRandomize).map((i) => experimentData[i]);
      indicesToRandomize.forEach((i, j) => experimentData[i] = shuffledSteps[j]);

      onDataLoaded(experimentData);
    };

    reader.onerror = () => {
      console.error("Could not read file");
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <div
        className={classNames("dropzone", { "dropzone-entered": dropzoneEntered })}
        onDragEnter={() => setDropzoneEntered(true)}
        onDragLeave={() => setDropzoneEntered(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={parseFormData}
      >
        Drop a file here
      </div>
    </div>
  );
};

export default ExperimentLoader;
