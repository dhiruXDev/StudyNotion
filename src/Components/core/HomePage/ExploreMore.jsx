import React, { useState } from 'react'
import {HomePageExplore }from "../../../data/homepage-explore"
import HighlightText from './HighlightText'
import {CourseCard} from "./CourseCard"
const tabsName = [
      "Free",
      "New to coding" ,
      "Most popular" ,
      "Skills paths",
      "Career paths"
]
export const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    
    function setMyCard(value) {
         setCurrentTab(value);
         const result = HomePageExplore.filter((course)=> course.tag === value) ; 
         setCourses(result[0].courses);
         setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className=' w-full lg:w-11/12 mx-auto flex flex-col pt-[3rem] px-1 base:px-4  pb-10  lg:pb-[18rem] gap-3 justify-center flex-wrap items-center overflow-visible  relative z-[100]    '> 
          <span className=' text-2xl  xs:text-4xl font-inter text-white font-semibold' >Unlock the <HighlightText text = {"Power of Code"}></HighlightText> </span>
          <p className=' text-sm md:text-base lg:text-lg font-medium  text-pure-greys-400'>Learn to Build Anything You Can Imagine</p>
          <div className='   flex max-400:!hidden gap-1 items-center  mt-2 text-white  bg-richblack-800 px-[4px] py-[4px] rounded-full  relative'>
                {
                   tabsName.map((Element , index)=>{
                     return (
                            <div className = {`  text-[0.1px] sm:text-base   ${currentTab === Element ?  
                                  "bg-richblack-900  text-richblack-5 " : 
                                  " bg-transparent  text-richblack-5   "} font-thin  base:font-medium   px-1  base:px-3 md:px-4 py-[10px]  rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5
                                      `} onClick={()=> setMyCard(Element)} key={index}> 
                              {Element}
                            </div>
                     )
                   })
                }
          </div>

          {/* Cards */}
          <div className=' overflow-visible lg:absolute gap-10 justify-center flex-col lg:gap-5 flex lg:flex lg:flex-row   pt-4   lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[90%] text-black  lg:mb-0 mb-7 lg:px-4 px-3 '> 
              {
                  courses.map((Element , index)=>{
                     return (
                          <CourseCard  
                             key={index}
                             courses={Element}
                             currentCard={currentCard}
                             setCurrentCard = {setCurrentCard}
                          />
                     )
                  })
              }
          </div>
    </div>
  )
}
