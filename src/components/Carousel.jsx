"use client"; // Ensure this component runs on the client side
import Image from 'next/image';
import { useState,useCallback,useEffect } from 'react';

function Carousel() {
  const images = [
    {
      src: 'https://images.pexels.com/photos/12430012/pexels-photo-12430012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      width: 2000,
      height: 700, // Adjusted height according to the aspect ratio
    },
    {
      src: 'https://images.pexels.com/photos/14952771/pexels-photo-14952771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      width: 2000,
      height: 700, // Adjusted height according to the aspect ratio
    },
    {
      src: 'https://images.pexels.com/photos/25288421/pexels-photo-25288421/free-photo-of-model-in-blue-dress-with-black-scarf-on-her-shoulder.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1650',
      width: 2000,
      height: 700, // Adjusted height according to the aspect ratio
    },
    {
      src:'https://images.pexels.com/photos/25913159/pexels-photo-25913159/free-photo-of-elegant-man-wearing-flat-cap.jpeg?auto=compress&cs=tinysrgb&w=1260',
      width: 2000,
      height: 700, // Adjusted height according to the aspect ratio
    },
    {
      src: 'https://images.pexels.com/photos/27065133/pexels-photo-27065133/free-photo-of-a-bearded-man-posing-in-a-patterned-shirt-and-a-hat.jpeg?auto=compress&cs=tinysrgb&w=1260',
      width: 2000,
      height: 700, // Adjusted height according to the aspect ratio
    },
    {
      src: 'https://images.pexels.com/photos/28517481/pexels-photo-28517481/free-photo-of-elegant-woman-in-vibrant-blue-saree-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      width: 2000, // Correct width for this image
      height: 700,  // Correct height for this image
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

 
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);


  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically change images
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [handleNext]);

  return (
    <div className="relative w-full mx-auto  top-0">
      <div className="overflow-hidden relative rounded-lg w-full">
        <div
          className="flex transition-transform duration-100 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex) * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Image
                src={image.src}
                className="w-full h-[99vh] object-cover"
                alt={`Slide ${index + 1}`}
                width={image.width}  // Use the specified width
                height={image.height} // Use the specified height
                priority // Optional: If you want to preload the first image
              />
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 hover:bg-opacity-75 rounded-full"
      >
        &#8592;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 hover:bg-opacity-75 rounded-full"
      >
        &#8594;
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
