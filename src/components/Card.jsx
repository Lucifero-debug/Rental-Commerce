'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';

function Card({ product }) {
  return (
    <Link
      href={"/" + product.numericId}
      className='flex flex-col items-center cursor-pointer w-full md:w-[26vw] h-[75vh]  overflow-hidden'
    >
      {/* Ensure Image maintains aspect ratio and doesn't overflow */}
      <div className='border-4 relative w-full h-[88%]'>
      <Image
        alt=''
        src={product.media.mainMedia.image.url}
       layout='fill'
        className="w-full h-auto object-cover" // Ensure the image covers its container without stretching
      />
      </div>
      <p className='text-gray-300 text-center font-medium'>COUTURE</p>
      <h1 className='font-bold text-lg overflow-hidden text-ellipsis'>{product.name}</h1>
      <p className='text-[#79583a] text-center font-bold'>INR {product.price.price}</p>
    </Link>
  )
}

export default Card;
