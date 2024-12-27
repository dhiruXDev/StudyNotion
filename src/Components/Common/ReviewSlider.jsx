import React, { useEffect, useState } from 'react'
import { RatingAndReviewEndPoint } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import RatingStars from './RatingAndStar';
import ReactStars from "react-rating-stars-component";
import { FaStar } from 'react-icons/fa';
 

export const ReviewSlider = () => {
     
  const { GET_ALL_RATING_AND_REVIEW_API }=RatingAndReviewEndPoint
  const [reviews ,setReviews] =useState([]);
  useEffect( ()=>{
        const fetchAllRatingData = async()=>{
            const  {data} = await apiConnector("GET",GET_ALL_RATING_AND_REVIEW_API); // Destructing of response , i can also do 
            setReviews(data.Allreviews)
            // const response = await apiConnecto(...........);
            // setReviews(response.data.Allreviews)  ---> both are same New technique
            
           console.log(reviews)        
            //console.log( "Response of Rating ", {data});

        }
         
        fetchAllRatingData();
  },[]) 
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  };

  return (
          <div className=' h-[260px]  max-w-maxContent px-5 base:px-14 relative '>
              <Slider {...settings} >
                    {
                        reviews.map((review ,index)=>{
                            return( 
                                    <div className=' flex h-[180px]  lg:h-[210px]  relative flex-col gap-y-5 text-richblack-5  bg-richblack-800 p-6 rounded-md '>
                                        <div className=' flex gap-x-6 items-center  '>
                                                <div>
                                                    <img src={review?.user.image} className=' h-10 w-10 base:h-14 base:w-14 aspect-square rounded-full' /> 
                                                </div>
                                                <div className=' flex flex-col py-2'>
                                                    <p className=' text-richblack-100 font-medium text-base'>{review.user.firstName } { review.user.lastName}</p>
                                                    <p className=' text-richblack-600 font-medium'>{review.user.email}</p>
                                                </div>
                                        </div>
                                        <span  className=' text-richblack-100 text-sm'>
                                              {review.reviews}
                                        </span>
                                         <div className=' flex gap-x-3 items-center '>
                                              <span className=' text-yellow-200 font-semibold text-lg '>{review.rating.toFixed(1)}</span>       {/* toFixed(1) means it will hadle when entere 2.5 , it will show 2.5 , means it will give digit upTo one decimal  */}
                                               <ReactStars 
                                                    value={review.rating}
                                                    count={5}
                                                    edit={false}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    emptyIcon={ <FaStar />}
                                                    fullIcon ={<FaStar />}
                                               />
                                         </div>
                                        
                                    </div>
                            )
                        })
                    }
                     
                </Slider>  
          </div>
    
  )
}
