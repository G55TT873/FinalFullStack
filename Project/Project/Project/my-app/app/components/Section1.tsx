import React from 'react'
import Divide from './Divide'
import ThreeImagesWithTitles from './ThreeImages'
import Scroll from './Scroll'
import RotatingSlogan from './RotatingSlogan'
const Section1 = () => {
  return (
    <div  className="bg-MyYellow h-101">
      <div><Divide/></div>
      

      <div className="mt-20 mb-20 items-center justify-center text-center content-center text-4xl  font-serif text-green-600">
        <h1 className="text-4xl"> Our tacos</h1>
        <p className="text-2xl w-51 text-center items-center justify-center ml-96 mt-7">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis magnam, bea</p>
      </div>
    <Scroll/>
      <div>
      <ThreeImagesWithTitles
        items={[
          { image: "/img/taco First.jpg", title: "Image 1" },
          { image: "/img/taco.jpg", title: "Image 2" },
          { image: "/img/taco First.jpg", title: "Image 3" },
        ]}
      />
        
      </div>
      <div className="-mt-20 items-center justify-center text-center content-center font-serif text-green-600 ">
        <RotatingSlogan/>
        <h1 className="text-4xl -mt-32"> Our tacos</h1>
        <p className="text-2xl w-51 text-center items-center justify-center ml-96 mt-7">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis magnam, beatae, saepe expedita, eveniet tempora nihil doloribus </p>
        <button className="btn btn-primary bg-white w-40 h-12 rounded-lg mt-10">Learn More</button>
      </div>


    </div>
  )
}

export default Section1
