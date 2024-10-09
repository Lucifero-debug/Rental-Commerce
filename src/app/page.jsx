import React from 'react';
import { wixClientServer } from "@/lib/wixClientServer";
import Main from '@/components/Main';

async function Home() {

  const wixClient = await wixClientServer();

  const [cat, collectionsQuery] = await Promise.all([
    wixClient.collections.queryCollections().find(),
    wixClient.collections.queryCollections().eq("name", 'gown').find()
  ]);

  if (collectionsQuery.items.length === 0) {
    return <div>No collection found</div>;
  }

  const collectionId = collectionsQuery.items[0]._id;
  const productsQuery = await wixClient.products.queryProducts()
    .eq("collectionIds", collectionId)
    .limit(4)
    .find();

  const product = productsQuery.items;

  return (
    <>
     <Main cat={cat} product={product}/>
    </>
  );
}

export default Home;