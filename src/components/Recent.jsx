'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Recent() {
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewedProducts(fetchedProducts);
        console.log("recent", fetchedProducts);
    }, []);

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">Recently Viewed</h2>
            <div className="flex flex-row gap-6 mt-6 w-full overflow-x-auto overflow-y-hidden lg:overflow-x-hidden">
                {recentlyViewedProducts.slice(0, 5).map((product, index) => (
                    <Link href={'/' + product.numericId} key={index} className="bg-white rounded-lg shadow-lg p-4 flex-shrink-0 w-full lg:w-[25%] relative h-[68vh]">
                        <div className='w-full h-[87%] relative'>
                            <Image
                                src={product.media.mainMedia.image.url}
                                alt={product.name}
                                className="object-cover rounded-t-lg"
                                layout='fill'
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h3>
                        <p className="text-blue-500 font-semibold">&#8377;{product.price.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Recent;
