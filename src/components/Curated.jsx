'use client'
import React,{useEffect} from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';
// import { wixClientServer } from "@/lib/wixClientServer";

function Curated({cat}) {
  const router = useRouter(); 

  const handleSearch=(e)=>{
      router.push(`/list`)
      }

      const saveCategoryToLocalStorage = (cat) => {
        // Retrieve existing categories from local storage or initialize an empty array
        const existingCategories = JSON.parse(localStorage.getItem('category')) || [];
      
        // Iterate through each category in cat.items
        cat.forEach((newCategory) => {
          // Check if the category is already in existing categories
          if (!existingCategories.some(category => category._id === newCategory._id)) {
            existingCategories.push(newCategory); // Add the new category if it's not already present
          }
        });
      
        // Save the updated categories back to local storage
        localStorage.setItem('category', JSON.stringify(existingCategories));
      };

      useEffect(() => {
        if (typeof window !== 'undefined') {
          saveCategoryToLocalStorage(cat);
        }
      }, [cat]); 


  return (
    <>
    <div className="second grid grid-cols-2 md:flex w-full h-full  gap-2">
     {cat.map((slides)=>(
 <Link href={`/list?cat=${slides.slug}`} key={slides._id} className="img md:w-[25vw] md:h-full h-full cursor-pointer flex items-end justify-center bg-cover" onClick={handleSearch}  style={{ backgroundImage: `url(${slides.media.mainMedia.image.url})`}}>
<h1 className='z-10 text-black text-xl font-bold'>{slides.name}</h1>
    </Link>
     ))}
    </div>
  
    </>
    
  )
}

export default Curated
