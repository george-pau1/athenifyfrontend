import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

const ApiHandler = ({ specificUsername, niche, level, onResults, maxFollowerCount, numVideos}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleApiRequests = async () => {
      setLoading(true);

      const payload1 = {
        username: specificUsername,
      };

      const payload = {
        username: specificUsername,
        niche: niche,
        level: level,
      };

      try {
        // Zeroth API request
        const response0 = await fetch('api1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload1),
        });
        const data0 = await response0.json();
        console.log('API 0 Success:', data0);

        // First API request
        const response1 = await fetch('api2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload1),
        });
        const data1 = await response1.json();
        console.log('API 1 Success:', data1);

        const usernamesArray = data1.data; 
        const payload2 = {
          usernames: usernamesArray,
          niche: niche,
          level: level,
          followercount: '500000',
        };
        
        // Second API request
        const response2 = await fetch('api3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload2),
        });
        const data2 = await response2.json();
        console.log('API 2 Success:', data2);

        const usernamesArrayapicall3 = data2.successful_usernames;
        const payload3 = {
          api_key: '',
          usernames: usernamesArrayapicall3,
          bucket_name: 'instascraper'
        };

        // Third API request
        const response3 = await fetch('api4', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload3),
        });
        const data3 = await response3.json();
        console.log('API 3 Success:', data3);

        // Fourth API request
        const response4 = await fetch('api5', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload3),
        });
        const data4 = await response4.json();
        console.log('API 4 Success:', data4);

        const payload5 = {
            api_key: '',
            usernames: usernamesArrayapicall3,
            bucket_name: 'instascraper',
            X: "10" //Get the top 15 videos // Have this as a input for the user
          };

        // Fifth API request
        const response5 = await fetch('api6', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload5),
        });
        const data5 = await response5.json();
        console.log('API 5 Success:', data5);

        // Assuming `data5.data` contains the video data to be showcased
        const videos = data5.data;
        onResults(videos); // Pass the videos to the parent component for rendering

      } catch (error) {
        console.error('Error with API requests:', error);
      } finally {
        setLoading(false);
      }
    };

    handleApiRequests();
  }, [specificUsername, niche, level, onResults]);

  if (loading) {
    return <LoadingScreen />;
  }

  return null;
};

export default ApiHandler;
