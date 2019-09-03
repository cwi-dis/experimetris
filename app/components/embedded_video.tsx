import * as React from "react";
import { useEffect, useRef } from "react";
import YouTubePlayer = require("yt-player");

interface EmbeddedVideoProps {
  videoId: string;
  autoplay: boolean;
  stopAfter?: number;
  onContinue: () => void;
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = (props) => {
  const { videoId, autoplay, stopAfter, onContinue } = props;
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef) {
      console.error("Video ref not available");
      return;
    }

    console.log("Loading video", videoId);

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

    if (stopAfter) {
      player.on("timeupdate", (time) => {
        if (time >= stopAfter) {
          player.stop();
          player.destroy();

          onContinue();
        }
      });
    }

    return () => {
      player.destroy();
    };
  }, [videoId]);

  return (
    <div>
      <div ref={videoRef} />
    </div>
  );
};

export default EmbeddedVideo;
