import Image from 'next/image'
import React from 'react'

function Legowns() {
  return (
    <>
       <div className="firs  flex flex-col md:flex-row gap-6 md:gap-24">
            <div className="wo flex flex-col gap-2">
              <h1>COLLECTION</h1>
             <div className="p flex flex-col gap-2">
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
              <h1>COLLECTION</h1>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
             </div>
            </div>
            <div className="me flex flex-col gap-2">
            <h1>OCCASION</h1>
             <div className="p flex flex-col gap-2">
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
            <h1>OCCASION</h1>
              <p className='text-[#777]'>hello</p>
              <p className='text-[#777]'>hello</p>
            
             </div>
            </div>
          </div>
          <div className="img w-[45vw]  h-[45vh]  flex gap-4">
           <Image alt='' width={260} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-Ready-to-wear.jpg'/>
           <Image alt='' width={260} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-Ready-to-wear.jpg'/>
           <Image alt='' width={260} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-Ready-to-wear.jpg'/>
          </div>
    </>
  )
}

export default Legowns
