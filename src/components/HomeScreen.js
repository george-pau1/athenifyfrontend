import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css'; // Ensure this CSS file exists for styles

const HomeScreen = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [subText, setSubText] = useState('');
  
  // Updated fullText as an array to represent each line
  const fullTextArray = ['Decode. Study.', 'Go Viral.'];

  const fullSubText = 'athenify.ai'; // Subtext for typing effect

  const goToUsernameForm = () => {
    navigate('/username-form');
  };

  useEffect(() => {
    let mainTextIndex = 0;
    let charIndex = 0;
    let subTextIndex = 0;
    let displayText = ''; // Track current display text

    // Typewriter effect for main heading
    const typeMainText = () => {
      if (mainTextIndex < fullTextArray.length) {
        const currentLine = fullTextArray[mainTextIndex];
        if (charIndex < currentLine.length) {
          displayText += currentLine[charIndex]; // Append each character to displayText
          setText(displayText);
          charIndex++;
          setTimeout(typeMainText, 100); // Delay between characters
        } else {
          // Move to the next line
          displayText += '\n'; // Add line break after each sentence
          mainTextIndex++;
          charIndex = 0;
          setTimeout(typeMainText, 500); // Delay between lines
        }
      } else {
        // Start typing the subtext once main text is done
        typeSubText();
      }
    };

    // Typewriter effect for subheading (athenify.ai)
    const typeSubText = () => {
      if (subTextIndex < fullSubText.length) {
        setSubText(fullSubText.slice(0, subTextIndex + 1)); // Use slice to prevent undefined
        subTextIndex++;
        setTimeout(typeSubText, 100); // Delay between characters
      }
    };

    typeMainText(); // Start typing the main text on component mount
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={require('./finhomescreen.mov')}
        autoPlay
        loop
        muted
        playsInline // Ensures autoplay works on iOS
      ></video>

      {/* Particle animation */}
      <div className="particle-container"></div>

      {/* Overlay content with glassmorphism */}
      <div className="relative z-10 flex flex-col justify-center items-center h-screen glassmorphism">
        <div className="bg-black bg-opacity-0 p-6 rounded-lg text-center">
          {/* Typewriter effect for heading */}
          <h1 className="text-8xl text-white mb-6 neon-text whitespace-pre-line">
            {text}
          </h1>

          {/* Subtext (athenify.ai) */}
          <p className="text-white text-3xl mb-8 neon-text-lg fade-in">
            {subText}
          </p>
        </div>
        <button
          className="mt-6 py-4 px-8 lightning-button text-white font-semibold rounded-lg shadow-lg transform transition-all duration-500 hover:scale-125 hover:shadow-lightning hover:bg-white hover:text-blue-900"
          onClick={goToUsernameForm}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
