import React from 'react'
import image from '../../Images/dog.png'

const NoData = () => {
  return (
   <div className='w-full flex justify-center'>
     <div className='flex flex-col justify-center items-center relative'>
        <img src={image} alt="" className='lg:w-[300px] lg:h-[300px] '/>
        <p className='text-[25px] md:text-[32px] absolute lg:bottom-[30px] bottom-[10px]'>No data found</p>
    </div>
   </div>
  )
}

export default NoData