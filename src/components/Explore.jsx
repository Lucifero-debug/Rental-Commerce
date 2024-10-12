'use client';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

function Explore() {
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value to trigger animation earlier/later
      }
    );

    // Create local variables to store the current ref values
    const leftDivCurrent = leftDivRef.current;
    const rightDivCurrent = rightDivRef.current;

    if (leftDivCurrent) observer.observe(leftDivCurrent);
    if (rightDivCurrent) observer.observe(rightDivCurrent);

    return () => {
      if (leftDivCurrent) observer.unobserve(leftDivCurrent);
      if (rightDivCurrent) observer.unobserve(rightDivCurrent);
    };
  }, []);

  return (
    <>
      <Link
        href={'/list?cat=legowns-special'}
        ref={leftDivRef}
        className='md:w-[50%] w-[50%] cursor-pointer text-white md:h-full h-[85%] bg-[url("https://www.styleglow.com/wp-content/uploads/2018/04/Printed-Blue-Sherwani-Design-for-Barat-1031x1547.jpg")] bg-cover flex flex-col justify-end items-center pb-4 sm:pb-20 sm:gap-5 font-prag explore-div-left'
      >
        <h1 className='font-normal text-2xl sm:text-4xl'>NEW MAN</h1>
        <button className='border-4 border-white bg-transparent w-24 h-8 sm:w-36 sm:h-14 text-sm sm:text-lg'>Explore Now</button>
      </Link>
      <Link
        href={'/list?cat=legowns-special'}
        ref={rightDivRef}
        className='md:w-[50%] w-[50%] cursor-pointer text-white md:h-full h-[85%] bg-[url("https://www.styleglow.com/wp-content/uploads/2020/02/Sapphire-Eid-Unstitiched-dresess.jpg")] bg-cover flex flex-col justify-end items-center pb-4 sm:pb-20 sm:gap-5 font-prag explore-div-right'
      >
        <h1 className='font-normal text-2xl sm:text-4xl'>Accesories</h1>
        <button className='border-4 border-white bg-transparent w-24 h-8 sm:w-36 sm:h-14 text-sm sm:text-lg'>Explore Now</button>
      </Link>
    </>
  );
}

export default Explore;
