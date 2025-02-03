import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAbutton({children , linkTo , active}) {
  return (
     <Link to={linkTo} >
            <div className={`rounded-lg font-inter  font-bold   text-center text-[12px] md:text-[15px] hover:scale-95  transition-all duration-100 md:mt-8    md:py-[10px]  md:px-6 mt-5 py-2  px-2  border-r-[1.8px] border-b-[1.8px]   
                            ${active ? " bg-yellow-100 text-black   border-r-borderButton border-b-borderButton" : " bg-richblack-800 text-white  border-r-richblack-500 border-b-richblack-500" }`}>
              {children}
            </div>
     </Link>
  )
}
