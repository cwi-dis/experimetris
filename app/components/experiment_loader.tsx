import * as React from "react";
import { useState } from "react";
import * as classNames from "classnames";

import { ExperimentStep } from "./experiment";

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
      onDataLoaded(JSON.parse(content));
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
