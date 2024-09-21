// src/components/LoadingScreen.js
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-75 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
        <svg
          className="w-24 h-24 text-gray-900 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a7 7 0 00-5.197 11.832l-1.473 1.473a1 1 0 101.414 1.414l1.473-1.473A7 7 0 1010 2zm0 12a5 5 0 110-10 5 5 0 010 10z"></path>
        </svg>
      </div>
      <p className="mt-4 text-2xl font-semibold">Mimicking Video Success{dots}</p>
    </div>
  );
};

export default LoadingScreen;
