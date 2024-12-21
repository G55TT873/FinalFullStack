'use client'
import React, { useEffect, useRef } from 'react';

const SmoothParallaxSection = ({ bgImage, title, description, children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = () => {
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Ensure the parallax effect only applies when the section is in the viewport
      if (top < windowHeight && top + height > 0) {
        // Increase the multiplier for faster parallax movement
        const offset = ((windowHeight - top) / (windowHeight + height)) * 150; // Adjusted multiplier (was 50)
        section.style.backgroundPositionY = `${offset}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full bg-center bg-no-repeat bg-cover flex items-center justify-center relative bg-MyYellow"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPositionY: '50%', // Initial position
        transition: 'background-position 0.1s linear', // Add smooth transition for better effect
      }}
    >
      {/* Hero content goes inside here */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>

      {/* Render additional children (hero component, etc.) */}
      <div className="absolute bottom-0 w-full z-10">
        {children}
      </div>
    </div>
  );
};

export default SmoothParallaxSection;
