import React from 'react'
import {HiUsers} from 'react-icons/hi'
import {ImTree} from 'react-icons/im'
export const CourseCard = ( {courses ,currentCard ,setCurrentCard}) => {
  return (
    <div className= {` max-w-maxContent w-[310px] h-[280px] pt-10 px-5 mr-8 flex flex-wrap flex-col gap-2  text-richblack-400   relative
                      ${courses?.heading == currentCard ?  " bg-white shadow-[12px_12px_0px_1px_#FFD60A]" : " bg-richblack-800"} cursor-pointer`} onClick={()=>{setCurrentCard(courses?.heading)}}>
        <div  className=' h-[80%] border-b-[2px] border-richblack-400  border-dashed'>
            <div className= {` text-[22px] leading-[28px] font-semibold  ${courses?.heading == currentCard ?  " text-black" : " text-richblack-25"}`}>{courses.heading}</div>  
            <div className= {`text-[16px]   font-[450] leading-[22px] pt-2 ${courses?.heading == currentCard ?  " text-richblack-500" : "  text-richblack-400"}`}> {courses.description} </div>  
        </div>
         <div className=' flex flex-row justify-between  items-center  pt-1   '>
             
              <div className= {`flex gap-2  text-[17px]  items-center  font-medium   ${courses?.heading == currentCard ?  " text-richblue-300" : "  "}  `}>
                  <HiUsers />
                  {courses.level}
               </div>
              <div className= {`flex gap-2  text-[17px]  items-center  font-medium   ${courses?.heading == currentCard ?  " text-richblue-300" : "  "}  `}>
                 <ImTree  />
                 {courses.lessionNumber} Lession
              </div>
        </div>  
    </div>
  )
}
