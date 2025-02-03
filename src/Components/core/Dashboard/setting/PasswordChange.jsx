import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import { IconBtn } from '../../../Common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../../services/operation/settingApi';
export const PasswordChange = () => {
   const[showOldPassword,setShowOldPassword] = useState(false);
   const[showNewPassword,setShowNewPassword] = useState(false);
   const{token} = useSelector((state)=>state.auth);
   const dispatch = useDispatch(); 
   const{
       register,
       formState :{errors},
       handleSubmit,
       reset
   }= useForm();
  

   const updatePasswordHandler = (data)=>{
             try {
                      console.log("update password form data.. " , data);
                      dispatch(updatePassword(token,data))
             } catch (error) {
                  console.log("Something went wrong!" , error.message);
             } 
   }

   function resetHandler (){
        reset({
          oldPassword : "",
          newPassword : ""
        })
   }
  return (
    <form onSubmit={handleSubmit(updatePasswordHandler)} className=' lg:w-[60%] relative flex  flex-col gap-y-4 mt-4 '> 
        
        <div className=' flex flex-col gap-y-4 bg-richblack-800 rounded-lg border-2 border-richblack-500  pt-4 px-2 md:p-6'>
             <h1 className=' text-xl text-richblack-25 font-semibold '>Password</h1>
              <div className=' w-full flex flex-row gap-x-4  relative  '>

                  <div className=' flex flex-col gap-2 w-full relative  '>
                          <label htmlFor='oldPassword' className=' text-sm text-richblack-50' >Old password <span className=' text-pink-400 font-semibold'>*</span></label>          
                          <input  className=' bg-richblack-700 px-3 text-lg  placeholder:text-lg placeholder:relative placeholder:top-1  py-2 outline-none border-b-[1.5px] border-richblack-400 focus:border-blue-300 rounded-lg'
                              name='oldPassword'
                              id='oldPassword'
                              type= {showOldPassword ? "text" : "password"}
                              placeholder='********'
                              {...register("oldPassword" ,{required:true})}
                          /> 
                            <span className=' text-2xl absolute right-[5%] top-[35%] cursor-pointer'>{
                                    showOldPassword ? <AiOutlineEyeInvisible  onClick={()=> setShowOldPassword((prev)=>!prev)} /> : <AiOutlineEye onClick={()=>setShowOldPassword((prev)=>!prev)} /> 
                                 }
                            </span>
                          {
                              <span className={ ` ${errors.oldPassword ? " opacity-100" : " opacity-0"} text-sm text-pink-500 font-medium select-none`}>Enter old Password</span>
                          }
                  </div> 

                  <div className=' w-full flex flex-col gap-2'>
                      <label  htmlFor='newPassword'  className=' text-sm text-richblack-50' >New password <span className=' text-pink-400 font-semibold'>*</span></label>
                      <input  className=' bg-richblack-700 px-3 text-lg  placeholder:text-lg placeholder:relative placeholder:top-1  py-2 outline-none border-b-[1.5px] border-richblack-400 focus:border-blue-300 rounded-lg'
                            type={showNewPassword ? "text" : "password" }
                            name='newPassword'
                            id ='newPassword'
                            placeholder="********"
                            {...register("newPassword" , {require:true})}
                            />
                              <span className=' text-2xl absolute right-[1%] top-[35%] cursor-pointer'>{
                                        showNewPassword ?  <AiOutlineEyeInvisible onClick={ ()=>setShowNewPassword((prev)=>!prev)} /> : <AiOutlineEye  onClick={()=>setShowNewPassword((prev)=>!prev)} /> 
                                    }
                              </span> 
                              {
                              <span className={ ` ${errors.newPassword ? " opacity-100" : " opacity-0"} text-sm text-pink-500 font-medium select-none`}>Enter old Password</span>
                          }
                  </div>

              </div>

        </div>
          <div className=' flex gap-2 justify-end mt-4'>
                <button className=' bg-richblack-700 px-4 py-2 rounded-lg  ' onClick={ resetHandler  } >Cancel</button>
                    
                 <IconBtn  text={"Save"}   />
            </div>   
    </form>
  )
}
