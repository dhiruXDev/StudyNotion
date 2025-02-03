import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconBtn } from '../../Common/IconBtn'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
export const MyProfile = () => {
    
    const{user} = useSelector((state)=>state.profile)
    console.log("in my profile user : " , user )
    const navigate = useNavigate();
    const pathname = useLocation();
 
  return (
    <div className=' text-richblack-5  w-[100vw] mx-auto flex flex-col gap-y-3  px-3 md:px-[2rem] mt-10  overflow-x-hidden'>  
          <span className=' text-base text-richblack-300 font-medium'> Home  / Dashboard / <span className=' text-yellow-50'>{pathname.pathname.split("/").at(-1)}</span> </span>
           <h1 className=' text-4xl font-medium'>My Profile</h1>
           <div className=' flex lg:w-11/12 w-[100%] flex-col gap-3  mx-auto  mt-[1rem] lg:ml-[9rem]  justify-center'>
                      {/*Section 1  */}
                    <div className=' relative    flex items-center  w-full md:w-[60%] justify-between gap-x-2 py-6 md:px-[2rem]  px-2  border-[1.8px] border-richblack-700 rounded-xl   bg-richblack-800'>
                                   <div className=' flex gap-x-6  items-center '>
                                             <div>
                                                <img src={`${user?.image}`} alt={`profile-${user?.firstName}`} className=' w-[60px] md:w-[75px] aspect-square rounded-full object-cover' />     
                                             </div>
                                             <div className=' flex-col gap-4 '>
                                                  <h1 className=' text-lg  font-inter  font-semibold'>{user?.firstName} {" "} {user?.lastName}</h1>
                                                  <p className=' text-[14px] leading-[22px] text-richblack-300'>{user?.email}</p>
                                             </div>
                                   </div>

                                   <IconBtn
                                        text={"Edit"}
                                        children={<FaEdit />}
                                        onClick={()=>{navigate("/dashboard/setting")}} 
                                   />
                    </div>

                    {/* Section 2 */}

                    <div className=' relative   flex items-center  w-full md:w-[60%] justify-between gap-x-2 py-6 px-2 md:px-[2rem]  border-[1.8px] border-richblack-700 rounded-xl   bg-richblack-800'>
                                   <div className='flex gap-1  flex-col max-w-[80%] '>
                                             <h1 className=' text-xl  font-inter  font-semibold'>About</h1>
                                             <p className='text-[14px] leading-[22px] text-richblack-300'>
                                                  {user.additionalDetails.about
                                                  ? user.additionalDetails.about.length > 40 
                                                       ? `${user.additionalDetails.about.slice(0, 40)}...` 
                                                       : user.additionalDetails.about
                                                  : "Write something here about here"}
                                             </p>

                                   </div>
                                   {/*  */}
                                   <IconBtn
                                        text={"Edit"}
                                        children={<FaEdit />}
                                        onClick={()=>{navigate("/dashboard/setting")}}
                                   />
                    </div>

                    {/* Section 3 */}
                    <div className=' flex  flex-col bg-richblack-800 w-full md:w-[60%] gap-5    border-richblack-700 rounded-xl  py-6 md:px-[2rem]  px-2 border-[1.8px]  '>
                         <div className=' flex justify-between'>
                                   <h1  className=' text-lg  font-inter  font-semibold'>Persnal Details</h1>
                                   <IconBtn 
                                        children={<FaEdit />}
                                        text={"Edit"}
                                        onClick={()=>{navigate("/dashboard/setting")}} />
                         </div>
                         
                         <div className=' grid grid-cols-2 relative   gap-6'>
                                        <div className=' flex flex-col gap-y-1'>
                                             <p className=' text-sm text-richblack-500 font-medium'>First Name</p>
                                             <p className=' text-[14px]  text-richblack-25'>{user?.firstName}</p>
                                        </div>
                                        <div className=' flex flex-col gap-y-1'>
                                             <p className=' text-sm text-richblack-500 font-medium'>Last Name</p>
                                             <p className=' text-[14px]  text-richblack-25'>{user.lastName}</p>
                                        </div>
                                        <div  className=' flex flex-col gap-y-1'>
                                             <p  className=' text-sm text-richblack-500 font-medium'>Email</p>
                                             <p className=' text-[14px]  text-richblack-25'>{user?.email}</p>
                                        </div>
                                        
                                        <div className=' flex flex-col gap-y-1'>
                                             <p className=' text-sm text-richblack-500 font-medium'>Phone Number</p>
                                             <p className=' text-[14px]  text-richblack-25'>{user.additionalDetails?.contactNumber ?? "Add your contact no"}</p>
                                        </div>
                                        <div className=' flex flex-col gap-y-1'>
                                             <p className=' text-sm text-richblack-500 font-medium'>Gender</p>
                                             <p className=' text-[14px]  text-richblack-25'>{user?.additionalDetails?.gender ?? "Add your Gender"}</p>
                                        </div>
                                   
                                        <div className=' flex flex-col gap-y-1'>
                                             <p className=' text-sm text-richblack-500 font-medium'>Date of birth</p>
                                             <p className=' text-[14px]  text-richblack-25'>{user.additionalDetails?.dateOfBirth ?? "Add your Date of Birth"}</p>
                                        </div>
                         </div>

                    </div>
           </div>
          

    </div>
  )
}
