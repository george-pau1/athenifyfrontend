import React, { useState, useRef, useEffect } from 'react';
import { FaHeart, FaCommentDots, FaPaperPlane, FaEllipsisH, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const VideoCard = ({ video, isActive }) => {

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start with video muted
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // 1.5M
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'; // 652.5K
    }
    return num; // If it's less than 1K, return as is
  };

  // Play the video if it's active
  useEffect(() => {
    console.log("This is the video"+video)
    if (isActive && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  // Handle mute/unmute toggle
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted // This is required for autoplay to work in many browsers
        loop
      >
        <source src={video.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>



      {/* Overlay Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Caption & Username Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
        <div className="mb-2 flex items-center">
          <p className="font-bold text-lg">{video.username}</p>
          {video.account_verified && (
            <span className="ml-2 flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
          )}
        </div>
        <p className="text-sm">{video.caption_text}</p>
        <p className="text-sm">{video.hashtags.join(', ')}</p>
      </div>

      {/* Action Buttons with Shading */}
      <div className="absolute right-4 bottom-[140px] flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center bg-black/15 p-2 rounded-lg">
          <FaHeart className="text-2xl text-white" />  {/* Outlined heart */}
          <p className="text-white">{formatNumber(video.like_count)}</p>  {/* Format likes */}
        </div>
        <div className="flex flex-col items-center bg-black/15 p-2 rounded-lg">
          <FaCommentDots className="text-2xl text-white" />
          <p className="text-white">{formatNumber(video.comment_count)}</p>  {/* Format comments */}
        </div>
        <div className="flex flex-col items-center bg-black/15 p-2 rounded-lg">
          <FaPaperPlane className="text-2xl text-white" />
          <p className="text-white">{formatNumber(video.share_count || 'Share')}</p>  {/* Format shares */}
        </div>
        <div className="flex flex-col items-center bg-black/15 p-2 rounded-lg">
          <FaEllipsisH className="text-2xl text-white" />
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={toggleMute}
          className="text-white bg-black/30 p-2 rounded-full"
        >
          {isMuted ? <FaVolumeMute className="text-2xl" /> : <FaVolumeUp className="text-2xl" />}
        </button>
      </div>

    </div>
  );
};

const VideoList = ({ videos, currentIndex, setCurrentIndex }) => {
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  // Render only the current active video
  return (
    <div className="relative w-full h-screen">
      {/* Adding key={currentIndex} to ensure the VideoCard re-renders when currentIndex changes */}
      <VideoCard key={currentIndex} video={videos[currentIndex]} isActive={true} />

      {/* Previous Button */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4">
        <button onClick={handlePrevious} className="bg-white/30 text-white py-2 px-4 rounded-full">
          Previous
        </button>
      </div>

      {/* Next Button (outside video area) */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4">
        <button onClick={handleNext} className="bg-white/30 text-white py-2 px-4 rounded-full">
          Next
        </button>
      </div>
    </div>
  );
};


export default VideoList;
