import React from 'react'
import { IoIosClose } from 'react-icons/io'

const AddFieldComponent = ({close, value,onChange,submit}) => {
  
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-[#0a0a0a9f] flex justify-center items-center'>
        <div className='min-w-[350px] bg-white rounded p-3'>
              <div className='flex justify-between items-center'>
                <h2 className=' font-semibold text-[16px]'>Add Filed</h2>
                <button onClick={close}><IoIosClose size={32} /></button>
              </div>

              <input type="text" className=' bg-blue-100 py-2 px-4 w-full rounded my-3 outline-0  border-[2px] border-white focus-within:border-[#666]' placeholder='Enter Field Name' value={value}  onChange={onChange}/>
              
                <button className='w-full h-full bg-blue-600 px-5 py-2 rounded text-white cursor-pointer font-semibold outline-0' onClick={submit} >Add Field</button>
              
        </div>

    </section>
  )
}

export default AddFieldComponent