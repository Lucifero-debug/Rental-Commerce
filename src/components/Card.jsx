'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';

function Card({ product }) {
  return (
    <Link
      href={"/" + product.numericId}
      className='flex flex-col items-center cursor-pointer max-w-[300px] max-h-[400px] overflow-hidden'
    >
      {/* Ensure Image maintains aspect ratio and doesn't overflow */}
      <Image
        alt=''
        src={product.media.mainMedia.image.url}
        width={250}
        height={270}
        className="w-full h-auto object-cover" // Ensure the image covers its container without stretching
      />
      <p className='text-gray-300 text-center font-medium'>COUTURE</p>
      <h1 className='font-bold text-lg overflow-hidden text-ellipsis'>{product.name}</h1>
      <p className='text-[#79583a] text-center font-bold'>INR {product.price.price}</p>
    </Link>
  )
}

export default Card;
