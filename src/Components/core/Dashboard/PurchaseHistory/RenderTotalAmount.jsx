import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconBtn } from '../../../Common/IconBtn';
import { BuyCourse } from '../../../../services/operation/studentFeatureAPI';
import { useNavigate } from 'react-router-dom';
import {RupeesFormatChanger} from "../../../../utils/RupeesFormatChanger"
 export const RenderTotalAmount = ({totalAmount}) => {
    const{cart} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log( "Hello");
    const clickHandler = ()=>{
        // TODO: API  will be added for buy course  , means Payment Gate way tk le jayegi
        const courseId = cart.map((course)=>course._id);
        BuyCourse(user,courseId,token,navigate,dispatch);
         console.log("Course is bought");
    }
    return (
     <div className=' h-fit  w-full mb-8 md:mb-0 md:w-[50%] lg:w-[20%] mt-4 md:ml-6 lg:ml-3 flex flex-col gap-y-2 text-richblack-5 bg-richblack-800  p-6 rounded-lg  border-[1.7px] border-richblack-700'> 
          <p className =' text-richblack-300  font-semibold text-base'>Total: </p>
          <h1 className =' text-yellow-50 text-3xl font-medium '>Rs.{RupeesFormatChanger(totalAmount)}</h1>   
          <del className=' text-richblack-300 text-sm'>Rs.{totalAmount + 220}</del>
           
     </div>
   )
 }
 

