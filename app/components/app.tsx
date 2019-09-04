import * as React from "react";
import { useState } from "react";

import ExperimentLoader from "./experiment_loader";
import Experiment, { ExperimentStep } from "./experiment";
import EndScreen from "./end_screen";

const App: React.FC = () => {
  const [collectedData, setCollectedData] = useState<Array<any>>([]);
  const [experiment, setExperiment] = useState<Array<ExperimentStep>>([]);

  const closeSession = (collectedData: Array<any>) => {
    console.log(collectedData);
    setCollectedData(collectedData);
  };

  const renderContent = () => {
    if (collectedData.length > 0) {
      return (
        <EndScreen
          message="Thank you!"
          downloadableData={collectedData}
        />
      );
    }

    if (experiment.length === 0) {
      return (
        <ExperimentLoader
          onDataLoaded={setExperiment}
        />
      );
    } else {
      return (
        <Experiment
          steps={experiment}
          closeSession={closeSession}
        />
      );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default App;
