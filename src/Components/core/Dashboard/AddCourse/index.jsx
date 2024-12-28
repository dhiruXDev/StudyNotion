import React from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { RenderStep } from './RenderStep';
import { Link, useNavigate } from 'react-router-dom';
export const AddCourse = () => {
      
  return (
    <div className=' w-full px-2 py-4 md:p-6 flex flex-row gap-x-2  justify-between relative font-inter xl:pr-[10.5rem] '> 
          <div className=' w-full md:w-11/12 xl:w-[65%] flex flex-col gap-y-3 '>
                    <div className='  flex flex-col gap-y-2' >   {/*   onClick={navigate("/dashboard/Instructor")}  */}
                            <div  className=' flex gap-x-1 items-center hover:text-richblack-400 duration-200 text-richblack-500 cursor-pointer'> 
                                <FaAngleLeft className=' text-lg font-extralight' />
                                <Link to={'/dashboard/instructor'}> <span>Back to Dashboard</span> </Link> 
                            </div>
                            <h1 className=' pl-1 md:pl-0 text-xl font-thin '>Add your Courses</h1>
                    </div> 
                    <RenderStep />
          </div>
          <div className=' ml-16 max-w-[35%]   h-max  text-richblack-25   sticky  top-10    flex-col gap-y-4     bg-richblack-800 py-5 px-6 border-richblack-700 rounded-md border-[1.5px] hidden xl:!block '>
               <h1 className=' text-xl font-semibold leading-[28px] select-none'>⚡Course Upload Tips</h1>
                  <ul className="flex flex-col gap-y-2 list-disc list-inside text-xs mt-2 pl-2">
                          {[
                            "Set the Course Price option or make it free.",
                            "Standard size for the course thumbnail is 1024x576.",
                            "Video section controls the course overview video.",
                            "Course Builder is where you create & organize a course.",
                            "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
                            "Information from the Additional Data section shows up on the course single page.",
                            "Make Announcements to notify any important",
                            "Notes to all enrolled students at once."
                          ].map((text, index) => (
                            <li key={index} className="flex items-center gap-x-3">
                              <span className="flex-none text-xl">•</span>
                              <span className="flex-grow text-[12.5px]">{text}</span>
                            </li>
                          ))}
</ul>

          </div>
          
    </div>
  )
}
