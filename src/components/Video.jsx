import React from 'react'
import { wixClientServer } from "@/lib/wixClientServer";
import Link from 'next/link';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function Video({item}) {
    const wixClient=await wixClientServer()
const productsQuery = await wixClient.products.queryProducts()
  .eq("collectionIds", item?._id) // Filter by collection ID
  .find();

const product=productsQuery.items
const selectedProduct=product[getRandomInt(0,(product.length)-1)]
const video=selectedProduct?.media?.items.find(media=>media.mediaType=='video') 

  return (
    <div className='flex justify-center items-center sm:w-[24vw] h-full '>
   {video?( <Link href={`/scroll?cat=${item.name}`} >
       <video src={video?.video?.files[1]?.url} autoPlay loop muted className=' w-full h-[66vh] object-cover cursor-pointer'/>
       <h1 className='font-semibold'>{selectedProduct.name}</h1>
    </Link>):(
        <p>Loading...</p> // Fallback while loading video data
      )}
    </div>
  )
}

export default Video
