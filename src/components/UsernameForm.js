import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './LoadingScreen';
import VideoList from './VideoCards';
import ApiHandler from './ApiHandler';
import { fetchFirstApi, fetchSecondApi, fetchThirdApi } from './api1';
import VideoList2 from './VideoCards-2'

const UsernameForm = () => {
  const [usernames, setUsernames] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState(null); // State to store videos

  const [isVideosReady, setIsVideosReady] = useState(false);

  const [selectedPipeline, setSelectedPipeline] = useState(1); // State to toggle between two pipelines
  const [specificUsername, setSpecificUsername] = useState(''); // State for specific username input
  const [niche, setNiche] = useState(''); // State for niche input
  const [level, setLevel] = useState(5); // State for level input (slider default value)
  const [showApiHandler, setShowApiHandler] = useState(false); // State to toggle ApiHandler
  const [maxFollowerCount, setMaxFollowerCount] = useState(''); // State for max-follower count
  const [numVideos, setNumVideos] = useState(5); // State for number of videos (default to 5)
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);



  const handleChange = (index, event) => {
    const values = [...usernames];
    values[index] = event.target.value;
    setUsernames(values);
  };

  // Function to handle the results from ApiHandler
  const handleApiResults = (resultVideos) => {
    setVideos(resultVideos);
    console.log("This is right before the videos")
    console.log(videos)
    setIsVideosReady(true); // Set the flag to true after setting videos
    setShowApiHandler(false); // Hide ApiHandler after results
  };

  const handleAddField = () => {
    setUsernames([...usernames, '']);
  };

  const handleRemoveField = (index) => {
    const values = [...usernames];
    values.splice(index, 1);
    setUsernames(values);
  };

  const handlePipelineSelect = (pipeline) => {
    setSelectedPipeline(pipeline);
    setVideos(null); // Reset videos when switching pipelines
    setIsVideosReady(false); // Reset the flag when switching pipelines // Might need to take this out
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading screen

    console.log(usernames)

    if (videoRef.current) {
      videoRef.current.pause();  // Pause the background video
    } else {
      console.error('Video ref is not set');
    }

    console.log(videoRef)

    const payload = {
      api_key: 'Change this',
      usernames: usernames,
      bucket_name: 'Change this',
    };

    const payload3 = {
      usernames: usernames,
      X:10
    };

    try {
      const data1 = await fetchFirstApi(payload);
      console.log('Success (First API):', data1);

      const data2 = await fetchSecondApi(payload);
      console.log('Success (Second API):', data2);

      const data3 = await fetchThirdApi(payload3);
      console.log('Success (Third API):', data3);
      setVideos(data3.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videos && isVideosReady) {
      console.log("Videos updated and ready:", videos); // Log the updated videos state
    }
  }, [videos, isVideosReady]); // This will run whenever videos state or readiness flag changes

  if (loading) {
    return <LoadingScreen />;
  }

  // Define a new screen component for Pipeline 2
  const Pipeline2Screen = () => {
    return (
      
      <div className="bg-gradient-to-r from-gray-900 via-gray-875 to-gray-900 p-10 rounded-xl shadow-xl w-full max-w-2xl mx-auto">
        {showApiHandler ? (
          <ApiHandler 
          specificUsername={specificUsername}
          niche={niche}
          level={level}
          maxFollowerCount={maxFollowerCount} // New input
          numVideos={numVideos} // New input
          onResults={handleApiResults}
        />
        
          ) : videos && isVideosReady ? ( // Ensure VideoList renders only if videos are ready
            <>
            {console.log("Videos data:", videos)} {/* This will log the videos data */}
            <VideoList2
            videos={videos}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            />
            </>
          ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-200 mb-6 text-center mb-2">Enter a Single User</h1>
            <p className="text-gray-300 text-lg text-center mb-10">
              Conduct a comprehensive case study on trending reels from a specific niche using our AI.
            </p>

            {/* Input for specific username */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2" htmlFor="specificUsername">
                Specific Username
              </label>
              <input
                type="text"
                id="specificUsername"
                value={specificUsername}
                onChange={(e) => setSpecificUsername(e.target.value)}
                className="w-full py-3 px-8 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-900 transition duration-300 transform hover:scale-105 hover:shadow-2xl placeholder:text-white"
                placeholder="Enter Username"
                required
              />
            </div>


            {/* Input for niche */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2" htmlFor="niche">Niche</label>
              <select
                id="niche"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full py-3 px-8 bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200  rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-900 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <option value="" className="w-full text-black">Select Niche</option>
                <option value="fitness" className="w-full text-black">Fitness</option>
                <option value="self-improvement" className="w-full text-black">Self Improvement</option>
                <option value="beauty" className="w-full text-black">Beauty</option>
                <option value="custom" className="w-full text-black">Custom</option>
              </select>
              {niche === 'custom' && (
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full"
                  placeholder="Enter Custom Niche"
                />
              )}
            </div>

            {/* Slider for level */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2" htmlFor="level">Level: {level}</label>
              <input
                type="range"
                id="level"
                min="1"
                max="10"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-500 to-gray-900"
              />
            </div>

            {/* Input for max-follower count */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2" htmlFor="maxFollowerCount">Max Follower Count</label>
              <input
                type="number"
                id="maxFollowerCount"
                value={maxFollowerCount}
                onChange={(e) => setMaxFollowerCount(e.target.value)}
                className="w-full py-3 px-8 bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200 rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-900 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
                placeholder="Enter Max Follower Count"
                required
              />
            </div>

            {/* Slider for number of videos to showcase */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2" htmlFor="numVideos">Number of Videos: {numVideos}</label>
              <input
                type="range"
                id="numVideos"
                min="5"
                max="30"
                value={numVideos}
                onChange={(e) => setNumVideos(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-500 to-gray-900"
              />
            </div>

            <button
              className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:from-blue-400 hover:to-blue-600 hover:shadow-xl transition duration-300 transform hover:scale-105"
              onClick={() => setShowApiHandler(true)} // Trigger ApiHandler
            >
              Submit
            </button>
            {/* <button
              className="mt-6 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              onClick={() => handlePipelineSelect(1)} // Return to Pipeline 1
            >
              Go Back to Pipeline 1
            </button> */}
          </>
        )}
      </div>
    );
  };

  // Render content based on the selected pipeline
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
  <video
    ref={videoRef} 
    autoPlay 
    loop 
    muted 
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '50%',
      left: '50%',
      objectFit: 'cover',
      transform: 'translate(-50%, -50%)',
      zIndex: '-1',
    }}>
    <source src={require('./finhomescreen.mov')} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-gradient-to-r from-gray-900 via-gray-875 to-gray-900 p-10 rounded-xl shadow-xl w-full max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <button
          className={`py-2 px-4 mr-2 ${selectedPipeline === 1 ? 'bg-blue-900' : 'bg-gray-800'} text-white  rounded-lg`}
          onClick={() => handlePipelineSelect(1)}
        >
          User Tag
        </button>
        <button
          className={`py-2 px-4 ${selectedPipeline === 2 ? 'bg-blue-800' : 'bg-gray-800'} text-white  rounded-lg`}
          onClick={() => handlePipelineSelect(2)}
        >
          Pipeline 2
        </button>
      </div>

      {selectedPipeline === 1 ? (
        videos ? (
          <VideoList videos={videos} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        ) : (
          <>
            <div className="text-center">
  {/* <h2 className="text-5xl font-extrabold tracking-tight text-white mb-2">
    Enter Creator Usernames
  </h2> */}
  <h2 className="text-4xl font-semibold bg-clip-text tracking-tight text-transparent bg-gradient-to-r from-white to-blue-200 mb-4">
  Enter Creator Usernames:
</h2>

  {/* <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
    Maximum flexibility, minimum compliance burden
  </p> */}
</div>



            <form onSubmit={handleSubmit} className="space-y-4">
              {usernames.map((username, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => handleChange(index, event)}
                    className="border border-gray-800 bg-gray-800 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-800 text-gray-200"
                    placeholder={`Username ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="ml-3 text-red-500 hover:text-red-600 transition duration-200"
                    aria-label="Remove"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>


                </div>
              ))}
              <button
                type="button"
                onClick={handleAddField}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-1000 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                Add Another Username
              </button>
              <button 
  type="submit" 
  className="w-full py-3 px-8 bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200 font-bold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-900 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
>
  <span className="flex items-center justify-center space-x-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
    <span>Submit</span>
  </span>
</button>

            </form>
          </>
        )
      ) : (
        <Pipeline2Screen />
      )}
    </div>
    </div>
    </div>
  );
};

export default UsernameForm;
