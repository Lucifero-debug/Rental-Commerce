import Image from 'next/image'
import React from 'react'

function Gown() {
  return (
    <>
       <div className="firs  flex flex-col md:flex-row gap-6 md:gap-24">
            <div className="wo flex flex-col gap-2">
              <h1>COLLECTION</h1>
             <div className="p flex flex-col gap-2">
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
             </div>
            </div>
            <div className="me flex flex-col gap-2">
            <h1>OCCASION</h1>
             <div className="p flex flex-col gap-2">
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
             </div>
            </div>
            <div className="cat flex flex-col gap-2">
            <h1>CATEGORIES</h1>
             <div className="p flex flex-col gap-2">
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
             </div>
            </div>
          </div>
          <div className="img w-[45vw] h-[45vh]  flex gap-4">
           <Image alt='' width={200} height={200} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maira-b-EID-lawn-collection.jpg'/>
           <Image alt='' width={200} height={200} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maira-b-EID-lawn-collection.jpg'/>
           <Image alt='' width={200} height={200} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maira-b-EID-lawn-collection.jpg'/>
          </div>
    </>
  )
}

export default Gown
