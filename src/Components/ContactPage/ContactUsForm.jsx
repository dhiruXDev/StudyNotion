import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import countryCode from "../../data/countrycode.json"
import { apiConnector } from '../../services/apiConnector';
import no_spin from "../Common/spinner.css"

// import {contactusEndpoint} from "../../services/apis/contactusEndpoint"
export const ContactUsForm = () => {
    const[loading,setLoading] =useState(false);
    const {
            register,
            handleSubmit,
            reset,
            formState: {errors,isSubmitSuccessful}
         } = useForm();
         
         useEffect(()=>{
            if (isSubmitSuccessful) {
                 reset({
                    firstName: "",
                    lastName :"",
                    email:"",
                    phoneNumber:"",
                    message:""
                 })
            }
         },[reset,isSubmitSuccessful])

    const submitContactForm = async(data)=>{
             setLoading(true);
             console.log("ContactUsForm data is..." , data)
             try {
                  //const response = await apiConnector("POST" , contactusEndpoint.CONTACT_US_API , data);
                  const response =  {status:"OK"}  // mocking krna esi ko kahte hai , when we have not any URL for hitting and fetching the data from server , but i recieve status okk message from my side by doing mocking
                  console.log("Logging the response " , response);
                  setLoading(false);
             } catch (error) {
                console.log("Error during submiting the Form data from Abou page " , error.message);
                setLoading(false)
             }
             setLoading(false);
        }
// Onsubmit pr handleSubmit (predefined function from Form hook)function call ho jaye , with argument submitContactForm() function 
  return (
         <form onSubmit={handleSubmit(submitContactForm)} className=' flex flex-col  gap-4'>
                   <div className='flex flex-row gap-8 lg:items-center '>
                             {/* First name */}
                            <div className=' w-full lg:w-[50%] flex flex-col gap-2'>
                                 <label htmlFor='firstName' className=' text-sm  font-medium' >First name</label>
                                 <input className=' bg-richblack-800   placeholder:text-sm py-2 px-2 font-medium outline-none focus:border-blue-200 border-b-[1.5px] border-richblack-600 text-richblack-25 text-base rounded-lg'
                                       type='text'
                                       name='firstName'
                                       id='firstName'
                                       placeholder='Enter first name'
                                       {...register("firstName" ,  {required:true})}
                                  />
                                 {   errors.firstName &&
                                     (<span>
                                           Please enter your name
                                     </span>)
                                 }
                            </div>
                            {/* Last name */}
                            <div className=' w-full flex flex-col gap-2  lg:w-[50%] '>
                                <label htmlFor='lastName' className=' text-sm  font-medium'>Last Name</label>
                                <input  className=' bg-richblack-800 py-2 px-2 placeholder:text-sm font-medium outline-none focus:border-blue-200 border-b-[1.5px] border-richblack-600 text-richblack-25 text-base rounded-lg'
                                     type='text'
                                     name='lastName'
                                     id='lastName'
                                     placeholder='Enter last name'
                                     {...register("lastName")}
                                />
                            </div>

                   </div>

                        {/* Email */}
                        <div className=" flex flex-col gap-2 py-2">
                        <label htmlFor='email' className=' text-sm  font-medium' >Email Address</label>
                        <input  className=' bg-richblack-800   placeholder:text-sm py-2 px-2 font-medium outline-none focus:border-blue-200 border-b-[1.5px] border-richblack-600 text-richblack-25 text-base rounded-lg'
                              type='email'
                              name='email'
                              id='email'
                              placeholder='Enter email address'
                              {...register("email",{required:true})}
                           />
                           {  errors.email &&
                            ( <span>
                                 Please enter Your email address
                             </span>)
                           }
                   </div>
 
                   {/* Mobile number dropDown */}
                   <div className=' flex flex-col gap-2 '>
                         <label htmlFor='phoneNumber' className=' text-sm  font-medium   '>Phone number</label>
                         <div className=' flex  gap-4'>
                               {/* Dropdown */}
                               <select  className=' bg-richblack-800  w-[75px]  placeholder:text-sm py-2 px-3.5 font-medium outline-none focus:border-blue-200 border-b-[1.5px] border-richblack-600 text-richblack-25 text-base rounded-lg'
                                   name='dropdown'
                                   id='dropdown'
                                   {...register("countryCode",{required:true})}
                               >
                                 {
                                     countryCode.map((element,index)=>{
                                        return(
                                             <option key={index} value={element.code}>
                                                {element.code }  - {element.country}
                                             </option>
                                        )
                                     })
                                 }
                               </select>
                                
                                <input  className=' bg-richblack-800  w-[calc(100%-90px)] no_spin   placeholder:text-sm py-2 px-2 font-medium outline-none focus:border-blue-200 border-b-[1.5px] border-richblack-600 text-richblack-25 text-base rounded-lg'
                                    type='number'
                                    name='phoneNumber'
                                    id='phoneNumber'
                                    placeholder='12345 67890'
                                
                                    {...register("phoneNumber" ,
                                        {
                                            required:{value:true ,message:"Please enter Phone number"},
                                            maxLength:{value:10 , message:"Invalid Phone number"},
                                            minLength:{value:8 ,message:"Invalid Phone Number"}
                                        }
                                    )}
                                    />
                                        {
                                          errors.phoneNumber && (<span>{errors.message}</span>     )
                                        
                                         }
                         
                         </div>

                   </div>

                {/* Message */}
                   <div className=' flex flex-col gap-3'>
                       <label htmlFor='message' className=' text-sm  font-medium'>Message</label>
                       <textarea  className=' bg-richblack-800   placeholder:text-sm py-2 px-2 font-medium outline-none focus:border-blue-200 border-b-[1.5px] border-richblack-600 text-richblack-25 text-base rounded-lg'
                              name='message'
                              id='message'
                              rows="7"
                              cols="30"
                              placeholder='Enter Your Message Here'
                              {...register("message" ,{required:true})}
                       />
                       {
                            errors.message &&
                            (<span>Please enter Message</span>)
                       }
                   </div>
                   
                       <button className=' w-full bg-yellow-50 hover:bg-yellow-100  py-2 px-4 text-base font-semibold rounded-lg text-black  transition-all duration-200'>
                             Send message
                       </button>
                
         </form>
  )
}
