import * as React from "react";

interface EmbeddedVideoProps {
  videoId: string;
  autoplay: boolean;
  onContinue: () => void;
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = (props) => {
  const { videoId, autoplay } = props;
  const embedUrl = url.replace("watch?v=", "embed/") + ((autoplay) ? "?autoplay=1" : "");
  console.log("embedurl:", embedUrl);

  return (
    <div>
      <iframe style={{ width: "100%", height: "calc(100vh - 24px)" }} src={embedUrl} />
    </div>
  );
};

export default EmbeddedVideo;
