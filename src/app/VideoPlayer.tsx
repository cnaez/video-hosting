"use client";

import { useState, useRef, useEffect } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

const VideoPlayer = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const handleLoad = () => setIsLoading(false);
      videoRef.current.addEventListener("loadeddata", handleLoad);
      return () => {
        videoRef.current?.removeEventListener("loadeddata", handleLoad);
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  const handlePlay = () => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing the video:", error);
        setIsLoading(false);
      });
    }
  };

  const handleEnd = () => {
    setShowVideo(false);
  };

  return (
    <div className="max-w-7xl relative">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80">
          <ImSpinner2 size={60} className="animate-spin text-white" />
        </div>
      )}
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
              size={80}
              className="text-white transition-transform transform hover:scale-105"
            />
          </button>
        </div>
      ) : (
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full rounded-lg shadow-lg landscape-video"
            autoPlay
            onEnded={handleEnd}
          >
            <source src="/sampleVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
