"use client";
import React, { useRef, useEffect } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ playState, setPlayState }) => {
  const player = useRef(null);
  const videoRef = useRef(null);

  const closePlayer = (e) => {
    if (e.target === player.current) {
      setPlayState(false);
    }
  };

  useEffect(() => {
    if (playState) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playState]);

  return (
    <div
      className={`video-player ${playState ? "" : "hide"}`}
      ref={player}
      onClick={closePlayer}
    >
      <video ref={videoRef} src="/vids/ar.mp4" autoPlay muted controls />
    </div>
  );
};

export default VideoPlayer;
