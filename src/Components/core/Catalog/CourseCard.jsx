import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import  GetAvgRating   from '../../../utils/avgRating';
import RatingStars from '../../Common/RatingAndStar';
import { RupeesFormatChanger } from '../../../utils/RupeesFormatChanger';
export const CourseCard = ({course}) => {
    const [avgReviewsCount , setavgReviewsCount] = useState(0);
    useEffect(()=>{   
                  const count =   GetAvgRating(course?.ratingAndReviews);
                  setavgReviewsCount(count);
    },[course])
  return (
     <>
           <Link  to={`/Courses/${course._id}`} >
                    <div className={`flex h-fit  overflow-y-hidden mt-4 flex-col gap-y-2 gap-x-4 `}>
                          <div className= {`h-[290px] relative  flex items-center `}>
                              <img src={course?.thumbnail} alt='Course thumbnail'   className={`h-full w-full rounded-xl  object-cover   `}   />
                          </div>
                          <div className=' flex flex-col gap-y-1'>
                               <p className=' text-lg text-richblack-25 font-medium pr-4'>{course?.courseName}</p>
                               <p className=' text-base text-richblack-300'>{"Author: "}{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                               <div className=' flex gap-x-2'>
                                     <span className=' text-yellow-100 font-semibold'>{avgReviewsCount || 4.5}</span>
                                    <RatingStars  Review_Count={avgReviewsCount}  />
                                    <span className=' text-richblack-400'>{course.ratingAndReviews?.length} Rating</span>
                               </div>
                               <p className=' font-medium text-xl'>RS. { RupeesFormatChanger(course.price)}</p>
                          </div>
                    </div>
            </Link>
    </>
  )
}
