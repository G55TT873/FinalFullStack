import React from "react";

const ThreeImagesWithTitles = ({ items = [] }) => {
  if (items.length === 0) {
    return <p className="text-center text-red-500">No items to display.</p>;
  }

  return (
    <div className="flex justify-between items-center w-full px-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center mx-12"
        >
          <div className="w-same h-same rounded-full overflow-hidden shadow-lg">
            <img
              src={item.image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
          </div>
          <p className="mt-4 text-center text-4xl font-semibold font-serif text-green-600 ">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ThreeImagesWithTitles;
