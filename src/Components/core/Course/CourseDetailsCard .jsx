import React from 'react'
import { IconBtn } from '../../Common/IconBtn'
import CTAbutton from '../HomePage/CTAbutton'
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { addToCart } from '../../../slices/cartSlices'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { BuyCourse } from '../../../services/operation/studentFeatureAPI'

// THsi will fetch from every course Instruction
const CourseIncludes = [
  "8 hours on-demand video",
  "Full Lifetime access",
  "Access on Mobile and TV",
  "Certificate of completion",
]

export const CourseDetailsCard  = ({course,setConfirmationModal,handleBuyCourse}) => {
     
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth);
  const{courses} = useSelector((state)=>state.course);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const courseId = useParams();    // Error wil given
  //const {courseId} = useParams();    --->It will okk
//   const {
//     thumbnail: thumbnail ,
//     price: price,
//     _id: courseId,
//   } = course
console.log( "courses in Ccard" ,course)
console.log( "User -- ",user);
  const handleShare = () => {      
    copy(window.location.href);   // windows ke live location ke href ko copy kro clipBoard me (done by npm package)
    toast.success("Link copied to clipboard")
 //When you will type command window.location or window  or window.location.href on console , you will get info about your window
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) { 
        toast.error("You are an Instructor. You can't buy a course.")
        return
    }
    if (token) {
     // console.log( "dgd" ,course)
      dispatch(addToCart(course))
      return;
    } //Means You are not loggedIn
    setConfirmationModal({
      heading: "You are not logged in",
      discription: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <div className=' w-full  relative font-inter '> 
         <div className=' w-full  h-[180px] md:w-[350px] '>
            <img src={`${course?.thumbnail}`}  className=' w-full h-full  object-fill' />
         </div>
         <div className=' px-4 pt-4 pb-2 flex flex-col  gap-y-2'>
                    <span className=' text-richblack-5 text-xl lg:text-3xl font-semibold'>Rs. {course?.price}</span>
                    <div className="flex flex-col gap-4">
                                        {   
                                               (!user || !course?.studentsEnroled?.includes(user?._id)) && (
                                                  <button onClick={handleAddToCart} className=" bg-yellow-50 border-b-[1.7px] border-richblack-300  text-black py-3 px-3 rounded-lg text-base font-semibold hover:bg-yellow-100 duration-200 transition-all">
                                                       Add to Cart
                                                  </button>
                                               )
                                        }
                                        <button onClick={ user && course?.studentEnrollment?.includes(user?._id) ? (() => navigate("/dashboard/enrolled-course")):(handleBuyCourse)}
                                               className="   bg-richblack-800 border-b-[1.7px] border-richblack-600    text-richblack-25 py-3 px-3 rounded-lg text-base font-semibold hover:bg-richblack-900 duration-200 transition-all"    >
                                                 {user && course?.studentEnrollment?.includes(user?._id)? "Go To Course": "Buy Now"} 
                                         </button>

       
                         </div>
                         <span className=' text-center py-1 text-richblack-50   text-[13.5px]'>30-Day Money-Back Guarantee</span>
                         <div className=' '>
                              <p className='   py-1.5 text-richblack-25   text-[16px]   '>This Course innclude:</p>
                              <div className="flex flex-col  justify-center gap-y-3 text-sm text-caribbeangreen-100">
                                        {/* {course?.instructions?.map((item, i) => {
                                             return (
                                             <p className={`flex gap-2`} key={i}>
                                                  <BsFillCaretRightFill />
                                                  <span>{item}</span>
                                             </p>
                                             )
                                        })} */}
                                                       {CourseIncludes?.map((item, i) => {
                                                            return (
                                                            <p className={`flex gap-2`} key={i}>
                                                                 <BsFillCaretRightFill />
                                                                 <span>{item}</span>
                                                            </p>
                                                            )
                                                       })} 
               
                         </div>
                         </div>
                         <div className="text-center">
                                   <button
                                        className="mx-auto flex items-center gap-2 py-3 text-yellow-25  hover:text-yellow-100 duration-200"
                                        onClick={handleShare}
                                        >
                                        <FaShareSquare size={15} /> Share
                                   </button>
                         </div>
                    </div>

        
     </div>
  )
}
