import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi";
import {removeFromCart} from "../../../../slices/cartSlices"
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../../Common/RatingAndStar';
import { RupeesFormatChanger } from '../../../../utils/RupeesFormatChanger';
export const RenderCartCourses = () => {

    const{cart} = useSelector((state)=>state.cart);
    console.log( "Course " , cart);
    const dispatch = useDispatch();
    //const[cartItem ,setCartItem] = useState([]);
     
let cnt = cart[cart.length - 1];

  return (
    <div className=' w-full lg:max-w-[56%] h-full flex flex-col gap-x-1    relative font-inter'> 
         {
            cart?.map((course,index )=>{
                return(
                      <div key={index} className={` border-b-[1.5px] lg:${course === cnt  ? 'border-none' : ' border-b-[1.5px]'} w-full h-full md:max-h-[360px] flex flex-col md:flex-row  gap-x-3  justify-between   px-2  md:px-6  py-6 border-richblack-700`}> 
                             <div className='  h-[310px] md:h-[150px] w-full md:w-[37%] '>
                                        <img src={course?.thumbnail} alt='Course image'   className=' h-full md:h-[150px]  w-full md:w-[220px] object-cover  rounded-lg  '  />
                             </div>
                             <div className = ' w-full md:w-[calc(100%-230px)] flex flex-col gap-y-1 mt-2 '>
                                        {/* <h1>{course?.courseName}</h1> */}
                                        <h1 className =' w-full md:w-[88%] text-xl '>
                                                      {
                                                      course?.courseDescription.length > 60 ? course?.courseDescription.split(" ").splice(0,10).join(" ")+"..."   :  course.courseDescription
                                                      }
                                          </h1> 
                                        <p className = ' text-richblack-300'>{course?.category[0]?.name}</p>
                                        <div className=' flex gap-x-1'>
                                                <span className ='text-yellow-100  font-semibold'>{GetAvgRating(course?.ratingAndReviews)} </span>
                                                <RatingStars 
                                                  count={5}
                                                  edit={false}
                                                  isHalf={true}
                                                  activeColor={'#ffd700'}
                                                  emptyIcon={< FaRegStar/>}
                                                  halfIcon={<FaStarHalf />}
                                                  fullIcon={<FaStar />}
                                                />
                                                <span className=' text-richblack-300 text-base'>({course?.ratingAndReviews.length || 0 } Review Count) </span>
                                        </div>
                                         <div>
                                              <p className = ' text-richblack-300 font-[500] text-[14.5px]'>Total Courses • Lesson • Beginner</p> 
                                          </div>
                             </div>
                             <div className=' w-full  md:w-[calc(100%-80%)] flex flex-col gap-y-3 text-white font-semibold'> 
                                             <button onClick={()=>dispatch(removeFromCart(course._id))} className=' flex  w-fit items-center gap-x-2 bg-richblack-800 py-3 text-center  px-5 md:px-3 text-pink-300 hover:text-pink-100 duration-200  rounded-lg border-[1.5px] border-richblack-500 '> 
                                                       <HiTrash className=' font-extrabold text-xl' />
                                                        <span className ='  text-base'>Remove</span> 
                                             </button>
                                             <div  className=''> 
                                                  <p className=' text-3xl text-yellow-50 font-inter font-medium py-1'>RS.{RupeesFormatChanger(course?.price)}</p>
                                             </div>
                             </div>
                      </div>
                )
            }) 
         } 
    </div>
  )
}
