import Card from '@/components/Card';
import React from 'react';
import { wixClientServer } from "@/lib/wixClientServer";
import Filter from '@/components/Filter';

async function Page({ searchParams }) {

  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  const productsQuery = await wixClient.products.queryProducts()
  .eq("collectionIds", cat.collection._id) // Filter by collection ID
  .gt("priceData.price", searchParams?.min || 0)
  .startsWith("name", searchParams?.name || "")
  .lt("priceData.price", searchParams?.max || 999999)
  .hasSome(
    "productType",
    searchParams?.type ? [searchParams.type] : ["physical", "digital"]
  )
  .find();

const product=productsQuery.items 

  return (
    <div className='mt-48 md:mt-48 lg:mt-36 min-h-[100vh] flex flex-col items-center w-[full] gap-7'>
      <h1 className='text-3xl'>COUTURE-{cat?.collection?.name}</h1>
      <Filter/>
      <div className="prod grid grid-cols-1 md:grid md:grid-cols-3 gap-4 md:w-[80vw] w-full">
      {product.map((item)=>(
        <Card key={item.slug} product={item}/>
      ))}
      </div>
    </div>
  );
}

export default Page;
