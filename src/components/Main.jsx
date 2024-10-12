import React from 'react';
import dynamic from 'next/dynamic';
import Carousel from './Carousel';
import Curated from './Curated';
import Auto from './Auto';
import Image from 'next/image';
import Head from 'next/head';

// Dynamically import Video and Explore components
const Video = dynamic(() => import('@/components/Video'), { ssr: false });
const Explore = dynamic(() => import('@/components/Explore'), { ssr: false });


function Main({cat,product}) {
  
  return (
    <>
      <Head>
        {/* Preload fonts or other critical resources here if needed */}
        <link rel="preload" href="/path/to/font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <div className='overflow-hidden'>
        <Carousel />
        <div className="cur w-full h-[85vh] mt-4">
          <div className='w-full flex flex-col gap-7 h-full'>
            <div className="first w-[70vw] mx-auto flex flex-col items-center gap-7">
              <h1 className='text-4xl font-bold'>CURATED THIS SEASON</h1>
              <p className='text-[rgb(0,0,0,.4)]'>
                A blend of classic silhouettes and our signature shine, embodied by enigmatic sequins.
              </p>
            </div>
            <Curated cat={cat.items} />
          </div>
        </div>
        <div className='big w-full sm:h-[50vh] md:h-[100vh] mt-8 flex justify-center'>
          <Image
            src="https://cdn.pixelbin.io/v2/black-bread-289bfa/81ub5U/original/manish-cms_images/1712663653HOME_PAGE_revised-_1531x731_VOWS.webp"
            width={1400}
            height={1900}
            alt="Home Page"
            className='shadow-[0px_0px_30px_5px_rgba(0,0,0,1)]'
            priority // Add priority to important images
          />
        </div>
        <div className='big w-full sm:h-[50vh] md:h-[83vh] sm:flex sm:flex-row sm:items-center mt-16 sm:mt-10 flex flex-col sm:gap-20 xl:gap-0 gap-7'>
          <div className='h-full w-[34%] sm:w-[23%] flex justify-center items-center'>
            <h1 className='text-[#795a3a] font-normal text-4xl w-28 sm:w-12 whitespace-nowrap sm:whitespace-normal'>Experience More</h1>
          </div>
          <div className='slider h-full sm:w-[77%] sm:flex grid grid-cols-2 sm:overflow-x-auto sm:overflow-y-hidden gap-10'>        
             {cat.items.map((item) => (
              <Video key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className="auto w-full sm:h-[40vh] xl:h-[78vh] mt-7">
          <div className="w-full h-full flex flex-col gap-9">
            <h1 className="text-2xl text-center">IN MM</h1>
            <Auto auto={product} />
          </div>
        </div>
        <div className="vid w-[full] h-[85vh] md:mt-8 mt-14 md:flex md:flex-row flex flex-col ">
          <Explore />
        </div>
        <div className="vid w-[full] h-[100vh] md:mt-14 sm:mt-16">
          <video
            src='https://admin.manishmalhotra.in/videos/couture_processd.mp4'
            className="w-full h-[100vh] object-cover"
            controls
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </>
  );
}

export default Main;