import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { TbCoinRupee } from "react-icons/tb";
import { apiConnector } from '../../../../../services/apiConnector';
import { catagories } from '../../../../../services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { ChipInput } from './ChipInput';
import { Upload } from './Upload';
import { RequirementField } from './RequirementField';
 
import { addCourse, updateCourse } from '../../../../../services/operation/CourseDetailsAPI';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { IconBtn } from '../../../../Common/IconBtn';
export const CourseInformationForm = () => {
    const [catagoryData, setCatagoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const{course,editCourse} =useSelector((state)=>state.course)
    const{token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const {
        register,
        reset,
        formState: {errors},
        handleSubmit,
        setValue,
        getValues
    } = useForm();


    useEffect(() => {
        async function getCatagory() {
            const response = await apiConnector("GET", catagories.CATAGORIES_API);
            setCatagoryData(response?.data?.AllCategory)
            setLoading(false);
        }
        getCatagory();

        if (editCourse) {
             setValue("courseTitle" , course.courseName);
             setValue("courseDescription" , course.courseDescription);
             setValue("coursePrice" , course.price);
             setValue("courseCatagory" , course.category[0].name);
             setValue("courseCatagory" , course.category[0].name);
             console.log( "Course catagoru " ,course.category[0]);
             setValue("courseTags" ,  course.tag );
             setValue("courseThumbnail" , course.thumbnail);
             setValue("courseBenifits" , course.whatYouWillLearn);
             setValue("courseRequirement" ,  course.Instructions );
        }
    }, [])
  
   const isFormUpdated = ()=>{
       const currentValues = getValues();     // Fetching the current value
       if (  currentValues.courseTitle !== course.courseName ||
             currentValues.courseDescription !== course.courseDescription ||
             currentValues.coursePrice !== course.price ||
             currentValues.courseCatagory._id  !== course.category._id  ||
             currentValues.courseThumbnail !== course.thumbnail ||
             currentValues.courseBenifits !== course.whatYouWillLearn ||
             currentValues.courseRequirement.toString() !== course.Instructions.toString() ||
             currentValues.courseTags.toString() !== course.tag.toString())    
         {    
            return  true
         }
       return false   // not updated
   }


   // Submit handler
    const submitHandler = async(data) => {
       
         if(editCourse){
                 console.log("FORM DATA... " , data);
                 if (isFormUpdated()) {
                        
                       const formData = new FormData();
                       const currentValues = getValues(); 
                       formData.append("courseId", course._id);
                       if(currentValues.courseTitle !== course.courseName){
                           formData.append("courseName" , data.courseTitle)
                       }
                       if (currentValues.courseDescription !== course.courseDescription) {
                             formData.append("courseDescription" , data.courseDescription)
                       }  
                       console.log("course.catagory._id ",course.category._id)
                       console.log("course.catagory._id ",course.category)
                       console.log("currentValues.courseCatagory._id   ",currentValues.courseCatagory._id);
                       console.log("currentValues.courseCatagory._id   ",currentValues.courseCatagory);
                       if (currentValues.courseCatagory._id  !== course.category._id) {
                             formData.append("category" ,  data.courseCatagory)
                       }
                     
                       if (currentValues.coursePrice !== course.price) {
                              formData.append("price",data.coursePrice)
                       }
                       if (currentValues.courseBenifits.toString() !== course.whatYouWillLearn.toString()) {
                             formData.append("whatYouWillLearn" ,  data.courseBenifits)
                       }
                       if (currentValues.courseThumbnail !== course.thumbnail) {
                             formData.append("thumbnail" , data.courseThumbnail)
                       }
                       if (currentValues.courseTags.toString() !== course.tag.toString()) {
                          formData.append("tag" ,  data.courseTags) ;
                        }
                       if (currentValues.courseRequirement.toString() !== course.Instructions.toString()) {
                          formData.append("Instructions" , data.courseRequirement);
                      }
                        setLoading(true)
                        const response = await updateCourse(formData , token);
                        console.log(" Response of updating new course ... ",response);
                        if(response){
                             dispatch(setStep(2));
                             dispatch(setCourse(response))
                        }
                        setLoading(false)
                 }else
                 toast.error("No change made to the form")
         }
         else{  // Adding new course
              const formData = new FormData();
              formData.append("courseName",data.courseTitle);
              formData.append("courseDescription",data.courseDescription);
              formData.append("tag", data.courseTags);
              formData.append("price",data.coursePrice);
              formData.append("whatYouWillLearn", data.courseBenifits);
              formData.append("category", data.courseCatagory);
              formData.append("Instructions", data.courseRequirement) ;
              formData.append("thumbnail",data.courseThumbnail);
              formData.append("createdAt",Date.now());
              // formData.append("status", COURSE_STATUS.DRAFT)
              setLoading(true);
              console.log("Indide COurseInfo.jsx Before calling API and formData is -> ",formData);
              console.log( "Printing the form data ....");
              for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
              const response =await addCourse(formData , token);
              console.log( "After adding course ",response)
              if(response){
                dispatch(setStep(2));
                dispatch(setCourse(response))
           }
           setLoading(false)
         }
    }
    return (
        
        <form onSubmit={handleSubmit(submitHandler)}  className= {  ` w-full  bg-richblack-800 py-5 px-2 border-richblack-600 border-[1.5px] rounded-md flex flex-col  gap-y-2 `} >
            <div className=' flex flex-col gap-y-1 mb-2'>
                <label htmlFor='courseTitle' className=' text-[14px] leading-[24px] text-richblack-25 '>Course Title<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                <input
                    type='text'
                    name='courseTitle'
                    id='courseTitle'
                    required
                    placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}    // ab isko register kro courseTitle ke name se 
                    className=' bg-richblack-700 outline-none border-b-[1.8px] border-richblack-500 focus:border-blue-300 py-2 px-3 rounded-lg  placeholder:text-[14.5px] placeholder:leading-[28px] text-base text-richblack-50'
                />
                {
                    errors.courseTitle && <span className=' text-xs text-pink-600 font-medium '>Enter Course Title</span>
                }
            </div>

            <div className=' flex flex-col gap-y-1 mb-2'>
                <label htmlFor='courseDescription' className='text-[14px] leading-[24px] text-richblack-25'>Short Description is required<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                <textarea
                    type='text'
                    name='courseDescription'
                    id='courseDescription'
                    required
                    placeholder='Enter Course Description'
                    {...register("courseDescription", { required: true })}
                    className=' min-h-[140px] w-full bg-richblack-700 outline-none border-b-[1.8px] border-richblack-500 focus:border-blue-300 py-2 px-3 rounded-lg placeholder:text-[14.5px] placeholder:leading-[28px] text-base text-richblack-100'
                />
                {
                    errors.courseDescription && <span className=' text-xs text-pink-600 font-medium '> Course Description is required</span>
                }
            </div>

            <div className=' flex flex-col gap-y-1 relative mb-2'>
                        <label htmlFor='coursePrice' className='text-[14px] leading-[24px] text-richblack-25'>Price<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                        <div className=' relative'>
                            <input
                                type='number'
                                name='coursePrice'
                                id='coursePrice'
                                rows={7}
                                cols={8}
                                required
                                placeholder='Enter Price'
                                {...register("coursePrice", { required: true, valueAsNumber:true })}
                                className=' bg-richblack-700 w-full outline-none border-b-[1.4px] border-richblack-500 focus:border-blue-300 py-2.5 px-3 pl-12 rounded-lg placeholder:text-[14.5px] placeholder:leading-[28px] text-base text-richblack-100'
                            />
                            <TbCoinRupee className=' absolute top-[22%] left-[1%] text-2xl text-richblack-400' />
                        </div>
                                {
                                    errors.coursePrice && <span className=' text-xs text-pink-600 font-medium '>Course Price is required</span>
                                }
            </div>

            <div className=' flex flex-col gap-y-1 relative mb-2'>
                        <label htmlFor='courseCatagory' className=' text-[14px] leading-[24px] text-richblack-25'>Catagory<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                        <select 
                             
                            name='courseCatagory'
                            id='courseCatagory'
                            placeholder="Choose the Catagory "
                            {...register("courseCatagory", { required: true })}
                            className=' bg-richblack-700 outline-none border-b-[1.4px] border-richblack-500 focus:border-blue-300 py-3  px-2  rounded-lg placeholder:text-[14.5px] placeholder:leading-[28px] text-base text-richblack-100'
                        >  <option value={""} className='disabled hidden'>Choose the Catagory</option>
                            {
                                loading ? (<option className='hidden'></option>) : catagoryData.map((item ,index) => {
                                    return (
                                        <option key={index}  >{item.name}</option>
                                    )
                                })
                            }
                        </select>
                         {
                            errors.courseCatagory && <span className=' text-xs text-pink-600 font-medium '>Category is required</span>
                         }   
            </div>

          

              {/* For Tags */}
              <ChipInput 
                   name="courseTags"
                   id ="courseTags"
                   setValue={setValue}
                   getValues={getValues}
                   register = {register}
                   errors = {errors}
                   label ="courseTags"
                   placeholder='Enter a Tag'
              />
              
              {/* For thumbnail */}
              <Upload  
                name='courseThumbnail'
                id ='courseThumbnail'
                label ='Course Thumbnail'
                setValue={setValue}
                getValues={getValues}
                errors ={errors}
                register={register}
              />

        <div className=' flex flex-col gap-y-1'>
                <label htmlFor='courseBenifits' className=' text-[14.5px] leading-[24px] text-richblack-25'>Benifit of the Course<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                <textarea
                    type='text'
                    name='courseBenifits'
                    id='courseBenifits'
                     
                    required
                    placeholder='Enter Benifit of the Course'
                    {...register("courseBenifits", { required: true })}
                    className=' min-h-[110px] w-full bg-richblack-700 outline-none border-b-[1.4px] border-richblack-500 focus:border-blue-300 py-2 px-3 rounded-lg placeholder:text-[14.4px] placeholder:leading-[28px] text-base text-richblack-100'
                />
                {
                    errors.courseBenifits && <span className=' text-xs text-pink-600 font-medium '>Please add Benifit of course</span>
                }
            </div>
            
            {/* Componenets for Instruction  */}
            <RequirementField 
                 name ='courseRequirement'
                 id='courseRequirement'
                 label ='Requirements/Instructions'
                 register={register}
                 getValues={getValues}
                 setValue={setValue}
                 errors={errors}
            />

            {/* Next Button     */}
           <div className=' flex gap-x-2   items-center justify-end'>
              
              
              {
                   editCourse && 
                        <button 
                                onClick={()=>dispatch(setStep(2))}
                                className=' bg-richblack-400 py-2 px-2 rounded-lg   text-richblack-900 font-[550] hover:bg-richblack-500 duration-200'
                            >
                            Continue without saving
                        </button>
              }  
                <IconBtn  
                     type={'submit'}
                     text={!editCourse ? "Next": "Save Changes"}
                     disabled={loading}  
                />
          </div>       {/*TODO::: Now hume dekhna hai ki kise onsubmit ttype kre buttton me se    */}
        

        </form>
    )
}
