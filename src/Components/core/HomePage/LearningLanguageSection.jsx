import React from 'react'
import HighlightText from './HighlightText'
import Compare_with_others from "../../../assets/image/Compare_with_others.svg";
import Know_your_progress from "../../../assets/image/Know_your_progress.svg"
import Plan_your_lessons from "../../../assets/image/Plan_your_lessons.svg"
import CTAbutton from './CTAbutton';
export const LearningLanguageSection = () =>{
  return(     
    <div className=' w-full md:w-11/12 mx-auto  mt-5 py-8 px-5 lg:mt-10 lg:py-20  flex flex-col gap-3 justify-center   lg:justify-center lg:items-center   font-inter'> 
              <h1 className='  font-semibold  text-4xl  sm:text-5xl py-0.5  '> Your swiss knife for <HighlightText  text={"learning any language"} /> </h1> 
              <p className=' w-full text-base  font-inter font-[500]  text-richblack-800 lg:w-[54%] pt-1  sm:text-lg lg:text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
               <div className=' w-full  mt-5 flex lg:flex-row flex-col justify-between items-center lg:gap-1  gap-0 mr-36 relative'>
                     <img src={Know_your_progress} alt='Know_your_progress' height={341} width={405}  className=' object-contain  lg:absolute lg:right-[53%]'/>
                     <img src={Compare_with_others} alt='Compare_with_others' height={341} width={440} className=' object-contain relative lg:left-[40%]  lg:mt-4 -mt-14'/>
                     <img src={Plan_your_lessons} alt='Plan_your_lessons' height={350} width={430}   className=' object-contain lg:absolute lg:right-[5%] -mt-16' />
              </div>
              <div className='lg:ml-[1%]  -mt-9 w-[27%] lg:max-w-[40%]  ml-[34%]      '>
              <CTAbutton className=" " active={true} linkTo={"/singUp"} >Learn More</CTAbutton>      
              </div>
    </div> 
  )
}
