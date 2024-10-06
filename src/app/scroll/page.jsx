import Reel from '@/components/Reel';
import React from 'react'
import { wixClientServer } from "@/lib/wixClientServer";


async function Page({searchParams}) {
  
  const wixClient = await wixClientServer();
  
  const collectionsQuery = await wixClient.collections.queryCollections()
  .eq("name", (searchParams.cat)) // Replace with the actual collection name
  .find();
  
  // console.log("jail",cat)
  const productsQuery = await wixClient.products.queryProducts()
  .eq("collectionIds",collectionsQuery.items[0]._id) // Filter by collection ID
  .find();
  const product=productsQuery.items 
  // console.log("tujhe",productsQuery.items)
  


  return (
    <div className='w-full h-full overflow-y-hidden'>
     <Reel product={productsQuery.items}/>
    </div>
  )
}

export default Page;
