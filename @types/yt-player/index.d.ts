declare module "yt-player" {
  interface YouTubePlayerOptions {
    width?: number;
    height?: number;
    autoplay?: boolean;
    captions?: boolean | string;
    controls?: boolean;
    keyboard?: boolean;
    fullscreen?: boolean;
    annotations?: boolean;
    modestBranding?: boolean;
    related?: boolean;
    info?: boolean;
    timeupdateFrequency?: number;
    playsInline?: boolean;
  }

  type YoutubePlayerState = "unstarted" | "ended" | "playing" | "paused" | "buffering" | "cued";

  class YouTubePlayer {
    videoId: string;
    destroyed: boolean;

    constructor(element: HTMLElement | string, options?: YouTubePlayerOptions);
    load(videoId: string, autoplay?: boolean): void;

    play(): void;
    pause(): void;
    stop(): void;
    seek(seconds: number): void;

    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;

    setSize(width: number, height: number): void;

    setPlaybackRate(rate: number): void;
    getPlaybackRate(): number;
    getAvailablePlaybackRates(): Array<number>;

    getDuration(): number;
    getProgress(): number;
    getState(): YoutubePlayerState;
    getCurrentTime(): number;

    destroy(): void;

    on(event: "timeupdate", callback: (seconds: number) => void): void;
    on(event: "playbackQualityChange", callback: (quality: number) => void): void;
    on(event: "playbackRateChange", callback: (playbackRate: number) => void): void;

    on(event: YoutubePlayerState, callback: () => void): void;

    on(event: "error", callback: (err: Error) => void): void;
    on(event: "unplayable", callback: (videoId: string) => void): void;
  }

  export default YouTubePlayer;
}
