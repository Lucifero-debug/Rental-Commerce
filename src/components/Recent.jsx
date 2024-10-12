'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React,{useEffect,useState} from 'react';

// Sample Recently Viewed Products Data


function Recent() {
    
    
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
    const router=useRouter()
    
    useEffect(() => {
        const fetchedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewedProducts(fetchedProducts);
        console.log("recent",fetchedProducts)
    }, []);

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">Recently Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {recentlyViewedProducts.slice(0, 4).map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                        <Image
                            src={product.media.mainMedia.image.url}
                            alt={product.name}
                            className=" object-cover rounded-t-lg w-full h-auto md:h-[200px]" // Image dimensions
                            width={200}
                            height={200}
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h3>
                        <p className="text-blue-500 font-semibold">&#8377;{product.price.price}</p>
                        <button className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={()=>router.push('/'+product.numericId)}>View</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recent;
