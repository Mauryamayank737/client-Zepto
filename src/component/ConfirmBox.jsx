import React from 'react'
import { MdOutlineClose } from "react-icons/md";

function ConfirmBox({close ,confirm}) {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[#000000c6] flex justify-center items-center'>
        <div className='md:w-[380px] px-5 py-[20px] bg-white rounded-md flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <h2 className='font-semibold'>Premanent Delete</h2>
                    <MdOutlineClose size={22} onClick={close} />
                </div>

                <div>
                    <p>Are You Sure Premanent delete ?</p>
                </div>

                <div className='flex justify-end items-center gap-3'>
                    <button className='border-2 border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg capitalize font-semibold  text-gray-600' onClick={close}>
                        cencel
                    </button>
                    <button className='border-2 border-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg capitalize font-semibold  text-gray-600' onClick={confirm}>
                        confirm
                    </button>
                </div>
        </div>
    </div>
  )
}

export default ConfirmBox