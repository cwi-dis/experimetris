import * as React from "react";

interface FullscreenMessageProps {
  message: string;
}

const FullscreenMessage: React.FC<FullscreenMessageProps> = (props) => {
  return (
    <div id="fullscreen-message">
      <h2 className="centered">{props.message}</h2>
    </div>
  );
};

export default FullscreenMessage;
