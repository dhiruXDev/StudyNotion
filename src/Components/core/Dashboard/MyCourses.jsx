import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorAllCourse } from '../../../services/operation/CourseDetailsAPI';
import { IconBtn } from '../../Common/IconBtn';
import { BiPlusCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { CourseTable } from './InstructorCourse/CourseTable';
import { setCourse } from '../../../slices/courseSlice';
export const MyCourses = () => {
    const{course} = useSelector((state)=>state.course);
    const{token } =useSelector((state)=>state.auth);
    const[Courses ,setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchCOurses = async()=>{
            const result = await fetchInstructorAllCourse(token);
            if (result) {
                   setCourses(result);
            }
        }    
        fetchCOurses();      
    },[]) ;

  return (
    <div className=' flex flex-col  py-4 px-3 md:p-6  w-full  xl:w-[980px] '> 
        
         <div className=' w-[100%] flex flex-row justify-between md:space-x-40 font-inter '>
              <div className=' flex flex-col gap-y-2 pb-3'>
                    <span className=' text-base  text-richblack-400'>Home / Dashboard / <span className=' text-yellow-100'> course</span></span>
                    <h1 className=' text-2xl md:text-3xl text-richblack-25 '>My Courses</h1>
              </div>
              <div>
                    <IconBtn text={"Add course"} onClick={()=>navigate("/dashboard/add-course")} > 
                         <BiPlusCircle />
                    </IconBtn>
              </div>
         </div>
         
              {
                   Courses && <CourseTable   Courses={Courses} setCourses={setCourses} />
              }
          
         
    </div>
  )
}
