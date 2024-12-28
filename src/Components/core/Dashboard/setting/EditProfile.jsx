import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { IconBtn } from '../../../Common/IconBtn';
import { updateProfile } from '../../../../services/operation/settingApi';

export const EditProfile = () => {
    // const [formData, seFormdata] = useState({firstName:"" , lastName:"" , email :"" , gender:"" ,phoneNumber:"" ,about:"" , dateOfBirth:""})
    const {token} = useSelector((state)=>state.auth);
    const{setUser,user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const [loading ,setLoading] = useState(false);

     const {
        register,
        handleSubmit,
        reset,
        formState: {errors }
     }=useForm();

       async function submitHandler(data){
                  try{   
                        console.log("Formdata.. " , data)
                        dispatch(updateProfile(token,data));   
                  } 
                  catch(err){
                       console.log(err.message);
                  }
       }
     function resetHandler(){
         reset({
            contactNumber:'',
            gender :"",
            about:"",
            dateOfBirth:""

         })

     }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className=' w-full lg:w-[60%]'> 
            <div className=' w-full lg:w-[100%] bg-richblack-800 py-6 px-2 md:px-6 flex  flex-col gap-6 border-[1.6px] border-richblack-700 rounded-lg '>
                            <div>
                                <h1 className=' text-lg font-semibold text-richblack-25'>Profile Information</h1>
                            </div>
                            <div className='  grid grid-cols-2  items-center gap-5   '>
                                    <div className=' flex  flex-col gap-2  '>
                                        <label htmlFor='firstName' className=' text-[13px] leading-[20px]  font-inter text-richblack-5'>First name</label>
                                        <input  className=' bg-richblack-700 outline-none text-richblack-200 focus:border-blue-100 rounded-lg px-3 py-2 border-b-[1.5px] border-b-richblack-500 text-base  '
                                            type='text'
                                            name='firstName'
                                            id='firstName'
                                            placeholder='Enter first name' 
                                            defaultValue={user?.firstName}
                                            {...register("firstName" , {required:true})}
                                            />
                                            {
                                
                                                <span className={ ` ${errors.firstName ? " opacity-100" : " opacity-0"} text-sm text-pink-500 font-medium select-none`}>Enter firstname</span>
                                            }
                                    </div>
                                    <div className=' flex flex-col  gap-3'>
                                        <label htmlFor='lastName' className=' text-[13px] leading-[20px]  font-inter text-richblack-5'>Last name</label>
                                        <input className=' bg-richblack-700 outline-none text-richblack-200 focus:border-blue-100 rounded-lg px-3 py-2 border-b-[1.5px] border-b-richblack-500 text-base  '
                                            type='text'
                                            name='lastName'
                                            id='lastName'
                                            placeholder='Enter Last name'
                                            defaultValue={user?.lastName}
                                            {...register("lastName" , {required:true})} 
                                            />
                                            {
                                              <span className={ ` ${errors.lastName ? " opacity-100" : " opacity-0"} text-sm text-pink-500 font-medium select-none`}>Enter Last Name</span>

                                            }
                                    </div>
                                    
                                    <div className=' flex  flex-col gap-2' >
                                        <label htmlFor='dateOfBirth ' className=' text-[13px] leading-[20px]  font-inter text-richblack-5'>Date of Birth</label>
                                        <input className=' bg-richblack-700 outline-none text-richblack-200 focus:border-blue-100 rounded-lg px-3 py-2 border-b-[1.5px] border-b-richblack-500 text-base  '
                                            type='date'
                                            name ='dateOfBirth'
                                            id='dateOfBirth'
                                            placeholder=''
                                            defaultValue={user?.dateOfBirth}
                                            {...register ('dateOfBirth'   )}
                                            />
                                    </div>

                                    <div>
                                        <span className=' text-[13px] leading-[20px]  font-inter text-richblack-5'>Gender  <span className=' text-pink-400 text-lg'>*</span></span>
                                        <fieldset className=' flex flex-row relative gap-4  justify-between    bg-richblack-700 outline-none text-richblack-200  focus:border-blue-100 rounded-lg px-3 py-3 border-b-[1.5px] border-b-richblack-500 text-base   ' >  
                                                
                                                <div className=' flex items-center gap-x-2'>  
                                                        <input 
                                                                type='radio'
                                                                name='gender'
                                                                id='gender'
                                                                value={"male"}
                                                                {...register("gender" ,{required:true})} 
                                                                className= {`cursor-pointer relative border-[3px] w-[18px] aspect-square rounded-full h-[18px] bg-transparent appearance-none
    before:content-[''] before:absolute before:inset-[2px] before:rounded-full before:bg-transparent
    checked:before:bg-yellow-50 checked:border-yellow-50 `} />
                                                        <label htmlFor='Male' className='   text-[14px] leading-[20px]'>Male</label> 
                                                </div>
                                                    <div className=' flex items-center gap-x-2'> 
                                                            <input type='radio' name='gender' id='gender' value={"female"} {...register("gender" ,{required:true})}  className= {`cursor-pointer relative border-[3px] w-[18px] aspect-square rounded-full h-[18px] bg-transparent appearance-none
    before:content-[''] before:absolute before:inset-[2px] before:rounded-full before:bg-transparent
    checked:before:bg-yellow-50 checked:border-yellow-50 `} /> 
                                                            <label htmlFor='female '  className=' text-[14.5px] leading-[20px]'>Female</label> 
                                                    </div>
                                                    <div className=' flex items-center gap-x-2'> 
                                                        <input type='radio' name='gender' id='gender' value={"male"} {...register("gender" ,{required:true})}  className= {`cursor-pointer relative border-[3px] w-[18px] aspect-square rounded-full h-[18px] bg-transparent appearance-none
    before:content-[''] before:absolute before:inset-[2px] before:rounded-full before:bg-transparent
    checked:before:bg-yellow-50 checked:border-yellow-50 `} />
                                                        <label htmlFor='other'  className=' text-[14.5px] leading-[20px]'>Others</label> 
                                                    </div>

                                        </fieldset>
                                            
                                    </div>

                                    <div className=' flex flex-col gap-2 relative'>
                                            <label htmlFor='contactNumber' className=' text-[13px] leading-[20px]  font-inter text-richblack-5'>Contact Number <span className=' text-pink-400 text-lg'>*</span></label>
                                            <input className=' bg-richblack-700 outline-none text-richblack-200 focus:border-blue-100 rounded-lg px-3 py-2 border-b-[1.5px] border-b-richblack-500 text-base  '
                                                type='number'
                                                name='contactNumber'
                                                id='contactNumber'
                                                placeholder='12345 67890'
                                                maxLength={12}
                                                
                                                defaultValue={user?.contactNumber}
                                                {...register("contactNumber" ,
                                                    {
                                                        required: {value:true , message:"Please enter phone number"},
                                                        maxLength:{value:12 , message:"Invalid phone number"},
                                                        minLength:{value:8,message:"Invalid phone number"}
                                                    }
                                                )}
                                                />
                                                {
                                                   
                                
                                                        <span className={ ` ${errors.contactNumber ? " opacity-100" : " opacity-0"} text-sm text-pink-500 font-medium select-none`}>{errors.message}</span>
                                                }
                                                

                                            
                                    </div>

                                    <div className='  flex flex-col gap-2'>
                                            <label htmlFor='about' className=' text-[13px] leading-[20px]  font-inter text-richblack-5'>About </label>
                                            <input  className=' bg-richblack-700 outline-none text-richblack-200 focus:border-blue-100 rounded-lg px-3 py-2 border-b-[1.5px] border-b-richblack-500 text-base  '
                                                type='text'
                                                name='about'
                                                id='about'
                                                placeholder='Enter Bio details'
                                                {...register("about")}
                                                />
                                    </div>
                            </div> 
                            
            </div>  
            <div className=' flex gap-2 justify-end mt-4'>
                <button className=' bg-richblack-700 px-4 py-2 rounded-lg  ' onClick={resetHandler}>Cancel</button>
                 <IconBtn  text={"Save"}  />
            </div>   
    </form>
  )
}
