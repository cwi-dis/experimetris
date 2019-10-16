import * as React from "react";

interface EndScreenProps {
  downloadableData: Array<any>;
  message: string;
}

const EndScreen: React.FC<EndScreenProps> = (props) => {
  const { downloadableData, message } = props;
  const data = "data:application/json;base64," + btoa(JSON.stringify(downloadableData, null, " "));

  const participantId = downloadableData.find((entry) => entry.participantId);
  const filename = (participantId)
    ? `data_${participantId.participantId}.json`
    : "data.json";

  return (
    <div id="end-screen">
      <h2 className="centered">
        {message}
      </h2>

      <a download={filename} href={data} className="button is-info">
        Download data
      </a>
    </div>
  );
};

export default EndScreen;
