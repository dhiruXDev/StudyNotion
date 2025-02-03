import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { FaArrowLeft } from "react-icons/fa";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP, signUp } from '../services/operation/authApi';
import spinner from "../Components/Common/spinner.css"
import { Link } from 'react-router-dom';
export const VerifyEmail = () => {
    const [otp , setOTP] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signUpData ,loading} = useSelector((state)=>state.auth);
    
    useEffect(()=>{
        if (!signUpData) {
             navigate("/signUp")
        }
    },[])
    function submitHandler(e){
            e.preventDefault();
            const{
                email,firstName,lastName,password,confirmPassword,accountType
            } = signUpData;
            console.log("in verify  signupdata.. ", signUpData);
            dispatch(signUp(email,firstName,lastName,password,confirmPassword,accountType,otp,navigate));
    }
  return (
          <div  className='  grid min-h-[calc(100vh-3.5rem)] place-items-center  text-richblack-25 font-inter'>
               {
                   loading ? (<div className='  my-auto mx-auto  spinner'></div>) 
                   : 
                   (
                    <div className='  w-full md:max-w-[500px] flex flex-col gap-1  -mt-24    lg:mt-0 lg:ml-[15%] px-6  md:px-0 '>
                            <h1 className=' text-2xl  base:text-[1.7rem] font-[500]'>Verify Email</h1>
                            <p className=' max-w-[80%] text-[0.9rem] base:text-[1rem] text-richblack-400'> A verification code has been sent to you. Enter the code below</p>
                            <form onSubmit={submitHandler} > 
                            <OTPInput
                                    value={otp}
                                    onChange={setOTP}
                                    numInputs={6}
                                    renderSeparator={<span></span>}  
                                    renderInput={(props) => <input {...props}
                                                                className=' bg-richblack-700  !w-full  md:!w-[40px] lg:!w-[45px] rounded-lg border-b-[1.8px] border-richblack-400  text-richblack-25  aspect-square text-center focus:!border-none focus:outline-[1px] focus:outline-yellow-50' />}
                                                                placeholder='------'
                                                                // style={{
                                                                //     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                                                                // }}
                                                                containerStyle={{
                                                                    justifyContent: "justify-between",
                                                                    gap: "6px",
                                                                    
                                                                }}
                                                                

                                    />
                                    <button className=' bg-yellow-50 text-center rounded-lg text-richblack-900 px-2 py-3  text-base font-semibold  !w-full md:w-[20rem] base:w-[328px] my-5 hover:bg-yellow-200'>Verify and Register</button>
                    </form >
                        <div className='flex justify-between md:w-[80%] w-full'>
                            <Link to={"/logIn"}>
                                                <div className=' flex gap-1 items-center  font-medium  text-sm hover:text-richblack-400 transition-all duration-200'>
                                                    <FaArrowLeft />
                                                    Back to Login
                                                </div>
                                </Link>
                                <button onClick={()=>dispatch(sendOTP(signUpData.email))}>
                                    <div className=' flex gap-1 items-center  text-sm text-blue-400 font-semibold hover:text-blue-500 transition-all duration-200'>
                                        <RxCountdownTimer />
                                        Resend it
                                    </div>
                                </button>
                        </div>
                   
                    </div>
                   )
              }
          </div>
  )
}
