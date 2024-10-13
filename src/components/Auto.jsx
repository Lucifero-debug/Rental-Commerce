"use client"; // Ensure this component runs on the client side
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';

function Auto({ auto }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useRef(false); // Track if the component is in view

  const scrollToActiveElement = useCallback(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.children[activeIndex];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [activeIndex]);

  // Set up the intersection observer to track when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView.current = true; // Component is in view
          } else {
            isInView.current = false; // Component is out of view
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = containerRef.current; // Save the current ref
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Change active index and scroll only if the component is in view
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInView.current) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % auto.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [auto]);

  useEffect(() => {
    if (isInView.current) {
      scrollToActiveElement();
    }
  }, [activeIndex, scrollToActiveElement]);

  return (
    <div
      className="img flex w-full md:w-full justify-start gap-4 overflow-x-auto sm:overflow-x-hidden overflow-y-hidden h-[90vh] md:h-[69vh]"
      ref={containerRef}
    >
      {auto.map((item, index) => (
        <Link
          key={item._id}
          href={'/list?cat=gown'}
          className={`relative h-[45vh] md:h-full w-[69vw] md:w-[25%] cursor-pointer transition-transform duration-400 ease-in-out shadow-[20px_10px_30px_rgba(121,90,58,1)] ${activeIndex === index ? 'scale-100 sm:scale-100' : 'scale-75 sm:scale-75'} flex-shrink-0`}
        >
          <Image
            alt={item.name}
            src={item.media.mainMedia.image.url}
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
