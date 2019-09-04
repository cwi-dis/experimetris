import * as React from "react";

interface EndScreenProps {
  downloadableData: Array<any>;
  message: string;
}

const EndScreen: React.FC<EndScreenProps> = (props) => {
  const { downloadableData, message } = props;
  const data = "data:application/json;base64," + btoa(JSON.stringify(downloadableData));

  return (
    <div id="fullscreen-message">
      <h2 className="centered">
        {message}
      </h2>

      <a download="data.json" href={data} className="button is-info">
        Download data
      </a>
    </div>
  );
};

export default EndScreen;
