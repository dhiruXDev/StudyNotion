import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import spinner  from "../Components/Common/spinner.css"
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { getPasswordResetToken } from '../services/operation/authApi';
export const ForgotPassword = () => {
    const[emailSent , setEmailSent] = useState(false);
    const[email ,setEmail] = useState("");
    const dispatch = useDispatch();
    const{loading}=  useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const submitHandler = (e)=>{
           e.preventDefault();
           dispatch(getPasswordResetToken(email , setEmailSent));
    }
    
  return (
    <div className=' grid min-h-[calc(100vh-3.5rem)] place-items-center ml-[20%]'>
         {
             loading ? ( <div className='spinner -ml-[20%] '></div> ) : 
             (
                 <div className=' max-w-[500px] font-inter flex flex-col gap-1  p-2  '> 
                      <h1 className=' text-[1.4rem] lg:text-[1.6rem]  font-semibold py-1 text-richblack-25'>
                         {
                            !emailSent ?  "Reset Your Password" : "Check email"
                         }
                      </h1>
                      <p className='  max-w-[70%] relative  text-xs  lg:text-sm text-richblack-200'>
                        {
                            emailSent ?  `We have sent the reset email to ${email}`
                                         : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        }
                      </p>
                       <form onSubmit={submitHandler}>
                                {
                                    !emailSent &&  
                                        ( 
                                            <label className=' pt-3  relative flex flex-col lg:max-w-[70%] w-11/12 gap-1'>
                                                <p className=' text-richblack-200 text-sm  '>Email Address  <sup className=' text-lg text-pink-400 relative top-0'>*</sup> </p>
                                                <input  className=' bg-richblack-800 text-richblack-50 font-inter font-medium text-sm py-2 px-3  rounded-lg outline-none border-b-[1px] border-richblack-500 focus:border-blue-200'
                                                    type='email' 
                                                    name='email'
                                                    value={email}
                                                    required
                                                    placeholder='Enter Email Address'
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                    />
                                            </label> 
                                        )
                                }
                                
                                <button className=' w-11/12 lg:w-[70%] my-4 bg-yellow-100 py-2 px-2 text-richblack-900  rounded-lg hover:bg-yellow-200 text-base font-[500] transition-all duration-200 '>
                                    {
                                        !emailSent ? "Reset Password" : "Resend email"
                                    }
                                </button>
                        </form>
                        <Link to={"/logIn"}>
                               <div className=' text-richblack-25 flex gap-2 items-center text-sm hover:text-richblack-400  transition-all duration-200 '>
                                   <FaArrowLeft />
                                   Back to Login
                               </div>
                        </Link>
                 </div>
             )
         }
    </div>
  )
}
