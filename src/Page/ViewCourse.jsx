import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { setCompletedLecture, setCourseSectionData, setEntireCourseData, setTotalNoOfLecture } from '../slices/viewCourseSlice';
import { VideoDetailsSideBar } from '../Components/core/ViewCourse/VideoDetailsSideBar';
import { CourseReviewModal } from '../Components/core/ViewCourse/CourseReviewModal';
import { getCourseDetails } from '../services/operation/CourseDetailsAPI';

import  "../Components/Common/spinner.css"
export const ViewCourse = () => {
    const {courseId} =useParams();
    const [reviewModal ,setReviewModal] = useState("");
    const {token} =useSelector((state)=>state.auth);
    const dispatch = useDispatch();

  useEffect(()=>{
           const getFullCourseDetails =async()=>{
                 const courseData = await getCourseDetails(courseId ,token);
                 console.log( "COurse data -- ", courseData);
                 if(!courseData){
                     console.log( "Error while fetching all details of course " );
                     return;
                 }
                 dispatch(setEntireCourseData(courseData));
                 dispatch(setCourseSectionData(courseData.courseContent));
                 dispatch(setCompletedLecture(courseData.courseProgresses));
                 let totalLecture =0;
                 courseData.courseContent.forEach(sec => {
                        totalLecture += sec.subSection.length;
                 });
                 dispatch(setTotalNoOfLecture(totalLecture));
           }
           if(courseId){
               getFullCourseDetails();
           }
    },[]);

  return (
      <>
            <div className=" flex  w-[100%] h-[100%]   gap-x-5  relative" >
                    <VideoDetailsSideBar  setReviewModal= {setReviewModal}  />
                    <div >     {/*   Children will show means, VideoSidebar will appear every time and in childs they changed if needed  */}
                        <Outlet />
                    </div>
                    {
                        reviewModal && <CourseReviewModal  setReviewModal ={setReviewModal} />
                    }
            </div>
                    
      </>
  )
}
