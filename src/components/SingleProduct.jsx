'use client'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect} from 'react';
import { useRef } from 'react';
import StraightenIcon from '@mui/icons-material/Straighten';
import SizeChart from './SizeChart';
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';
import { usePathname, useSearchParams } from 'next/navigation';

function SingleProduct({product}) {
  
      const wixClient = useWixClient();
    const [currentIndex, setCurrentIndex] = useState(0); // For image carousel
    const [selectedColorIndex,setSelectedColorIndex]=useState(0)
    const [selectedVariant, setSelectedVariant] = useState(null); // Selected variant
    const [quantity, setQuantity] = useState(1); // Product quantity
    const [selectedSize, setSelectedSize] = useState('S'); // Selected size
    const [expandedSections, setExpandedSections] = useState({}); // For disclaimer
    const carouselRef = useRef(null);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('women');
    const [color,setColor]=useState('')
    const { addItem, isLoading } = useCartStore();

    const saveProductToLocalStorage = (product) => {
      const existingProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
      // Add the product if it's not already in the list
      if (!existingProducts.find(p => p.numericId === product.numericId)) {
        existingProducts.push(product);
  
        // Keep only the last 10 viewed products
        if (existingProducts.length > 10) {
          existingProducts.shift(); // Remove the oldest viewed product
        }
  
        localStorage.setItem('recentlyViewed', JSON.stringify(existingProducts));
      }
    };
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        saveProductToLocalStorage(product);
      }
    }, [product]); 

    const handleScroll = () => {
      const carouselElement = carouselRef.current;
      const scrollTop = carouselElement.scrollTop;
      const itemHeight =  63;// Adjust this height based on your image height
  
      // Calculate the index based on the scroll position and the image height
      const newIndex = Math.floor(scrollTop / itemHeight);
      // console.log("scrollTop:", scrollTop, "itemHeight:", itemHeight, "newIndex:", newIndex);
  
      // Only update if the index has changed
      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < product?.media?.items.length
      ) {
        setCurrentIndex(newIndex);
      }
    };
    const pathname = usePathname();;
    console.log("searchParams",pathname)

    const handleShareToWhatsApp = () => {
      if (product) {
          const message = `Check out this product: ${product.name}!\nlocalhost:3000/${pathname}`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank');
      }
  };


    
    const updateSelectedVariant = () => {
        // Check if selectedColor and selectedSize exist, then find the corresponding variant
        if (color && selectedSize) {
            const variant = product.variants.find(variant => 
                variant?.choices?.Color === color && variant?.choices?.Size === selectedSize
            );
            setSelectedVariant(variant || product.variants[0]); // Fallback to first variant if none found
        } else {
            setSelectedVariant(product.variants[0]); // Default to first variant if nothing is selected
        }
    };

      const toggleSection = (index) => {
        setExpandedSections((prevState) => ({
          ...prevState,
          [index]: !prevState[index], // Toggle the specific section
        }));
      };
      const handleColorChange = (e) => {
        const variantIndex = parseInt(e.target.value);
        setSelectedColorIndex(variantIndex);
        setColor(product?.productOptions[0]?.choices[variantIndex].description)
        setCurrentIndex(variantIndex+1); // Update carousel to match variant
      };
      const addToCart = async () => {
        if (!selectedVariant) {
            console.error("No variant selected!");
            return; // Exit if no variant is selected
        }
        const productId=product._id
        const variantId=selectedVariant._id

        addItem(wixClient, productId, variantId, quantity)
    };
      
      useEffect(() => {
        console.log("Selected Color updated:", color);
        console.log("Selected size updated:", selectedSize);
        console.log("Selected variant",selectedVariant)
        
        updateSelectedVariant()
      }, [color,selectedSize,selectedColorIndex,selectedVariant,updateSelectedVariant]);

    const toggleSizeGuide = () => {
        setIsSizeGuideOpen(!isSizeGuideOpen);
      };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* static image */}
    <div className='w-full md:h-[600px] flex items-center justify-center'>
<Image src={product?.media?.items[currentIndex]?.image?.url} alt='' width={270} height={370}/>
    </div>
      {/* Vertical Image Carousel */}
      <div className="relative w-full md:h-[700px] overflow-y-scroll rounded-lg shadow-lg" onScroll={handleScroll}
          ref={carouselRef}>
        <div
          className="h-full flex flex-col gap-5"
          
           // Adjust based on the height of images
        >
          {product?.media?.items?.map((variant, index) => (
            <Image
              key={index}
              src={variant?.image?.url}
              alt={`Slide ${index + 1}`}
              className="w-full  object-contain rounded-lg"
              width={200}
              height={270}
              
            />
          ))}
        </div>

      </div>

      {/* Product Details Section */}
      <div className="flex flex-col bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-[#795a3a] tracking-wide mb-2">{product?.name}</h1>
        <p className="text-xl text-[#ad905e]  font-semibold mb-4">INR&nbsp;{product?.price?.price}</p>
        <p className="text-gray-600 mb-8">{product?.description}</p>


         <div className='flex justify-between'>
        {/* Variant Selection */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">Select Color:</label>
          <select
            value={selectedColorIndex}
            onChange={handleColorChange}
            className="mt-1 block sm:w-[15vw] border border-gray-300 rounded-md p-2 transition duration-200 focus:ring-2 focus:ring-blue-500"
          >
         
            {product?.productOptions[0]?.choices?.map((variant, index) => (
              <option key={index} value={index}>{variant?.description}</option>
            ))}
          </select>
        </div>
        {/* Quantity Selection */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
         </div>

        {/* Size Selector Dropdown */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">Select Size:</label>
          <select
            value={selectedSize}
            onChange={(e) =>( setSelectedSize(e.target.value),console.log("size",selectedSize))}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 transition duration-200 focus:ring-2 focus:ring-blue-500"
          >
          
          {product?.productOptions[1]?.choices?.map((size,index)=>(
            <option value={size.value} key={size.value}>{size.value}</option>
          ))}
          </select>
        </div>
  <button className='text-[#ad905e] text-lg flex gap-2' onClick={toggleSizeGuide}><span><StraightenIcon/></span>See Size Chart</button>
        

  {isSizeGuideOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Size Guide</h2>
            <div className="flex justify-around mb-4">
              <button
                className={`py-2 px-4 font-bold ${selectedTab === 'women' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                onClick={() => setSelectedTab('women')}
              >
                Women
              </button>
              <button
                className={`py-2 px-4 font-bold ${selectedTab === 'men' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                onClick={() => setSelectedTab('men')}
              >
                Men
              </button>
            </div>

            {/* Pass the size chart here */}
            <SizeChart selectedTab={selectedTab} />

            <div className="mt-6 text-right">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
                onClick={toggleSizeGuide}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-6"
        >
          Add to Cart
        </button>
        <button
          onClick={handleShareToWhatsApp}
          className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-6"
        >
          Share To Whatsapp
        </button>
    {/* Additional Product Information */}
    <div className="mt-10 space-y-4">
      {/* Product Details */}
      {product?.additionalInfoSections?.map((info,index)=>(
        <div key={info?.title}>
              <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleSection(index)}>
                {info?.title} {expandedSections[index] ? '-' : '+'}
              </h2>
              {expandedSections[index] && <p className="mt-2 text-gray-600">{info?.description}</p>}
            </div>
      ))}

      
    </div>
      </div>
    </div>
  )
}

export default SingleProduct
