import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { createRatingAndReviews } from '../../../services/operation/RatingAndReviewAPI';
export const CourseReviewModal = ({setReviewModal}) => {
       const {user} = useSelector((state)=>state.profile);
       const{token} =useSelector((state)=>state.auth);
       const[loading,setLoading] =useState(false);
       const{couseEntireData} =useSelector((state)=>state.viewCourse);
       const courseEntireData =couseEntireData;
       
      const{
          setValue,
          register,
          formState :{errors},
          handleSubmit
      }=useForm();

      useEffect(()=>{
         setValue("courseExperience" , "");
         setValue("courseRating",0);
      },[])

      const ratingChanged =(newRating)=>{
             setValue("courseRating",newRating)
      }
      const submitHandler = async(data)=>{
            setLoading(true);
            const res =  await createRatingAndReviews({ courseId: courseEntireData._id ,
                                                         reviews :data.courseExperience,
                                                         rating :data.courseRating      }  ,token);
            setLoading(false);
            setReviewModal(false);
      }

  return (
    <div className='grid place-item-center  fixed z-[1000] mt-0 inset-0  bg-white  bg-opacity-10  backdrop-blur-md   text-richblack-5    '>
           <div className='  w-[680px] max-w-[720px] fixed translate-x-[60%]  translate-y-[20%] rounded-md border-[1.2px] border-blue-400 '>
                <div className=' bg-richblack-700     flex justify-between  border-b-2 border-richblack-400 '> 
                        <span className=' py-3 px-6 text-xl font-semibold text-richblack-5'>Add Review</span>
                        <button onClick={()=>setReviewModal(false)} className=' hover:bg-pink-500 py-3 px-4 duration-300'>
                            <RxCross2  className=' text-2xl font-extrabold ' />
                        </button>
                    </div>
                    <div className=' flex flex-col gap-y-4  py-7   bg-richblack-800  '>
                        <div className=' flex gap-x-3 items-center justify-center'>
                                <div>
                                    <img src={`${user?.image}`} alt={user.firstName} height={60} width={60} className=' aspect-square rounded-full' />
                                </div>
                                
                                    <div className=' flex flex-col gap-y-0.5 text-white'>
                                        <span className=' font-medium text-lg'>{user.firstName} {user.lastName}</span>
                                        <span className=' font-light'>Posting Publicly</span>
                                    </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(submitHandler)} className=' flex flex-col gap-y-4  px-6  '>
                        <div className=' flex items-center justify-center'>
                                <ReactStars
                                    count={5}
                                    onChange ={ratingChanged}
                                    size={28}
                                    activeColor="#ffd700"
                                    />
                        </div>
                            
                            <div className=' flex flex-col gap-y-2'>
                                <label className=' text-richblack-100 font-normal text-sm' htmlFor='courseExperience'>Add Your Exprience <span className=' text-pink-400 font-bold'> *</span></label>
                                <textarea 
                                id='courseExperience'
                                rows={5}

                                placeholder='Share Details of your own experience for this course'
                                {...register("courseExperience", {required:true})}
                                className=' outline-none  bg-richblack-600 px-2 py-1  focus:border-[1.5px] focus:border-blue-100 rounded-md placeholder:text-sm placeholder:text-richblack-25'
                                /> 
                                {
                                    errors.courseExperience && <span className=' text-pink-400 text-sm '>Please add Course Experience</span>
                                }

                                <div className=' flex gap-x-3 justify-end py-3'>
                                    <button onClick={()=>setReviewModal(false)} className=' bg-richblack-700 rounded-md border-b-[1.7px] border-r-[1.7px] border-richblack-500 py-2 px-4 text-base font-medium  hover:bg-richblack-600 duration-200 '>
                                        Cancel
                                    </button>
                                    <button type='submit' className=' bg-yellow-50 text-black rounded-md border-b-[1.7px] border-r-[1.7px] border-richblack-50 py-2 px-6 text-base font-semibold  hover:bg-yellow-100 duration-200 '>
                                          {loading ?" Loading.." : "save"} 
                                    </button>
                                </div>
                            </div>
                        </form>
                    
                    </div>

           </div>
           
    </div>
  )
}
