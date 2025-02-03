import React, { useState,useRef } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { Link } from 'react-router-dom';
import {logOut} from "../../../services/operation/authApi"
import spinner from  "../../Common/spinner.css"

export const ProfileDropDown = () => {
   const[open , setOpen] =useState(false);
   const dispatch = useDispatch();
   const navigate=  useNavigate();
   const {user} = useSelector((state)=>state.profile);
   const ref = useRef(null);
  //  console.log("user data.. " , user);
   const {loading} = useSelector((state)=>state.auth)
   useOnClickOutside(ref, () => setOpen(false))
   
   if (!user) {
       return null
   }

  return (
          <button onClick={()=>setOpen(true)} className=''>
              <div className=' flex items-center gap-x-1   '>
                  <img src={user?.image} alt={`Profile-${user?.firstName}`  }  title= {`${user?.firstName}` }  className="aspect-square w-[30px] rounded-full object-cover"/>
                  <AiOutlineCaretDown className="text-sm text-richblack-100" />
              </div>
          {open && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute  top-[0.8%]   right-[5%] md:!top-[1%] md:right-[6%] z-[10000] divide-y-[1px] divide-richblack-700   rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                    ref={ref}
                  > 
                    <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                      <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"> 
                        <VscDashboard className="text-lg" />
                        Dashboard
                      </div>
                    </Link>
                    <div
                      onClick={() => {
                        dispatch(logOut(navigate))
                        setOpen(false)
                      }}
                      className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                    >
                      <VscSignOut className="text-lg" />
                      Logout
                    </div>
                  </div>
                )}
          
          </button> 
 
      
     
  )
}
