import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { updateSubsection ,createSubsection } from '../../../../../services/operation/CourseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import { Upload } from '../CourseInformation/Upload';
import { IconBtn } from '../../../../Common/IconBtn';

export const SubSectionModal = ({  
    setModalData,
    modalData,
    view=false,
    add=false,
    edit=false }) => {   
 console.log("add " ,add);
 console.log( "SectionId",modalData)
     const{course} = useSelector((state)=>state.course);
     const{token} = useSelector((state)=>state.auth);
     const[loading,setLoading] = useState(null);
     const{register,setValue,getValues,formState:{errors},handleSubmit} = useForm(); 
     const[prevVideo , setPrevVideo] =useState( "");
     const dispatch = useDispatch();
     useEffect(()=>{
        // If you are in view or Edit then i have to show the data taht are store in DB , means U clicked on View , then you want view data , so im dispalying the data on first Render
            if (view || edit) {
                 setValue("lectureTitle",modalData.title);
                 setValue("lectureDesc" , modalData.description);
                 setValue("lectureVideo",modalData.videoURL)
            }

     },[])

     const isFormUpdate = ()=>{
          const currentValue = getValues();
          if (currentValue.lectureTitle !== modalData.title ||
              currentValue.lectureDesc !== modalData.description ||
              currentValue.lectureVideo !== modalData.videoURL
          ) {
                return true  
          }
          else
             return false
     }
     const handleEditSubsection = async()=>{
              const currentValue = getValues();
              const formData = new FormData();
              formData.append("sectionId" ,modalData.sectionId);   // modalData  khud sectionId hai jise hum pich se bhej rhe hai
              formData.append("subSectionId",modalData._id);
              // console.log( "video " , modalData.videoURL)
              if(currentValue.lectureTitle !== modalData.title){   // mtlb i did something means i edit section and i have to update this one
                  formData.append("title",currentValue.lectureTitle)
              }else{
                formData.append("title",modalData.title)       /// when i will not update the title then we have to pass the old value , thats why i use.
              }

              if(currentValue.lectureDesc !== modalData.description){
                   formData.append("description" , currentValue.lectureDesc)
              }else{
                formData.append("description",modalData.description)
              }

              if (currentValue.lectureVideo !== modalData.videoURL) {
                    formData.append("videoURL",currentValue.lectureVideo)
              }else{
                formData.append("videoURL",prevVideo);
              }
               
         
              setLoading(true);
   // Print FormData content
  console.log("FormData content:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
              const result = await updateSubsection(formData,token);
              console.log( "Upating sunsection response .... in SubSectionModal .. " ,result);
              // console.log( "modalData >   " , modalData);
              // console.log( "modalDataSectionId >   " , modalData.sectionId)
              if (result) { 
                    const updatedCourseContent = course?.courseContent.map((section)=>section._id === modalData.sectionId ? result : section);
                    const updatedCourse = {...course , courseContent:updatedCourseContent};
                    console.log( "Updated course after updating subsection .> ", updatedCourse);
                    dispatch(setCourse(updatedCourse));
              }
             setModalData(null);
             setLoading(null);

     }
     const onSubmit =async(data)=>{
            if (view) {    // Normally show the subsection 
                  return
            }   // nhi to edit krna hai
            if(edit){
                  if (!isFormUpdate) { 
                          toast.error("No changes are made to form");
                  }
                  else{
                    handleEditSubsection();
                  }
                   return
            }
      // Creating new Entry   
      const formData = new FormData();
      formData.append("sectionId",modalData);
      formData.append("title",data.lectureTitle);
      formData.append("description" ,data.lectureDesc);
      formData.append("videoURL",data.lectureVideo);
    
      // setPrevVideo(data.lectureVideo);                 -----------> This is for when i will not pass/Update  the video then it  should not given error
      // console.log( "prev Video ... " , prevVideo);

      setLoading(true);
      const result = await createSubsection(formData ,token);
      if(result){
           //TODO:::::::::::::::   Niche given 2line hum isliye kr rhe hai ki , We have to update the Course , that will re-render 
           //                       , means updated thing will show , that's why i'm updating Course , Why Course , because
           //                      it is state and manage by Slice , that's why i have to Update Slice data Not any state .
           // We can update course in Backend also (means we can send Updated Course as Response) , and in frontEnd also 
           // i updated the course in Backend in "Section operation" , in SubSection operation i'm updating in Frontend .For knowledge
          //  console.log( "Response of updating Subsectio.. " , result);
           const updateCourseContent = course?.courseContent.map((Section)=>Section._id === modalData ? result : Section);
          // console.log( "Updated courseContent ... ", updateCourseContent);
           const updatedCourse = {...course,courseContent:updateCourseContent};
           console.log( "upated course ..",updatedCourse);
           dispatch(setCourse(updatedCourse));
      }
      setModalData(null);
      setLoading(null);
     }
  return (
    <div className='grid     place-items-center   bg-richblack-900   z-[1000] fixed   inset-0   bg-opacity-80      '>
        <div className=' flex flex-col   gap-x-2  bg-richblack-700   rounded-md  '>

           <div className=' flex flex-row justify-between   border-b-[1.6px]  border-richblack-600 '>
               <h1 className=' text-base font-semibold  text-richblack-50  py-3 px-3'>{view && "Viewing"} {add && 'Adding'} {edit && 'Editing'} Lecture </h1>  
               <button onClick={()=>{!loading && setModalData(null)}} className=' hover:bg-pink-600 px-4 transition-all duration-200  '>
                   <RxCross1 className=' text-xl font-black ' />
               </button>
          </div> 

          <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-y-4  bg-richblack-800 p-4  pt-5'>
                    <Upload  
                          name={'lectureVideo'}
                          id={'lectureVideo'}
                          label={'Lecture Video'}
                          register={register}
                          setValue={setValue}
                          errors={errors}
                          video={true}
                          editData = {edit ? modalData.videoURL : null }
                          viewData={view ? modalData.videoURL : null}
                          
                    />  

                    <div className=' flex flex-col gap-y-2   relative'>
                         <label htmlFor='lectureTitle' className=' text-richblack-100 text-sm'>Lecture Title <span className=' text-pink-400  text-lg  font-bold'> *</span></label>
                         <input   
                             name='lectureTitle'
                             id='lectureTitle'
                             placeholder='Enter Lecture Title'
                             {...register("lectureTitle",{required:true})}
                              className=' text-richblack-50 text-base bg-richblack-700 rounded-md outline-none px-3 py-2 placeholder:text-sm placeholder:font-[500] placeholder:text-richblack-300 border-b-[1.5px]  border-richblack-600  focus:border-blue-300 '
                             />
                             {
                                 errors.lectureTitle && <span  className=' text-xs text-pink-400 '>Lecture Title is required</span>
                             }
                    </div>
                    <div className=' flex flex-col gap-y-2   relative'>
                          <label htmlFor='lectureDesc' className=' text-richblack-100 text-sm'>Lecture Description<span className=' text-pink-400 text-lg  font-bold'> *</span></label>
                              <textarea   
                                  name='lectureDesc'
                                  id='lectureDesc'
                                  placeholder='Enter Lecture Description'
                                  {...register("lectureDesc",{required:true})}
                                  className=' text-richblack-50 text-base bg-richblack-700 rounded-md outline-none px-3 py-2 placeholder:text-sm placeholder:font-[500] placeholder:text-richblack-300 border-b-[1.5px]  border-richblack-600  focus:border-blue-300 '
                                  />
                                  {
                                      errors.lectureDesc && <span className=' text-xs text-pink-400 '>Lecture Description is required</span>
                                  }
                    </div>
                   <div className=' flex justify-end'>
                        {
                              !view && (
                                      <IconBtn  
                                          text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} 
                                    />
                              )
                          }
                   </div>             
          </form> 

          </div>
    </div>
  )
}
