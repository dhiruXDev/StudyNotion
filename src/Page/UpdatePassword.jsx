import React, { useState } from 'react'
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operation/authApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import spinner from "../Components/Common/spinner.css"
export const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const[formData , setFormData] = useState({password: "" , confirmPassword:""});
    const dispatch = useDispatch();
    const location =useLocation();
    const navigate = useNavigate();
    const {loading} = useSelector((state)=>state.auth)
    
    const changeHandler= (e)=>{
         e.preventDefault();
         setFormData((prev)=> (
           {
             ...prev,
            [e.target.name] : e.target.value
        }
         ))
    }
const token = location.pathname.split("/").at(-1);
const{password,confirmPassword} = formData;
    function submitHandler(e){
            e.preventDefault();
            dispatch(resetPassword(password,confirmPassword,token ,navigate))
            // navigate("/logIn");
    }
const PasswordDesc = [ "one lowercase character" ,
                        "one Uppercase character",
                        "one Number",
                         "one Specical character",
                         "8 character minimum"
]
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center  text-richblack-5   '>
           { 
               loading ? (<div className=' spinner'> </div>)
                 :
                 (
                     <div className=' max-w-[500px]  flex flex-col gap-2 px-2  md:justify-center font-inter' >
                               <h1 className=' text-xl md:text-3xl font-semibold ' >Choose new Password</h1>
                              <p className='  max-w-[90%] text-richblack-400 text-xs base:text-base'>Almost done. Enter your new password and youre all set.</p>
                              <form onSubmit={submitHandler} className=' w-11/12 md:max-w-[90%]'>
                                      <label className=' flex gap-1 flex-col relative py-2'>
                                          <p  className=' text-sm text-richblack-200'>New Password <sup className=' text-xl text-pink-500 absolute top-1    pl-1  '>*</sup></p>
                                          <input  className=' bg-richblack-800  text-lg py-2  pt-3 px-3 border-b-[1.5px] border-richblack-400 focus:border-blue-300  rounded-lg outline-none '
                                              type = {showPassword ? "text" : "password"}  
                                              required
                                              name='password'
                                              value={formData.password}
                                              onChange={changeHandler}
                                              placeholder='********'
                                              />
                                          <span  
                                                    onClick={()=>setShowPassword((prev)=>!prev) }  
                                                    className=' cursor-pointer absolute right-3 top-12 text-xl' > 
                                                    {showPassword ? (<AiOutlineEye  />):(<AiOutlineEyeInvisible/>)}
                                          </span>
                                      </label>
                                      <label className='flex gap-1 flex-col relative py-2'>
                                            <p className=' text-sm text-richblack-200'>Confirm Password <sup className=' text-xl text-pink-500 absolute top-1    pl-1  '>*</sup></p>
                                            <input  className=' bg-richblack-800  text-lg py-2  pt-3 px-3 border-b-[1.5px] border-richblack-400 focus:border-blue-300  rounded-lg outline-none '
                                                  required
                                                  type={showConfirmPassword ? "text"  :  "password"}
                                                  name='confirmPassword'
                                                  value={formData.confirmPassword}
                                                  placeholder='********'
                                                  onChange={changeHandler}
                                                  />
                                                  <span  
                                                    onClick={()=>setShowConfirmPassword((prev)=>!prev) }  
                                                    className=' text-white cursor-pointer absolute right-3 top-12 text-xl' > 
                                                    {showConfirmPassword ? (<AiOutlineEye  />):(<AiOutlineEyeInvisible/>)}
                                                </span>
                                      </label>
                                      <div className=' flex flex-col text-caribbeangreen-400  w-[98%] base:max-w-[84%] base:max-h-[6rem]  flex-wrap  py-2 gap-2'>
                                            {
                                              PasswordDesc.map((element)=>{
                                                  return(
                                                      <span className=' flex  items-center  text-[1px] base:text-xs gap-1 font-inter font-[500] select-none '>
                                                          <IoIosCheckmarkCircle  className=' text-lg' />
                                                          {element}
                                                      </span>
                                                  )
                                              })
                                            }
                                      </div>
                                      <button className=' bg-yellow-100  relative w-[100%] md:w-[100%] text-base text-richblack-900 font-[550] rounded-lg p-2 hover:bg-yellow-200 transition-all duration-200'>
                                          Reset password
                                      </button>
                              </form>
                              <Link to="/logIn">
                                      <div className=' flex gap-2 items-center text-sm text-richblack-25 group '>
                                          <FaArrowLeft className=' group-hover:text-richblack-300   transition-all duration-200' />
                                           <p  className='group-hover:text-richblack-300   transition-all duration-200'>Back to Login</p>
                                      </div> 
                              </Link>
                       </div>
                 )
           }
    </div>
  )
}
