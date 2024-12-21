"use client";

import React from "react";

export default function RotatingSlogan() {
    const slogan = "The best food, delivered fresh every time!"; // Your slogan text

    // Create an array of characters (each span will represent one character in the slogan)
    const characters = slogan.split("");
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="circle-container">
          {/* Center Content: You can replace this with an image or logo */}
          <div className="circle-center">
            <img src="/img/logo.jpg" alt="Logo" className="logo" />
          </div>
  
          {/* Rotating Circle with Slogan Text */}
          <div className="circle-text">
            {characters.map((char, index) => {
              const angle = (360 / characters.length) * index; // Angle for each character to fit evenly in the circle
              return (
                <span
                  key={index}
                  style={{
                    transform: `rotate(${angle}deg) translateY(-110px)`, // Rotate and position each character
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
}
