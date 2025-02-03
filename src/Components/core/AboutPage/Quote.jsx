import React from 'react'
import HighlightText from '../HomePage/HighlightText'

export const Quote = () => {
  return (
    <div className='  text-richblack-100  text-xl base:text-3xl lg:text-4xl font-semibold mx-auto lg:w-[80%] py-20 lg:py-[7rem] text-center  lg:leading-10 '> 
           <span className=' text-richblack-400'>"</span>{" "}We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"} /> ,{" "} 
            <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>expertise </span>, and community to create an

         <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>unparalleled educational experience.</span>
         <span className=' text-richblack-400'>"</span>
             
    </div>
  )
}



// We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.