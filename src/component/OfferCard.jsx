import React from 'react'
import OfferCardSlider from './OfferCardSlider'

const OfferCard = (props) => {
  return (
    <div className=' w-[90vw]  lg:w-[49%] min-h-[300px] flex flex-col rounded-xl overflow-hidden' style={props.style|| {
      background: 'black',
      
    }}>
       
       <div className='w-full h-[150px] '>
        <img src={props.img} alt="" className='w-full h-[100%]'/>
       </div>
       <div className='w-full h-[150px]'>
       <OfferCardSlider />
       </div>
    </div>
  )
}

export default OfferCard