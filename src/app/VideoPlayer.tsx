// app/VideoPlayer.tsx
"use client"; // Mark this file as a Client Component

import { useState, useRef } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";

const VideoPlayer = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.requestFullscreen(); // Request fullscreen on play
    }
  };

  return (
    <div className="max-w-lg relative">
      {!showVideo ? (
        <div className="relative group">
          <img
            src="/cover.jpg"
            alt="Video Cover"
            className="w-full rounded-lg shadow-lg transition-opacity duration-300 group-hover:opacity-80"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex justify-center items-center"
            aria-label="Play Video"
          >
            <BsFillPlayCircleFill
              size={60}
              className="text-white transition-transform transform hover:scale-105"
            />
          </button>
        </div>
      ) : (
        <video
          ref={videoRef}
          controls
          className="w-full rounded-lg shadow-lg"
          autoPlay
        >
          <source src="/sampleVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
