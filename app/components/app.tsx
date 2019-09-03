import * as React from "react";
import { useState } from "react";

import ExperimentLoader from "./experiment_loader";
import Experiment, { ExperimentStep } from "./experiment";

const App: React.FC = () => {
  const [experiment, setExperiment] = useState<Array<ExperimentStep>>([]);

  return (
    <div>
      {(experiment.length === 0)
        ? <ExperimentLoader onDataLoaded={setExperiment} />
        : <Experiment steps={experiment} closeSession={() => setExperiment([])} />
      }
    </div>
  );
};

export default App;
