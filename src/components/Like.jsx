import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import React from 'react'

const productData = {
    id: 1,
    name: 'Classic Embroidered Bridal Lehenga',
    price: 500,
    description: 'A beautiful embroidered lehenga perfect for weddings and special occasions.',
    details: `This bridal lehenga is handcrafted with intricate embroidery, made from the finest materials.
      The lehenga is perfect for grand occasions such as weddings and celebrations. Available in multiple
      color variants, it ensures a perfect balance of tradition and modern design.`,
    manufacturer: 'Tarun Tahiliani',
    disclaimer: 'Product colors may vary slightly due to lighting.',
    variants: [
      { name: 'Red', price: 500, image: 'https://taruntahiliani.com/cdn/shop/files/380-TT11JUN25403ecopy_95c52c03-e3e5-4632-b9bc-8e1e3081078a_600x.jpg?v=1722327132' },
      { name: 'Blue', price: 550, image: 'https://taruntahiliani.com/cdn/shop/files/380-TT11JUN25403ccopya_8285a286-7b42-43e7-ad2a-bc5803679ff8_600x.jpg?v=1722327132' },
      { name: 'Green', price: 600, image: 'https://taruntahiliani.com/cdn/shop/files/380-TT11JUN25403dacopya_fd1c8db1-c6ca-4723-9086-d36d26ecc612_600x.jpg?v=1722327132' },
    ],
    suggestions: [
      {
        name: 'Elegant Anarkali Dress',
        price: 450,
        image: 'https://taruntahiliani.com/cdn/shop/files/533-TTJANCAT-42042_400x.jpg?v=1706945122',
      },
      {
        name: 'Traditional Saree',
        price: 400,
        image: 'https://taruntahiliani.com/cdn/shop/files/533-TTJANCAT-42042_400x.jpg?v=1706945122',
      },
      {
        name: 'Stylish Floor Length Dress',
        price: 600,
        image: 'https://taruntahiliani.com/cdn/shop/files/533-TTJANCAT-42042_400x.jpg?v=1706945122',
      },
    ],
  };
async function Like({liked}) {
 
  const wixClient = await wixClientServer();

  const productsQuery = await wixClient.products.queryProducts()
  .eq("collectionIds", liked)
  .limit(4)
  .find() 

  console.log("shota",productsQuery.items[0].price.price)

  return (
    <div className="mt-10">
    <h2 className="text-2xl font-semibold text-gray-800">You Might Also Like</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {productsQuery.items.map((suggestion, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-4">
          <Image src={suggestion.media.mainMedia.image.url} alt={suggestion.name} className=" object-cover rounded-t-lg" width={200} height={200}   // Use fill to make it responsive
                objectFit="cover" />
          <h3 className="text-lg font-semibold text-gray-800 mt-2">{suggestion.name}</h3>
          <p className="text-blue-500 font-semibold">&#8377;{suggestion.price.price}</p>
          <button className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-200">View</button>
        </div>
      ))}
    </div>
  </div>

  )
}

export default Like