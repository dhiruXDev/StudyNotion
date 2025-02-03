import React, { useEffect, useState } from 'react'
import { fetchInstructorAllCourse } from '../../../../services/operation/CourseDetailsAPI';
import { useSelector } from 'react-redux';
import { getInstructorDetailsWithStats } from '../../../../services/operation/ProfileAPI';
import { Instructor_cart_details } from './Instructor_cart_details';
import { Link } from 'react-router-dom';

export const Instructor_Details = () => {
  const[loading,setLoading] = useState(false);
  const{token} =useSelector((state)=>state.auth);
  const{user}=useSelector((state)=>state.profile)
  const[instructorData ,setInstructorData] =useState(null);
  const[courses,setCourses] =useState([]);
  useEffect(()=>{
       
       const getInstructotDEtailsWithStats = async()=>{
               setLoading(true);
             const instructorApiData = await  getInstructorDetailsWithStats(token);
             const courseData =  await fetchInstructorAllCourse(token);
             console.log( "Instructor api data ",instructorApiData)
             if(instructorApiData){
              
                 setInstructorData(instructorApiData);
             }
             if(courseData){
                 setCourses(courseData);
             }
             setLoading(false);
             console.log( "sdgs",instructorData);
             console.log("course", courses);
       }  
       getInstructotDEtailsWithStats();


  },[]);
  const totalAmount = instructorData?.reduce((acc,curr)=>acc + curr.totalAmountGenerated , 0);
  const totalStudent = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentEnrolled , 0);

  return (
    <div className=' lg:w-[1080px] w-full  mx-auto p-6 relative font-inter '> 
           <div className=' flex flex-col gap-y-1'>
               <h1 className=' text-3xl font-semibold'>Hii {user.firstName} 👏</h1>
               <p className=' text-richblack-400 text-base'>Let's start something new</p>
           </div>

           {
                loading ? (<div className='spinner relative  md:mt-[17%] mt-[50%]  mx-auto '> </div>)  : 
                    courses.length > 0 ? 
                    ( <div className=' w-full relative mt-5  '>
                              <div className=' w-full flex flex-col md:flex-row gap-x-5 '> 
                                      <div className=' bg-richblack-800 p-6 rounded-md w-full '>
                                            <Instructor_cart_details  courses={instructorData}/>
                                      </div>
                                      <div className=' bg-richblack-800   rounded-md p-6 md:mt-0 mt-5  md:w-[45%]  flex flex-col   '>
                                          <h1 className=' text-xl text-richblack-25 font-semibold'>Statics</h1>

                                          <p className=' text-richblack-400 font-semibold mt-3'>Total Course</p>
                                          <h1 className=' text-3xl font-semibold '>{courses.length}</h1>

                                          <p className=' text-richblack-400 font-semibold mt-3'>Total Students</p>
                                          <h1 className=' text-3xl font-semibold '>{totalStudent}</h1>

                                          <p className=' text-richblack-400 font-semibold mt-3'>Total Income</p>
                                          <h1 className=' text-3xl font-semibold '>RS. {totalAmount}</h1>
                                      </div>
                              </div>  

                                {/*Card details  */}
                                <div className=' flex flex-col gap-y-2 mt-3 py-5 bg-richblack-800 rounded-md'>
                                    <div className=' flex justify-between px-6  '> 
                                        <p className=' text-xl  font-semibold'>Your Courses</p>
                                          <Link to={"/dashboard/my-course"} className=' text-yellow-100 text-sm font-semibold hover:text-yellow-200 duration-300'>View All</Link>
                                    </div>
                                    {/* This is for large size */}
                                    <div className=' hidden md:!flex   gap-x-3 px-6 mt-3 '> 
                                        {
                                          courses.slice(0,4).map((course)=>(
                                            <div className=' flex flex-col gap-y-3 '>  
                                                  <img src= {course.thumbnail} className=' h-[180px] w-[240px] object-cover aspect-square rounded-sm' />
                                                  <div> 
                                                      <h1 className=' text-richblack-100 font-medium text-sm'>{course.courseName}</h1>
                                                      <div className=' flex gap-x-2  items-center text-richblack-300 text-xs font-semibold '>
                                                          <p> {totalStudent} students </p>
                                                          <p>|</p>
                                                          <p>RS.{course.price}</p>
                                                      </div>
                                                  </div>
                                            </div>
                                          ))
                                        }
                                    </div>
                                        {/* This is for small size */}
                                    <div className='md:hidden flex gap-x-3 px-6 mt-3 '> 
                                        {
                                          courses.slice(0,2).map((course)=>(
                                            <div className=' flex flex-col gap-y-3 '>  
                                                  <img src= {course.thumbnail} className=' h-[180px] w-[240px] object-cover aspect-square rounded-lg' />
                                                  <div> 
                                                      <h1 className=' text-richblack-100 font-medium text-sm'>{course.courseName}</h1>
                                                      <div className=' flex gap-x-2  items-center text-richblack-300 text-xs font-semibold '>
                                                          <p> {totalStudent} students </p>
                                                          <p>|</p>
                                                          <p>RS.{course.price}</p>
                                                      </div>
                                                  </div>
                                            </div>
                                          ))
                                        }
                                    </div>

                                </div>
                    </div>
                    ) 
                    : ( 
                    <div className=' w-full relative mt-10 border-t-[1.7px]  border-richblack-800 pb-6'> 
                        <h1 className=' mt-4    text-richblack-300  '>You have not Created Course Yet !</h1>
                          <Link to={'/dashboard/add-course'}  className='  text-blue-200  py-2  '>
                              Create Course
                          </Link>
                    </div> 
            )
           }
    </div>
   
  )
}
