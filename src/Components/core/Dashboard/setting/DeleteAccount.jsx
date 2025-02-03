import React, { useState } from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import {IconBtn} from "../../../Common/IconBtn"
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operation/settingApi';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../../../Common/ConfirmationModal';
export const DeleteAccount = () => {
  const[Delete , setDelete] = useState(false);
  const{token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[confirmationModalData , setconfirmationModalData] = useState(null);
  const clickHandler = ()=>{
         try {
             dispatch(deleteAccount(token , navigate));
         } catch (error) {
              console.log("Error during deleting account .. " , error);
         }   
  }
  return (
    <div  className=' w-full lg:w-[60%] mt-2'> 
           <div className=' w-full relative  py-4 px-2  md:p-6 flex flex-row gap-x-4 bg-pink-900 border-[1.5px] border-pink-400 rounded-lg '>
                    <div className=' text-pink-200  italic bg-pink-700 w-[100px] md:w-[74px] h-[45px] md:max-h-[60px] flex items-center justify-center  aspect-square rounded-full  text-2xl md:text-3xl'>
                          <RiDeleteBin5Line />
                    </div>
                    <div className=' flex flex-col gap-y-1'>
                         <h1 className=' text-2xl  font-semibold'>Delete Account</h1>
                         <p className=' text-richblack-25 text-base font-inter  pt-2'>Would you like to delete account?</p>
                         <p className=' text-richblack-25 text-base font-inter leading-[22px] '>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                         {/* <p onClick={()=>{setDelete((prev)=>!prev)}} className=' cursor-pointer pt-2 text-pink-300  font-semibold italic hover:underline '>I want to delete my account.</p> */}
                              <p    className=' cursor-pointer pt-2 text-pink-300  font-semibold italic hover:underline '
                                  onClick={()=> setconfirmationModalData({
                                      btn1Text:'Delete',
                                      btn2Text:"Cancel",
                                      heading:"Are you sure?",
                                      discription:"Your account will be permanently deleted ",
                                      btn1Handler:()=> dispatch(clickHandler),
                                      btn2Handler:()=> setconfirmationModalData(null)
                                  })}
                              >
                                  I want to delete my account.
                          </p>
                              {
                                confirmationModalData && <ConfirmationModal modalData={confirmationModalData} />
                              }
                    </div>
           </div>
            


           {/* {
               Delete && (
                <div className=' flex gap-2 justify-end mt-4'>
                    <button className=' bg-richblack-700 px-4 py-2 rounded-lg  '  >Cancel</button>
                    <IconBtn  text={"Delete"}  onClick={clickHandler}  />
                 </div> 

               )
           }
          */}
    </div>
  )
}
