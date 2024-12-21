import React from "react";

const Hero = ({ image, title, description, buttonText }) => {
  return (
    <div className="hero min-h-screen   pt-20">
      <div className="hero-content flex flex-col lg:flex-row items-center lg:items-start px-6">
        {/* Image */}
        <img
          src={image}
          className="w-100 h-100 rounded-4xl shadow-2xl mb-6 lg:mb-0 lg:mr-8"
          alt="Hero"
        />
        
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-10xl font-serif  mb-4 mt-24 -ml-28 text-blue-800">{title}</h1>
          <p className="py-6 mb-4">{description}</p>
          <button className="btn btn-primary bg-white rounded-3xl w-36 h-16">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
