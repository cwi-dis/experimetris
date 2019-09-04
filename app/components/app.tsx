import * as React from "react";
import { useState } from "react";

import ExperimentLoader from "./experiment_loader";
import Experiment, { ExperimentStep } from "./experiment";
import FullscreenMessage from "./fullscreen_message";

const App: React.FC = () => {
  const [sessionClosed, setSessionClosed] = useState(false);
  const [experiment, setExperiment] = useState<Array<ExperimentStep>>([]);

  const renderContent = () => {
    if (sessionClosed) {
      return (
        <FullscreenMessage
          message="Thank you!"
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
          closeSession={setSessionClosed.bind(null, true)}
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
