"use client";

import { useState, useRef, useEffect } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

const VideoPlayer = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      const handleLoad = () => setIsLoading(false); // Hide loading once video is ready
      videoRef.current.addEventListener("loadeddata", handleLoad);
      return () => {
        videoRef.current?.removeEventListener("loadeddata", handleLoad);
      };
    } else {
      setIsLoading(false); // If videoRef is null, stop loading
    }
  }, [videoRef]);

  const handlePlay = () => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing the video:", error);
        setIsLoading(false);
      });
    }
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
        <video ref={videoRef} className="w-full rounded-lg shadow-lg" autoPlay>
          <source src="/sampleVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
