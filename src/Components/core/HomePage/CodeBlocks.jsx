import React from 'react'
import CTAbutton from './CTAbutton'
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { TypeAnimation } from 'react-type-animation';
import { VscWhitespace } from 'react-icons/vsc';
import "./gradeint.css"
export const CodeBlocks = ( {heading ,subHeading , ctabtn1 , ctabtn2 , position,backgroundGradeint , codeColor,codeBlock }) => {
  return ( // 
    <div className={`flex  ${position}   flex-col overflow-y-hidden   my-1   mx-auto py-2 lg:py-6   px-2 ml-1 xs:px-10 lg:gap-14 gap-1   lg:justify-center lg:items-center   xs:pl-[3rem]   lg:w-[88%] h-fit relative    `} > 

          <div className='w-[100%] lg:w-1/2 flex flex-col gap-3  text-base relative   '>
                     {heading}
                    <div className=''>
                         {subHeading}
                    </div>
                    <div className=' flex gap-4 '>
                          <CTAbutton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                                         <div className=' flex gap-2'>
                                               {ctabtn1.btnText}
                                                <HiMiniArrowSmallRight  className=" text-[22px]" />
                                         </div>
                                                   
                            </CTAbutton>
                         <CTAbutton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                         <div className=' flex gap-2'>
                                               {ctabtn2.btnText}
                                                <HiMiniArrowSmallRight  className=" text-[22px]" />
                                         </div>
                          </CTAbutton>
                    </div>
          </div>

          <div className='relative lg:w-1/2  max-xs:h-[340px]    mt-6   w-[98%] pt-20 xs:py-20  '> 
                <div  className={`${backgroundGradeint} absolute ${position === 'flex-row-reverse' ? ' left-[2rem] bottom-5' : ' left-[5%]    top-[24%] xs:top-14 xs:left-[2rem] xs:bottom-15'}`}></div>
                 <div className='  h-[210px]  py-1 !overflow-y-hidden xs:h-auto code-border select-none flex flex-row  w-[100%] gap-0  xs:py-2  px-2 sm:text-sm leading-[18px] sm:leading-6  text-xs lg:w-[410px] relative  '>
                 <div className=' w-[10%] text-center flex flex-col font-inter font-semibold text-richblack-300'>
                     <p>1</p>
                     <p>2</p>
                     <p>3</p>
                     <p>4</p>
                     <p>5</p>
                     <p>6</p>
                     <p>7</p>
                     <p>8</p>
                     <p>9</p>
                     <p>10</p>
                     <p>11</p>
                 </div>
                 <div className={` w-[99%] base:w-[90%]  flex flex-grow flex-col font-mono font-bold ${codeColor} pr-3 ` } >
                      <TypeAnimation  className=''
                           sequence={[codeBlock , 1000,""]}
                           repeat={Infinity}
                           cursor={true}
                           omitDeletionAnimation={true}
                           style={
                                  {
                                    whiteSpace :"pre-line",
                                    display: "block"
                                  }
                           }
                       />
                 </div>
                 </div>
          </div>

    </div>
  )
}
