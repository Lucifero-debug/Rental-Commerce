import Image from 'next/image'
import React from 'react'

function Bridal() {

  return (
    <>
       <div className="firs  flex flex-col md:flex-row md:gap-24  w-[99vw] gap-10">
             <div className="p flex flex-col gap-2">
             <h1>CATEGORIES</h1>
              <p className='text-[#777]'>Lorem</p>
              <p className='text-[#777]'>hello</p>
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
          <div className="img w-[70vw]   h-[55vh] flex gap-4 mx-auto">
           <Image alt='' width={270} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-EID-Unstitiched-collection.jpg'/>
           <Image alt='' width={270} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-EID-Unstitiched-collection.jpg'/>
           <Image alt='' width={270} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-EID-Unstitiched-collection.jpg'/>
           <Image alt='' width={270} height={210} src='https://www.styleglow.com/wp-content/uploads/2020/02/Maria-b-EID-Unstitiched-collection.jpg'/>
          </div>
          </div>
    </>
  )
}

export default Bridal
