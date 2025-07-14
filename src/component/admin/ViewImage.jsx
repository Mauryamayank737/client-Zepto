import React from 'react'
import { MdClose } from "react-icons/md";

const ViewImage = ({url ,close}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[#000000ba] flex flex-col justify-center items-center gap-3'>
        <div className=' w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center' onClick={close}><MdClose size={32} /></div>
        <div className='w-[300px] h-[300px] md:w-[400px] md:h-[400px]  bg-white rounded-lg overflow-hidden'>
            <img src={url} alt="Image" className='w-full h-full' />
            
        </div>

    </div>
  )
}

export default ViewImage