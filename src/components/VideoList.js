const VideoList = ({ videos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };
  
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };
  
    return (
      <div className="relative w-full h-screen">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            isActive={index === currentIndex} // Pass isActive to the current video
          />
        ))}
  
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
  