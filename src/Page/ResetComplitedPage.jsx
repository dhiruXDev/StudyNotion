import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import spinner from "../Components/Common/spinner.css"
import { useSelector } from 'react-redux';
export const ResetComplitedPage = () => {
    const{loading} = useSelector((state)=> state.auth);
    const{email} = useSelector((state)=> state.profile);
    console.log("email is .. " , email);
  return (
 <div className=' grid min-h-[calc(100vh-3.5rem)] place-items-center  text-richblack-25 font-inter'>
       {
           loading ? ( <div className='  mx-auto my-auto spinner'> </div>) : 
           ( 
             <div className='max-w-[500px] flex flex-col gap-2  px-3  ml-[18%]'>
                    <h1 className=' text-xl base:text-2xl font-[510]'>Reset completed!</h1>
                    <p className=' max-w-[80%] text-richblack-300 text-xs base:text-base font-inter py-1'>All done! We have sent an email to m***********@gmail.com to confirm</p>
                    <Link to={"/logIn"}>
                        <button className='w-[75%] hover:bg-yellow-300 transition-all duration-200 bg-yellow-100 rounded-lg py-2 px-2 text-sm text-richblack-800 font-semibold'>Return to login</button>
                    </Link>
                    <Link to="/logIn">
                            <div className=' flex gap-2 items-center text-sm text-richblack-25 group py-2 '>
                                <FaArrowLeft className=' group-hover:text-richblack-300   transition-all duration-200' />
                                <p  className='group-hover:text-richblack-300   transition-all duration-200'>Back to Login</p>
                            </div> 
                    </Link>
        </div>)
       } 
 </div>
  )
}
