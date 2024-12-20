// components/ParallaxSection.js

import Carousel from "../Components/Carousel";


const ParallaxSection = () => {
    return (
      <><div className="relative overflow-hidden h-screen">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transform"
          style={{
            backgroundImage: `url('img/taco.jpg')`,
            zIndex: -1,
          }}
          id="parallax-bg"
        ></div>

        
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Your Content Here
          </h1>
        </div>
      </div>
      
        <div className="ml-16">
        <Carousel/>
        </div>
        </>
      
    );
  };
  
  export default ParallaxSection;
  