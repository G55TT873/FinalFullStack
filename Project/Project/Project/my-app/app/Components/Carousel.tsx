'use client'
import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4; // Total number of slides

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides); // Looping through 6 slides
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides); // Looping through 6 slides
  };

  return (
    <><h1 className="text-6xl text-center mt-7"> Our Menu</h1>
    <div className="relative -ml-8 h-101 mt-10">

      {/* Carousel Container */}
      <div className="carousel carousel-center bg-grey-00 rounded-box w-101 p-4 text-white">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {/* Carousel Items with margin between them */}
          <div className="carousel-item mx-4">
            <div className="card bg-MyRed w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Beef Taco</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyDYellow w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Chicken</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyGreen w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Vegetarian</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {/* Carousel Items with margin between them */}
          <div className="carousel-item mx-4">
            <div className="card bg-MyRed w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Beef Taco</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyDYellow w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Chicken</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyGreen w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Vegetarian</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {/* Carousel Items with margin between them */}
          <div className="carousel-item mx-4">
            <div className="card bg-MyRed w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Beef Taco</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyDYellow w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Chicken</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyGreen w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Vegetarian</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {/* Carousel Items with margin between them */}
          <div className="carousel-item mx-4">
            <div className="card bg-MyRed w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Beef Taco</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyDYellow w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Chicken</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="carousel-item mx-4">
            <div className="card bg-MyGreen w-100 shadow-xl h-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-5xl">Vegetarian</h2>
                <div className="w-full h-1 bg-white mt-2"></div>
                <ul className="mt-5 text-4xl space-y-3 list-disc pl-5 leading-[4rem]">
                  <li className="flex items-center ">
                    <span className="mr-3">🍅</span> Fresh Ingredients
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🌱</span> Healthy Options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">🍴</span> Delicious Meals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Carousel Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-MyYellow text-white rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 p-2 bg-MyYellow text-white rounded-full"
      >
        &gt;
      </button>

      {/* Indicator Line */}
      <div className="absolute bottom-0 w-full flex justify-center space-x-2 pb-4">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`} />
        ))}
      </div>
    </div></>
  );
};

export default Carousel;
