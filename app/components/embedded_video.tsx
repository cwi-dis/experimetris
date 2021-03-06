import * as React from "react";
import { useEffect, useRef } from "react";
import YouTubePlayer = require("yt-player");

interface EmbeddedVideoResult {
  videoStarted: number;
  videoEnded: number;
}

interface EmbeddedVideoProps {
  videoId: string;
  autoplay: boolean;
  stopAfter?: number;
  onContinue: (data: EmbeddedVideoResult) => void;
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

    let start = 0;

    player.on("playing", () => {
      start = Date.now() / 1000;
    });

    player.on("ended", () => {
      console.log("Video playback ended");
      onContinue({
        videoStarted: start,
        videoEnded: Date.now() / 1000
      });
    });

    if (stopAfter) {
      player.on("timeupdate", (time) => {
        if (time >= stopAfter) {
          player.stop();
          player.destroy();

          onContinue({
            videoStarted: start,
            videoEnded: Date.now() / 1000
          });
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
