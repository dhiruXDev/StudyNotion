import React, { useState } from 'react'
import { AiOutlineEye , AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import  {login }from "../../../services/operation/authApi"


export const LogInForm = () => {
    const[FormData , setFormData] = useState({email:"" ,  password:""})
    const[showPassword , setShowPassword]= useState(false);
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const {email,password} = FormData;
    console.log("in lonForm ");

    const changeHandler = (event)=>{
       event.preventDefault();
        setFormData((prevData)=> (
            {
                ...prevData ,
                [event.target.name] : event.target.value 
             }
             
        ))
    }
     console.log("in change handler" , FormData)
//UseDispatch is a custom hook in the React Redux library that allows functional components to dispatch actions to the Redux store
//useSelector is a hook provided by the React Redux library, specifically designed to extract data from the Redux store state for use in React components.
    const submitHandler = (e)=>{
         e.preventDefault()
         dispatch(login(email , password ,navigate))
    }
  return (
    <div className=' flex flex-col md:justify-center  gap-1 relative  text-richblack-50  md:mt-6 font-inter'> 
        <form   onSubmit={submitHandler} className=' flex relative gap-3 flex-col'>
               <label className=' relative flex flex-col  gap-1  py-1 '>
                      <p  className=' text-base font-normal '>Email Address <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup> </p>
                      <input className='outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-xl border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                         type='email'
                         name="email"
                         value= {FormData.email}
                         required
                         onChange={changeHandler}
                         placeholder='Enter your email '
                             />
               </label>
               <label className='  relative flex flex-col gap-2 pb-8 ' >
                          <p className=' text-base font-normal '>Password <sup className=' text-lg relative top-[1%] text-pink-500 font-semibold'>*</sup></p>
                          <input  className='outline-none bg-richblack-800 py-3 px-2 pr-5 rounded-xl border-b-[1.6px]  font-medium text-base border-richblack-500  focus:border-b-blue-100 '
                               type= { showPassword ? "text" : "password"}
                               name = "password"
                               value={FormData.password}
                               required
                               placeholder='Enter Your Password'
                               onChange={changeHandler}

                          />
                          <span  
                              onClick={()=>setShowPassword((prev)=>!prev) }  
                              className=' cursor-pointer absolute right-3 top-12 text-2xl' > 
                              {showPassword ? (<AiOutlineEye  />):(<AiOutlineEyeInvisible/>)}
                          </span>
                          <Link to="/forgot-password" className=' '> 
                               <p className='absolute right-3  top-22  text-blue-200  text-sm'>Forgot Password</p>
                           </Link>
                           
               </label>
               <button className=' bg-yellow-50  py-3 px-5 text-black text-lg font-semibold rounded-lg hover:bg-yellow-100  transition-all duration-200 '>Sign in</button>
        </form>
    </div>
  )
}
