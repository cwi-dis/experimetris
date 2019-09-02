import * as React from "react";
import { useEffect, useRef } from "react";
import YouTubePlayer = require("yt-player");

interface EmbeddedVideoProps {
  videoId: string;
  autoplay: boolean;
  onContinue: () => void;
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = (props) => {
  const { videoId, autoplay, onContinue } = props;
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef) {
      console.error("Video ref not available");
      return;
    }

    console.log(window.innerWidth, window.innerHeight);

    const player = new YouTubePlayer(videoRef.current!, {
      width: window.innerWidth,
      height: window.innerHeight - 24,
      modestBranding: true
    });

    player.load(videoId, autoplay);
    player.setVolume(100);

    player.on("ended", () => {
      console.log("Video playback ended");
      onContinue();
    });
  }, [videoId]);

  return (
    <div>
      <div ref={videoRef} />
    </div>
  );
};

export default EmbeddedVideo;
