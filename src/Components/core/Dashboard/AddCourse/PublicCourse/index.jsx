import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconBtn } from '../../../../Common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { resetCourseState  , setStep} from '../../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { updateCourse } from '../../../../../services/operation/CourseDetailsAPI';
export const  PublisCourse = () => {
  const{register,setValue,getValues,formState:{errors},handleSubmit} =useForm();
  const[loading,setLoading]= useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ course}=useSelector((state)=>state.course);
  const{token} = useSelector((state)=>state.auth);
  useEffect(()=>{
       if(course?.status === COURSE_STATUS.PUBLISHED){
             setValue('public',true);
       }
  },[])
  const gotoCourse =()=>{
        dispatch(resetCourseState());
        navigate('/dashboard/my-course');
  }
  const handlePublicSubmit = async()=>{
       // If form is updated or not
       if (course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true ||
            course?.status === COURSE_STATUS.DRAFT && getValues('public')=== false) {
              //form has not been updated
            //no need to make api call
            gotoCourse();
            return;
       }
       // Form is Updated
       const formData = new FormData();
       formData.append('courseId',course._id);
       const courseStatus = getValues("public")? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
       //console.log( "courseStatus " ,JSON.stringify(courseStatus))
      // console.log( "courseStatus " ,courseStatus.toString())
       formData.append("status",courseStatus);
          
       setLoading(true);
       const result =  updateCourse(formData , token);
        if (result) {
              gotoCourse();
        }
        setLoading(false);
  }
  const submitHandler =()=>{
    console.log( "in submit handler")
       handlePublicSubmit();
  }
  const goback = ()=>{
        dispatch(setStep(2));
  }
  return (
  
     <div className='  flex flex-col bg-richblack-800 rounded-md p-6 gap-y-4'> 
           <h1 className=' text-richblack-50 text-2xl font-semibold'>Publish Settings</h1>
           <form onSubmit={handleSubmit(submitHandler)} >
                  <div  className=' flex flex-row gap-x-2 items-center  ' >
                    <input 
                        type='checkbox'
                        name='public'
                        id='public'
                        {...register('public',{required:true})} 
                        className="
                        appearance-none 
                        outline-none 
                        h-4 w-4 
                        border-richblack-500 
                        aspect-square 
                        border-2 
                        rounded-sm 
                        cursor-pointer  
                        checked:bg-blue-200    
                        checked:border-blue-200   
                        checked:before:text-white 
                        checked:before:block 
                        checked:before:text-[8px]
                        checked:before:text-center 
                        checked:before:content-['✔']  
                        overflow-hidden
                          flex justify-center items-center 
                          p-2
                      " 
                        />
                       <span className='  text-richblack-400'>Make this Course as Public</span>
                  </div>
                    {
                        errors.public && <span className=' text-pink-400 text-xs'>Please check the button for Public Course </span>
                    }
                  <div className=' flex  gap-x-3 justify-end mt-6  '>
                          <button 
                             disabled={loading}
                             type='button'
                             className=' bg-richblack-600 px-5 py-2 rounded-lg border-b-[1.5px] border-richblack-300'
                             onClick={goback}
                           >Back</button>
                        
                          <IconBtn 
                              text={"Save Changes"}
                              disabled={loading}
                              type={'submit'}
                              />
                      
                 </div>
                  
           </form>
          
    </div>
  
  )
}

{/* */}