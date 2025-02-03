import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import { setSignUpData } from '../../../slices/authSlices';
import { sendOTP } from '../../../services/operation/authApi';
import {useNavigate} from 'react-router-dom';
import { ACCOUNT_TYPE }from "../../../utils/constants"
import { useDispatch } from 'react-redux';
 
export const SignUpForm = ( ) => {
         const[accountType, setAccountType] = useState("Student");
         const[formData , setFormData]= useState({  firstName : "" ,
                                                    lastName: "" ,
                                                    email : "" ,
                                                    phoneNo : "" ,
                                                    password: "", 
                                                    confirmPassword :"",
                                                    phoneNo:"" });
          const[showPassword ,setShowPassword] = useState(false);
          const[showConfirmPassword ,setShowConfirmPassword] = useState(false);
          const{password , confirmPassword} = formData;
           const navigate = useNavigate();
           const dispatch= useDispatch();
           
           const changeHandler = (event)=>{
                  event.preventDefault();
                  setFormData((prevData)=>(
                    {
                      ...prevData,
                      [event.target.name] : event.target.value
                    }
                  ))
           }
     
           const signUpData = {
            ...formData,
            accountType            
          }
           const submiteHandler= (e)=>{
                      e.preventDefault();
                      console.log(password , confirmPassword)
                      if (formData.password != formData.confirmPassword){
                           toast.error("Password not matched")
                           return
                      }  
          // setting SignUp data on the state
           dispatch(setSignUpData(signUpData)); 
           console.log("SignUp data" , signUpData);
           // Sending the email
           dispatch(sendOTP(formData.email , navigate));
           // Reset data
           setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            phoneNo:""
           })
          // setAccountType(ACCOUNT_TYPE.STUDENT)
    }
  return (
    <div className='  w-11/12 flex flex-col justify-center   relative  text-richblack-50  mt-3 font-inter  gap-4'> 
                <div className=' max-w-max relative flex  space-x-6   border-b-[1.5px] border-richblack-500   bg-richblack-800  p-[0.2rem] rounded-full '>
                                <button onClick={() => { setAccountType("Student") }}
                                      className={`${accountType === "Student" ? " bg-richblack-900  text-richblack-5   rounded-full " : " bg-transparent text-richblack-300 "} py-1 px-3 font-inter text-[1.1rem] font-medium cursor-pointer`} >
                                      Student
                                </button>
                                <button onClick={() => { setAccountType("Instructor") }}
                                      className={`${accountType === "Instructor" ? " bg-richblack-900  text-richblack-5  rounded-full " : " bg-transparent text-richblack-300 "} py-1 px-3  font-inter text-[1.1rem] font-medium cursor-pointer`}>
                                      Instructor
                                </button>
                  </div>
          
          <form  onSubmit={submiteHandler} className=' w-full flex relative gap-4 flex-col' >
                  <div className=' w-full flex gap-x-6 relative  md:items-center md:flex-row flex-col    '>
                          <label className=' lg:w-1/2 relative flex flex-col  gap-1  py-1 '>
                              <p className=' text-base font-normal '>First Name <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                              <input  className='outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-lg border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                                   type='text'
                                   name = "firstName"
                                   value={FormData.firstName}
                                   placeholder='Enter First Name'
                                   onChange={changeHandler} 
                                   />
                          </label>
                          <label className='lg:w-1/2 relative flex flex-col  gap-1  py-1'>
                              <p className=' text-base font-normal '>last Name <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                                  <input  className='outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-lg border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                                      type='text'
                                      name = "lastName"
                                      value={FormData.lastName}
                                      placeholder='Enter last Name'
                                      onChange={changeHandler} 
                                      />
                          </label>
                  </div>
                 
                  <label className=' w-full ' >
                      <p className=' text-base font-normal '>Email Address <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                                  <input  className=' w-full outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-lg border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                                      type='email'
                                      name = "email"
                                      value={FormData.email}
                                      placeholder='Enter Your Email'
                                      onChange={changeHandler} 
                                      />
                  </label>
                  
                  <label>
                        <p className=' text-base font-normal '>Phone Number <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                         <div className=''>
                              <label className='  flex gap-6 items-center' >
                                  <select name='country'   className=' outline-none bg-richblack-800 py-3 px-2  pr-6 rounded-lg border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '>
                                       <option value="+91"  >+91</option>
                                       <option value="+86">+86</option>
                                       <option value="+62">+62</option>
                                       <option value="+1">+1</option>
                                       <option value="+55">+55</option>
                                       <option value="+1">+44</option>
                                       <option value="+55">+66</option>
                                  </select>
                             
                              <input     className=' w-full outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-lg border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                                     type='tel'  
                                     
                                     name='phoneNo'
                                     placeholder='12345 6789'
                                     value={formData.phoneNo}
                                     onChange={changeHandler} 
                                     /> 
                              </label>
                         </div>
                  </label>
                  <div className='   flex gap-2 relative justify-between md:items-center md:flex-row flex-col   '>
                          <label className='  relative'>
                              <p className=' text-base font-normal '>Password <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                              <input className= ' w-full flex-shrink-0 outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-xl border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                                  type= {showPassword ? "text" : "password"}
                                   name = "password"
                                   value={password}
                                   placeholder='Enter Password'
                                   onChange={changeHandler} 
                                   required
                                   />
                                  <span onClick={()=> setShowPassword((prev)=>!prev)} className=' cursor-pointer absolute md:left-[11.5rem] md:top-10 text-2xl right-3 top-[48%] '>
                                    {
                                        showPassword ? ( <AiOutlineEye />) : (<AiOutlineEyeInvisible/>)
                                    }
                                  </span>
                          </label>
                          <label className=' relative '>
                              <p className=' relative text-base font-normal '>Confirm Password<sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                                  <input className='  w-full outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-xl border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                                      type= {showConfirmPassword ? "text" : "password"}
                                      name = "confirmPassword"
                                      value={confirmPassword}
                                      placeholder='Re-Enter password'
                                      onChange={changeHandler} 
                                      required
                                      />
                                    <span onClick={()=> setShowConfirmPassword((prev)=>!prev)} className=' cursor-pointer absolute md:right-3 md:top-10  top-[50%] right-[5%] text-2xl'>
                                        {
                                            showConfirmPassword ? ( <AiOutlineEye />) : (<AiOutlineEyeInvisible/>)
                                        }
                                  </span>
                          </label>
                  </div>
                   
                     <button className=' bg-yellow-50  mt-5 py-3 px-5 text-black text-lg font-semibold rounded-lg hover:bg-yellow-100  transition-all duration-200 '>Create Account</button>
                   
          </form>
    </div>
  )
}
