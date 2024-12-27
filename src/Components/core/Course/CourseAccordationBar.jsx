import React from 'react'
import { useEffect, useRef, useState } from "react"
import { FaAngleDown  } from "react-icons/fa"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export const CourseAccordationBar = ({course, isActive, handleActive}) => {
  const contentEl = useRef(null);

  // Accordian state
  const [active, setActive] = useState(false);

  useEffect(() => {
     setActive(isActive?.includes(course._id))
  }, [isActive])

  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border-[1.5px] border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
              <div>
                      <div className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-4 transition-[0.3s]`}
                          onClick={() => {handleActive(course._id)}}
                          >      
                              <div className="flex items-center gap-2">
                                    <i className={isActive.includes(course._id) ? "rotate-180" : "rotate-0" }     >
                                        <FaAngleDown  className=' text-richblack-200 font-semibold text-xl' />
                                    </i>
                                <p className=' text-richblack-50 text-base font-medium'>{course?.sectionName}</p>
                              </div>
                              <div className="space-x-4">
                                      <span className="text-yellow-25 text-base">
                                        {`${course.subSection.length || 0} lectures `}
                                      </span>
                                      <span>
                                           Time
                                      </span>
                              </div>
                      </div>
              </div>
              <div ref={contentEl} className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                    style={{
                          height: sectionHeight,
                    }}
              >
                        <div className="text-textHead flex flex-col gap-2 px-7 py-4 font-semibold">
                                  {course?.subSection?.map((subSec, i) => {
                                    return <CourseSubSectionAccordion subSec={subSec} key={i}/>
                                  })}
                          </div>
               </div>
    </div>
  )
}
