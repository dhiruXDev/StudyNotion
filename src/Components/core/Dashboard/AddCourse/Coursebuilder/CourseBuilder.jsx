 import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
 import { BiPlusCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { IconBtn } from '../../../../Common/IconBtn';
import { IoChevronBack } from "react-icons/io5";
import {MdNavigateNext} from "react-icons/md"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operation/CourseDetailsAPI';
import { NestedView } from './NestedView';

export const CourseBuilder = () => {

  const{register,setValue,getValues,handleSubmit,formState:{errors}} = useForm();
  const[editSectionName,setEditSectionName]= useState(null);
  const{course,editCourse} = useSelector((state)=>state.course);
  const{token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const[loading,setLoading] = useState(false);

  const cancelEdit = ()=>{
       setEditSectionName(null);
       setValue("sectionName" , "");
  }

  const gotNext = ()=>{
       if (course.courseContent.length === 0) {   // For moving forward atleast you have one Section
               toast.error("Please add atleast one Section");
               return
       }
       if (course.courseContent.some((section)=>section.subSection.length===0)) {
                toast.error("Please add atleast one Lecture in each section");
                return
       }
       // If you already create lec then move forward
       dispatch(setStep(3))
  }
  const goToBack = ()=>{
       dispatch(setStep(1));    // GO back
       dispatch(setEditCourse(true));   // Now you can can only edit the course , not you can create new course
        
      }
  const handleEditSectionName =(sectionName, sectionId)=>{
        // Togle kr rhe hai
    if (editSectionName === sectionId) {     // sectionName me phle se hi ye vala incoming sectionId pra hua hai to ese toggle kr do
             cancelEdit();                   // If phle se id hai to ese remove kr do
             return ;
       }
       setEditSectionName(sectionId);    // nhi add hai sectionId to  add kr do
       setValue("sectionName",sectionName)
  }
  const submitHandler = async(data)=>{
         setLoading(true);
         let result;
         if (editSectionName) {   // Then edit section krna hai , menas Update
               result = await updateSection({
                 sectionName:data.sectionName,
                 sectionId:editSectionName,
                 courseId:course._id
               } ,token)
            console.log("result od updating Section",result)
         }  
         else{   /// Create krna hai 
               result = await createSection({sectionName:data.sectionName , courseId:course._id} , token);
               console.log( "Response of Creating section ... " ,result)
              }
         //Updates value
         if (result) {   
             setEditSectionName(null);   
             dispatch(setCourse(result));    // Chuki aap section ko update kiye hai to course ko bhi update krna hoga
             setValue("sectionName" , "")  
         }
          setLoading(false);
  }
   return (
     <div className={` flex flex-col gap-y-4 text-white bg-richblack-800 p-6 rounded-lg border-[1.5px] border-richblack-600 `}> 
         <h1 className=' text-xl font-semibold'>Course Builder</h1>
         <form onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor='sectionName  ' className=' text-[15px]   text-richblack-50 ' >Section Name<span className=' text-pink-500 font-semibold text-xl'> *</span></label>
              <input   
                        type='text'
                        name='sectionName'
                        id='sectionName'
                        placeholder=' Add a Sectio to build Your Course'
                        {...register("sectionName",{required:true})}
                        className=' mt-1 bg-richblack-700 w-full outline-none border-b-[1.6px] border-richblack-500 focus:border-blue-300 py-3 px-3 rounded-lg placeholder:text-base placeholder:leading-[28px]   text-richblack-50 text-lg'
              />
                    {
                      errors.sectionName && <span className=' text-pink-400 text-xs font-medium'>Section is required</span>
                    }

                  <div className='  flex gap-x-3 items-center'>
                        <button type='submit' className=' flex  mt-6 cursor-pointer gap-x-3 border-2 border-yellow-50 rounded-lg text-yellow-50 py-2 px-4 max-w-max  items-center'>
                              <BiPlusCircle className=' text-2xl font-black' />
                              <span className=' text-lg font-semibold'>{editSectionName ? "Edit Section" : " Create Section" }</span>
                        </button>
                          {
                             editSectionName && <button   onClick={cancelEdit} className=' mt-6 underline text-richblack-300 text-sm hover:text-richblack-400 duration-200 '>
                                                  Cancel Edit
                                               </button>
                          }
                  </div>
         </form>
                        {
                             course.courseContent.length > 0 && <NestedView  handleEditSectionName={handleEditSectionName}/>
                        }

               <div className=' flex gap-x-3 justify-end '>
                    <button onClick={goToBack} className=' bg-richblack-500 text-richblack-900 py-2 px-6   text-base font-semibold rounded-lg border-b-[1.8px] border-richblack-400' >
                        Back
                      </button>
                    <button onClick={gotNext} className=' text-richblack-900 bg-yellow-100 px-4 py-2 rounded-lg flex  border-b-[1.8px] border-richblack-400 items-center'>
                          <p className=' text-lg font-semibold'>Next</p>
                          <MdNavigateNext className=' text-2xl font-extrabold' />
                    </button>
               </div>
     </div>
   )
 }
 