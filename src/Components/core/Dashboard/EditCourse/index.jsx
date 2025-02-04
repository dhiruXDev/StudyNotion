 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../../../../services/operation/CourseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { RenderStep } from '../AddCourse/RenderStep';
 
 export const EditCourses = () => {
     const{token} = useSelector((state)=>state.auth);
     const{course} =useSelector((state)=>state.course);
     const[loading,setLoading] =useState(false);
     const dispatch =useDispatch();
    
    const{courseId} = useParams();   // Importing courseID from paramenter
     
    useEffect(()=>{
        setLoading(true);
            const populateCourseDetails = async()=>{
             console.log("course Id in edit course",courseId);
                    const result =await getCourseDetails(courseId,token);
                    console.log( "result" ,result);
                    if (result) {
                         dispatch(setEditCourse(true));
                         dispatch(setCourse(result));
                         console.log( "course " , course)
                    }
            }  
            setLoading(false);
            populateCourseDetails();
            
    },[])

   return (
     <div className=' w-[100%]  font-inter p-6 text-white '>
           <div className=' flex flex-col gap-y-2 pb-3'>
                    <span className=' text-base  text-richblack-400'>Home / Dashboard / <span className=' text-yellow-100'>Edit course</span></span>
                    <h1 className=' md:text-3xl text-richblack-25 '>Edit Course</h1>
            </div>
            {
                course ? <div className=' max-w-[650px]'>   <RenderStep /> </div> : <div className='  text-3xl text-richblack-400 font-semibold'> <h1>Course not found</h1></div>
            }
             
     </div>
   )
 }
 
