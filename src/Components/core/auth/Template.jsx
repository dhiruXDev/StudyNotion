import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogInForm } from "./LogInForm"
import { SignUpForm } from "./SignUpForm"
import { useSelector } from 'react-redux'
 import spinner from "../../Common/spinner.css"
 import frame from "../../../assets/image/frame.png"
export const Template = ({ heading, Description, hilightText, formType, imagePath }) => {

  const { loading }  = useSelector((state) => state.auth)

  return (
    <div className=' grid  min-h-[calc(100vh-4rem)] overflow-y-hidden  py-7 md:py-4 md:place-items-center '>     
           {
              loading ? (<div className='  mx-auto my-auto spinner'></div> ) : (

          <div className=' w-full  lg:w-11/12  mx-auto   lg:px-20    flex  md:flex-row  flex-col  lg:gap-x-4 relative lg:justify-center lg:items-center font-inter lg:space-x-12   '>
                   {/* Left side */}
                    <div className=' relative mx-auto pb-10 md:pb-0   w-full md:w-[45%] md:pr-10 flex flex-col  lg:px-0 lg:-ml-2   px-5   gap-3   text-richblack-5 '>
                          <h1 className=' text-2xl base:text-3xl font-semibold '>{heading}</h1>
                          <p className=' text-lg  font-[400] text-richblack-300'>{Description} <span className=' font-edu-sa italic text-blue-200 text-base font-bold'>{hilightText}</span> </p>
                                {
                                  formType === "SignIn" ? (<LogInForm  />) : (<SignUpForm    />)
                                }
                          
                    </div> 
                    {/* Right side */} 
                      <div className=' hidden md:!block relative mx-auto   md:max-w-[55%]    flex-wrap   items-center  justify-center   py-10  md:mx-0   ' > 
                            <img src={frame} alt="" loading='lazy'   width={510}  height={500} className=' ' />
      
                            <img src={imagePath} loading='lazy'   width={540} height={500} className='  absolute    bottom-16 left-[5%]   md:bottom-14   md:left-[3%]' />
                                
                      </div>
           </div>
        
        )}
          
    </div>
  )
}
