import React from 'react'
 
import { CourseCard } from './CourseCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import required modules
 
export const CourseSlider = ({Courses}) => {
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
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
     <>
          {
             Courses?.length === 0 ? (
              <h1 className=' text-sm md:text-xl py-2  mt-4 md:font-semibold  text-richblack-100 md:text-white pb-4 '>No Course Found For Selected Category</h1>
             ) : 
             <div className=' w-full m-auto  h-fit    '>
             <Slider {...settings} >
                        { 
                          Courses?.map((course , index)=>(
                                    <CourseCard key={index}   course={course}  />  
                          ))
                        }
               </Slider>
               </div>
          }  
     </>
  )


}
{/* <>
        Isko Fragment bolte hai isko --->  <> </> 
    </> 

*/}


{/* <Swiper
loop={true} 
slidesPerView={1} // Dynamically adjust slidesPerView
spaceBetween={20}
modules={[Pagination,Autoplay,Navigation]}
className="mySwiper   "
navigation ={true}
breakpoints={{
  640: { 
      slidesPerView: 1,  
   },
   768: { 
    slidesPerView: 2,  
 },
  1024: {
    slidesPerView: 3,
  },
}}
pagination={{
  dynamicBullets: true,
}}
autoplay= {{
  delay : 3000,
  disableOnInteraction :false
}}

> */}

// responsive: [
//   {

//     breakpoint: 1024,

//     settings: {

//       slidesToShow: 2,

//       slidesToScroll: 1,

//     },

//   },

//   {

//     breakpoint: 600,

//     settings: {

//       slidesToShow: 1,

//       slidesToScroll: 1,

//     },

//   },

// ],