import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"
import { RiComputerFill } from "react-icons/ri";
import { HiDesktopComputer } from "react-icons/hi";
function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
        <div className="flex justify-between py-2">
            <div className={`flex items-center gap-2  text-richblack-50`}>
                <span>
                  <HiDesktopComputer  className=" text-2xl"/>
                </span>
                 <p className=" text-base ">{subSec?.title}</p>
            </div>
        </div>
        <div>
            {/* Timing and anothere one again section */}
        </div>
    </div>
  )
}

export default CourseSubSectionAccordion