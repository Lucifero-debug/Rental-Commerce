'use client'
import React, { useEffect, useState, useRef } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';

function Reel({ product }) {
    const router = useRouter();
    const [currentProduct, setCurrentProduct] = useState(0); // Track which product is in view
    const containerRef = useRef(null); // Reference for scroll container

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = containerRef.current.scrollTop; // Scroll within the container
            const containerHeight = containerRef.current.clientHeight;

            // Calculate which product should be active based on scroll
            const newIndex = Math.min(
                product.length - 1, // Ensure we don't exceed the array length
                Math.round(scrollPosition / containerHeight)
            );
            setCurrentProduct(newIndex);
        };

        document.body.style.overflow = 'hidden';
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [product]);

    const handleBuyNow = () => {
        const currentReel = product[currentProduct];
        if (currentReel) {
            router.push('/' + currentReel.numericId);
        }
    };

    const handleShareToWhatsApp = () => {
        const currentReel = product[currentProduct];
        console.log("curren whatsapp",currentReel)
        if (currentReel) {
            const message = `Check out this product: ${currentReel.name}!\nlocalhost:3000/${currentReel.numericId}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <div
            className='w-full h-screen overflow-y-scroll snap-y snap-mandatory sm:mt-40'
            ref={containerRef}
        >
            {product.map((reel, index) => (
                <div
                    className={`w-[50%] h-screen flex flex-col justify-center items-center snap-start mx-auto ${index === currentProduct ? 'active' : ''}`}
                    key={reel.slug}
                >
                    <video
                        src={reel.media?.items?.find((vid) => vid.mediaType === 'video')?.video?.files[0]?.url}
                        autoPlay
                        loop
                        muted
                        className='w-full h-full object-cover'
                    />
                    <div className='w-full flex justify-center px-4 sm:absolute sm:bottom-7 md:gap-72 sm:gap-0'>
                        <button
                            className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            onClick={handleBuyNow}
                        >
                            <span><ShoppingCartIcon /></span>&nbsp;Buy Now
                        </button>
                        <button className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleShareToWhatsApp}>
                            <span><WhatsAppIcon /></span>&nbsp;Share To WhatsApp
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Reel;
