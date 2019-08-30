import * as React from "react";
import * as classNames from "classnames";

import { ExperimentStep } from "./experiment";

interface ExperimentLoaderProps {
  onDataLoaded: (data: Array<ExperimentStep>) => void;
}

const ExperimentLoader: React.FC<ExperimentLoaderProps> = (props) => {
  const { onDataLoaded } = props;

  const parseFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const fileInput = e.currentTarget.elements[0] as HTMLInputElement;
    const file = fileInput.files!.item(0)!;

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
      <form className="column" onSubmit={parseFormData}>
        <div className="field">
          <label className="label">File</label>
          <div className="control">
            <input key="upload" className="input is-info" required={true} type="file" placeholder="File" />
          </div>
        </div>

        <div className="field" style={{ marginTop: 25 }}>
          <div className="control">
            <button className={classNames("button", "is-info")}>
              Continue
              </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExperimentLoader;
