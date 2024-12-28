import React, { useEffect, useRef, useState } from 'react'
import { apiConnector } from '../../../services/apiConnector'
import { useDispatch, useSelector } from 'react-redux';
import { enrolledCourses } from '../../../services/operation/ProfileAPI';
import spinner from "../../Common/spinner.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import { VideoDurationFormatter } from '../../../utils/VideoDurationFormatter';
import { Table, Tbody, Thead, Tr ,Td} from 'react-super-responsive-table';
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { HiMiniTrash } from "react-icons/hi2";
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { markLectureAsComplete } from '../../../services/operation/CourseDetailsAPI';
export const EnrolledCourses = () => {
  const[enrolledCourse , setEnrolledCourse] = useState(null);
  const[loading,setLoading] = useState(false);
  const [isVisible ,setIsvisible] =useState(false);
  const {token} = useSelector((state)=>state.auth);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const[pageType ,setPageType] = useState("all");
  const[contextMenuCoordinate ,setContextMenuCoordinate] = useState({ x :0 , y : 0});
  
//This both line useref vala added for dropdown behaviour means, when i clicked outside of 3dot (in which div i uses ref={ref}) that div will invisiblle
//****** 
  const ref = useRef(null);
  useOnClickOutside(ref , ()=>setIsvisible(false));
// ******
 async function getEnrolledCourse(){
    try {
             const result = await  enrolledCourses(token)  ; 
             if(result === "Login-karo"){
                 navigate("/logIn")
             }           
             setEnrolledCourse(result);
             console.log("All coursedata ", result)

    } catch (error) {
          console.log("Erorr during fetching Course details", error.message);
    }
  }
  useEffect(()=>{
    getEnrolledCourse();
  },[])

  // This is for context menu 
  const showContextMenu = (e)=>{
    e.stopPropagation(); 
    setIsvisible((prevState) => !prevState);

    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenuCoordinate({
      x: rect.bottom , // Below the element
      y: rect.left + rect.width / 2 - 120, // Center-align the menu horizontally
    });

  }
  const handleThreeDots = async()=>{
              setIsvisible(false);
              const courseId = enrolledCourse._id;
              const subSectionId =enrolledCourse?.courseContent;

              // setLoading(true);
              // const res = await markLectureAsComplete({courseId : courseId , subSectionId : subSectionId} ,token);
              // //Update the state
              // if(res){
              //       dispatch(updateCompletedLecture(res?.completedVideos)); 
              // }

              // setLoading(false);

  }

  // As doing--->  e.stopPropagation() the parent event property will remove from children 
    return (
<div className=' w-[100%] flex flex-col  p-6 font-inter   '> 
      <div className=' flex flex-col gap-y-1 '>
            <span className=' text-lg  text-richblack-50 font-medium pt-2'>Home{"   "} / Dashboard / <span className=' text-yellow-25 text-base font-medium'>Enrolled courses</span></span>
            <h1 className=' text-3xl  text-richblack-25 pt-1 '>Enrolled Courses</h1>
      </div>
      <div className=' max-w-max flex items-center  justify-between gap-x-1  bg-richblack-800 border-b-[1.7px]  border-richblack-700  py-0.5 px-1  rounded-full mt-5 text-richblack-400'>
                                    <button onClick={()=>setPageType("all") } className={`${pageType=='all' ? " bg-richblack-900  text-richblack-5   rounded-full " : " bg-transparent text-richblack-300" }  py-2 px-5`} >All</button>  
                                    <button onClick={()=>setPageType("pending") } className={`${pageType=='pending' ? " bg-richblack-900  text-richblack-5   rounded-full " : " bg-transparent text-richblack-300" }  py-2 px-5`}>Pending</button>
                                    <button onClick={()=>setPageType("completed") } className={`${pageType=='completed' ? " bg-richblack-900  text-richblack-5   rounded-full " : " bg-transparent text-richblack-300" }  py-2 px-5`}>Completed</button>
        </div>
      {/* 3rd part */}
      <div className=' w-full lg:w-[1080px]  h-full flex flex-col gap-y-2 relative md:pr-5 '>
          {
              !enrolledCourse ? ( <div className=' grid min-h-[calc(100vh-2.5rem)] place-items-center'>  
                                        <div className='spinner'> </div>
                                  </div>) 
              : (
                  enrolledCourse.length == 0 ? 
                  ( <div className='grid mt-5 h-[50vh] w-[80%] place-content-center text-lg text-richblack-100 border-t-[2px] border-richblack-600'> You have not enrolled in any Courses</div>) :                 
                  ( 
                      <div className=' w-full lg:w-[1080px]  border-[1.5px] border-richblack-700 rounded-lg mt-6 flex flex-col gap-y-3  relative '>

                             <Table  className=''>
                                   <Thead className=' bg-richblack-700   rounded-t-lg  text-[14.5px] text-richblack-50'>
                                       <Tr className='  flex justify-between items-center text-richblack-50  py-5 px-3'>
                                         <Td className=' md:w-1/3'>Course Name</Td>
                                         <Td className=' md:w-1/4'>Duration</Td>
                                         <Td className='md:w-1/4'>Progress</Td>
                                         <Td className=' md:!flex !hidden md:w-1/12'></Td>
                                       </Tr>
                                   </Thead>

                                   <Tbody className='  '>
                                      {
                                         enrolledCourse.map((course ,index)=>{
                                          let totaltime = 0;
                                          if(course.courseContent)
                                          
                                            {
                                             course.courseContent.forEach((sub)=>{
                                                        if(sub.subSection){
                                                          sub.subSection.forEach((id)=>{
                                                              // Convert timeDuration from string to float and add it to totalDuration
                                                              totaltime += parseFloat(id.timeDuration);
                                                          
                                                          })
                                                        }
                                             })
                                          }
                                          return(
                                                 <Tr key={index} onClick={ ()=>navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0].subSection?.[0]._id}`)} className=' cursor-pointer flex  justify-between  pl-5  pr-20 py-5 border-b-[1.5px] border-richblack-700 '>
                                                      <Td className=' py-3 md:py-0 md:w-1/3'>
                                                          <div className=' flex items-center gap-x-2 '>
                                                              <div  className=' hidden md:!flex  md:w-24 h-14'>
                                                                  <img src={course?.thumbnail}   className=' h-full w-full  rounded-lg object-cover' />
                                                              </div>
                                                              <div className=' flex flex-col '> 
                                                                          <h2 className=' text-richblack-25 text-base'>{course.courseName}</h2>
                                                                          <p className=' hidden md:!flex text-richblack-100 text-sm'>{course.courseDescription?.length > 20  ?  `${course.courseDescription?.slice(0,20)}...` :` ${course.courseDescription}` } </p>
                                                              </div>
                                                          </div>
                                                      </Td>

                                                      <Td className='  py-3 md:py-0 md:w-1/4 text-richblack-25'>
                                                           <p>{ VideoDurationFormatter(totaltime)}</p>   
                                                      </Td>

                                                      <Td  className=' py-3 md:py-0 md:w-1/4'>
                                                            <div className=' flex flex-col gap-2'> 
                                                                  <p className=' text-sm text-richblack-50 font-medium'>Progress: {course.progress || 0}%</p>
                                                                  <ProgressBar  
                                                                          completed={course.progressPercentage || 0}
                                                                          height='8px'
                                                                          width='220px'
                                                                          isLabelVisible={false}
                                                                          baseBgColor='#e0e0e0'
                                                                          bgColor='#2196F3'
                                                                      />
                                                              </div>
                                                      </Td>
                                                      
                                                      <Td onClick={(e)=>{showContextMenu(e) }}
                                                                         className='    flex items-center justify-center  relative   rounded-full py-0.5 px-3'>
                                                          <BsThreeDotsVertical className=' text-2xl text-center text-richblack-200 hover:text-richblack-50   rounded-full px-2 py-2 w-fit h-fit hover:hover:bg-richblack-800   cursor-pointer ' />
                                                      </Td>
                                                      
                                                 </Tr>  
                                          )
                                         }
                                        )
                                      }
                                   </Tbody>
                             </Table>
   
                      </div>
                    ) 
                  )
            }
      </div>
{
  isVisible  && (
  <div
    ref={ref}
    onClick={(e) => e.stopPropagation()}
    style={{
      top: contextMenuCoordinate.x,
      left: contextMenuCoordinate.y,
      
    }}
    className=" z-[1000] absolute w-[220px] bg-richblack-600 rounded-lg py-2 px-2 border-[1.5px] border-richblack-500"
  >                    <div onClick={handleThreeDots } className=' flex gap-x-3 items-center  py-3 cursor-pointer hover:text-richblack-50 transition-all duration-200 ' > 
                        <BsFileEarmarkCheckFill className=' text-2xl font-semibold'/>
                        <span className=' text-md font-semibold'>Mark as Complete</span>
                    </div>

                    <div onClick={()=>setIsvisible(false)} className=' flex  items-center gap-x-3 py-2 cursor-pointer hover:text-richblack-50 '> 
                        <HiMiniTrash className=' text-2xl font-semibold'/>
                        <span className=' text-md font-semibold'>Remove</span>
                    </div>
              </div>
  )
}
      

    </div>
  )
}

