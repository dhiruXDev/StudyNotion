import React, { useState } from 'react'
import { Table, Tbody, Td, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants'
import { HiMiniClock ,HiMiniCheckCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ConfirmationModal } from '../../../Common/ConfirmationModal';
import { deleteCourse, fetchInstructorAllCourse } from '../../../../services/operation/CourseDetailsAPI';
import { FormatDate } from '../../../../utils/FormatDate';
import { VideoDurationFormatter } from '../../../../utils/VideoDurationFormatter';
export const CourseTable = ({Courses,setCourses}) => {

    const[loading ,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const[confirmationModatData,setConfirmationmodalData] = useState(null);
    const dispatch  =useDispatch();
    const navigate =useNavigate();

// Courses.courseContent.subSection.timeDuration
    const DeleteHandler =async(courseId)=>{
              setLoading(true);
              await deleteCourse({courseId:courseId},token); // await deleteCourse({courseId},token);  ---> if i will send the courseid like that {courseId}  , it will not work , bq in backend courseId is fetching  like Key-value pair
              const result = await fetchInstructorAllCourse(token);
              if (result) {
                  
                   setCourses(result)
              } 
              setConfirmationmodalData(null)
              setLoading(false);
    }
   
  return (
    <div className=' relative border-[1.5px] border-richblack-800  rounded-md  mt-6 w-full '> 
          <Table className=' '>
                <Thead className=' border-b-[1.5px]  border-richblack-800  bg-richblack-700 '>
                      <Tr className=' flex justify-between items-center p-4 text-richblack-100 text-sm  font-medium font-inter select-none '>
                           <Td>COURSES</Td>
                           <Td className='md:pl-[60%]'>DURATION</Td>
                           <Td>PRICE</Td>
                           <Td>ACTION</Td>
                      </Tr>
                </Thead>
                <Tbody className='  '>
                   
                       {
                           Courses?.map((course)=>{
                            return(
                                 <Tr key={course._id} className=' flex   md:gap-x-10 p-4  mb-3  md:justify-between w-full'>
                                     <Td className='  md:py-0 py-3 flex  gap-x-4 md:justify-center md:w-[65%]    '>
                                         <img  src={course?.thumbnail}  className='  hidden md:!flex  md:h-[150px] md:w-[230px]  object-cover rounded-md'  />
                                         <div className=' flex flex-col  -ml-16 md:ml-0 md:justify-center gap-y-1 md:w-[calc(100%-230px)] '>
                                               <p className=' text-base font-semibold font-inter text-richblack-100'>{course.courseName}{" "}:</p>   
                                               <p className=' text-richblack-400 text-sm  '>
                                                        {course?.courseDescription.length > 15 ?  
                                                                                              course.courseDescription.split(" ").splice(0 , 15).join(" ")+ "..." : course.courseDescription}
                                                </p>
                                               <p className=' py-2 text-xs text-richblack-100   font-inter font-medium  '>Created : {FormatDate(course.createdAt)}</p>    {/*   Date addd krna hai */}
                                                {
                                                  course?.status ===  COURSE_STATUS.DRAFT ?
                                                   
                                                   (  <div  className=' w-[100px]  gap-x-2 flex items-center  justify-center  bg-richblack-800  rounded-2xl p-2  text-pink-400'>
                                                           <HiMiniClock className=' text-pink-100' />
                                                           <span  className=' text-sm font-inter  text-pink-200' >Drafted</span>
                                                     </div> )  
                                                   
                                                   : (
                                                     <div className=' flex gap-x-2 w-[100px]   items-center  justify-center bg-richblack-800  rounded-2xl p-1.5 '> 
                                                           <HiMiniCheckCircle  className=' text-yellow-25'  />
                                                           <span className=' text-sm font-inter text-yellow-50'>Published</span>
                                                       </div>
                                                   )
                                                } 
                                         </div>
                                     </Td> 
                                   
                                     <Td className='  md:py-0  py-3 md:pl-4  flex items-center justify-center text-richblack-200 font-semibold text-[14px] leading-[22px]'>
                                          {/* <p>{course?.courseContent?.subSection?.timeDuration}</p> */}
                                          {course?.courseContent?.map((content, contentIndex) => (
                                                <div key={contentIndex} className=' -ml-16 md:ml-0'>
                                                        {content?.subSection?.map((subSection, subIndex) => (
                                                            <p key={subIndex} >{  subSection?.timeDuration  ? VideoDurationFormatter( subSection?.timeDuration ) :'No Duration'}</p>
                                                        ))}
                                                </div>
                                    ))}
                                     </Td>
                                     <Td className=' md:py-0  py-3 flex items-center justify-center text-richblack-200 font-semibold text-[14px] leading-[22px]'>
                                          <span className=' -ml-16 md:ml-0'>₹{course.price}</span>
                                     </Td>
                                     <Td className='  pr-2 flex gap-x-10 md:gap-x-2 items-center justify-center text-richblack-200 font-bold  text-xl   '>
                                              <button
                                                 disabled= {loading}
                                                 onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                                                 className=' hover:text-blue-200 duration-200  -ml-16 md:ml-0 '
                                              >
                                                <MdEdit />   
                                              </button>
                                              <button   disabled={loading}
                                                        className=' hover:text-blue-200 duration-200 md:ml-0 ml-5'
                                                        onClick={()=>setConfirmationmodalData({
                                                                  heading: "Do you want to delete this course ?", 
                                                                  discription: 'All data related to this course will be deleted',
                                                                  btn1Text: !loading ? 'Delete' : 'Loading...',
                                                                  btn2Text: 'Cancel',
                                                                  btn1Handler: !loading ? ()=>DeleteHandler(course._id) : {},
                                                                  btn2Handler: !loading? ()=>setConfirmationmodalData(null) : {}
                                              })} >
                                                    <FaRegTrashAlt />
                                              </button>
                                     </Td>                                     
                                 </Tr>
                            )
                          })
                       }
                </Tbody>
          </Table>
          {
            confirmationModatData && <ConfirmationModal modalData={confirmationModatData} />
          }
    </div>
  )
}
