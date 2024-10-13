"use client"; // Ensure this component runs on the client side
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

function Auto({ auto }) {
  const [activeIndex, setActiveIndex] = useState(0); // Start from the first image

  const containerRef = useRef(null); // Reference to the container

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % auto.length);
    }, 4000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [auto]);

  useEffect(() => {
    if (containerRef.current ) {
      const activeElement = containerRef.current.children[activeIndex];
console.log("active is:",activeElement)
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center', // Center the active element
          block: 'nearest',
        });
      }
    }
  }, [activeIndex]); // Scroll when activeIndex changes

 


  return (
    <div className="img flex w-full md:w-full justify-start gap-4 overflow-x-scroll sm:overflow-x-hidden overflow-y-hidden h-[90vh] md:h-[69vh]" ref={containerRef}>
      {auto.map((item, index) => (
        <Link key={item._id} href={'/list?cat=gown'} className={`relative h-[45vh] md:h-full w-[69vw] md:w-[25%] cursor-pointer transition-transform duration-400 ease-in-out shadow-[20px_10px_30px_rgba(121,90,58,1)] ${activeIndex === index ? 'scale-100 sm:scale-100' : 'scale-75 sm:scale-75'} flex-shrink-0`}> 
        <Image
          alt={item.name} // Optional: Use the product name for better accessibility
          src={item.media.mainMedia.image.url} // Adjust this path based on your product structure
        layout='fill'
        objectFit='cover'
        />
        <h1>hello</h1>
        </Link>
      ))}
    </div>
  );
}

export default Auto;
