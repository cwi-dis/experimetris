import * as React from "react";
import { useState, useEffect } from "react";

interface ParticipantIdResult {
  participantId: string;
}

interface ParticipantIdProps {
  onContinue: (data: ParticipantIdResult) => void;
}

const ParticipantId: React.FC<ParticipantIdProps> = (props) => {
  const { onContinue } = props;
  const [participantId, setParticipantId] = useState<string>("");

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Enter" && participantId.length > 0) {
        onContinue({ participantId });
      }
    };

    document.addEventListener("keydown", keyListener);

    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  });

  return (
    <div className="participantid">
      <h4 className="title is-4" style={{ color: "#DDDDDD" }}>
        Participant ID
      </h4>

      <div className="field">
        <div className="control">
          <input
            type="text"
            className="input is-info"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          />
        </div>
      </div>

      <button
        className="button is-info"
        disabled={participantId.length === 0}
        onClick={() => onContinue({ participantId })}
      >
        Continue
      </button>
    </div>
  );
};

export default ParticipantId;
