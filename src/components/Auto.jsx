"use client"; // Ensure this component runs on the client side
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function Auto({ auto }) {
  const [activeIndex, setActiveIndex] = useState(0); // Start from the first image

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % auto.length); // Cycle through images based on product length
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [auto]); // Add product length as a dependency

  return (
    <div className="img flex w-full justify-center gap-4">
      {auto.map((item, index) => (
        <Link key={item._id} href={'/list?cat=gown'}> 
        <Image
          alt={item.name} // Optional: Use the product name for better accessibility
          src={item.media.mainMedia.image.url} // Adjust this path based on your product structure
          className={`w-[34vw] overflow-x-scroll sm:overflow-x-hidden sm:w-[24vw] cursor-pointer transition-transform duration-700 ease-in-out shadow-[20px_10px_30px_rgba(121,90,58,1)] ${activeIndex === index ? 'scale-125 sm:scale-110 translate-x-4' : 'scale-100 sm:scale-75'}`}
          width={370}
          height={670}
        />
        </Link>
      ))}
    </div>
  );
}

export default Auto;
