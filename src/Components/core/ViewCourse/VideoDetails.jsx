import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchCompletedLecturesAPI, markLectureAsComplete } from '../../../services/operation/CourseDetailsAPI';
import { updateCompletedLecture } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import { FaPlay } from "react-icons/fa";
import { IconBtn } from '../../Common/IconBtn';
import { Autoplay } from 'swiper/modules';
export const VideoDetails = () => {
  const {courseId ,sectionId,subSectionId} =useParams();
  const {courseSectionData,courseEntireData, completedLecture,  totalNoOfLecture} = useSelector((state)=>state.viewCourse);

  console.log("Data --- ", completedLecture);
  
  const {token} = useSelector((state)=>state.auth);
  const navigate =useNavigate();
  const location =useLocation()
  const dispatch =useDispatch();

  const[videoData,setVideoData] =useState("");
  const[videoEnd,setVideoEnd] =useState(false);
  const[loading,setLoading] = useState(false);
  const playerRef = useRef();    // why we use UseRef() hook

  // EXTRA , hATA BHI SKTE HO------------------------------------------
//   useEffect(() => {
//      const fetchCompletedLectures = async () => {
//        const res = await fetchCompletedLecturesAPI({courseId, subSectionId} , token);
//        console.log("Respoine ",res);
//        if (res) {
//          dispatch(updateCompletedLecture(res?.completedVideos ));
//          console.log("vaaa ", completedLecture);
//        }

//      };
//      if(completedLecture.length < 1 )
//           { fetchCompletedLectures();}
//    }, [subSectionId , token]);

  useEffect(()=>{
          const setSpecificVideoData = async()=>{
                   if(courseSectionData.length==0)
                          return;
                   if(!courseId && !sectionId && !subSectionId){
                          navigate("/dashboard/enrolled-course");
                   }else{
                    // All of 3 are present   , measn now i have to show the video on UI
                          let filteredData = courseSectionData.filter((course)=>course._id === sectionId);
                          let filteredVideoData = filteredData?.[0].subSection.filter((data)=>data._id === subSectionId);   // video mil gya hai
                          setVideoEnd(false);
                          setVideoData(filteredVideoData[0]);
                   }
          }
          setSpecificVideoData();
  },[ courseEntireData,courseSectionData, location.pathname ])
 
  const isFirstVideo =()=>{
           const currentSectionIndex = courseSectionData.findIndex((data)=> data._id === sectionId); console.log("dsgds",currentSectionIndex )
           const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
           if (currentSubSectionIndex === 0 && currentSectionIndex === 0) {
                      return true;
           }else{
                    return false;
           }
  }
  const isLastVideo = ()=>{
           const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId);
           const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
           const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

           if (currentSectionIndex === courseSectionData.length - 1  && currentSubSectionIndex === noOfSubSections - 1) {
                     return true;
           }else{
                     return false;
           }
  }

  const goToNextVideo =()=>{
           const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId);
           const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id === subSectionId);
           const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;  //SubSection Length

           if (currentSubSectionIndex !== noOfSubSections - 1) {
                // Means same section ke next vale video me jana hai
                const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
                navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
           }else{
                // next vale section me jakr pahla video me jana hai
                const nextSectionId = courseSectionData[currentSectionIndex + 1 ]._id;
                const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
                navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
           }
  }
  const gotoPrevVideo = ()=>{
           const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId);
            const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=> data._id === subSectionId);
           if (currentSubSectionIndex !== 0) {
                 // Same section ki preivous Video pr jana hai
                const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
                navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
           }else{
                // prevous section ke last vale vodeo me
                const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
                const PresubsectionLength = courseSectionData[currentSectionIndex -1].subSection.length;
                const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[PresubsectionLength -1]._id;
                navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
           }
  }
  const handleLectureComplition = async()=>{
          setLoading(true);
          const res = await markLectureAsComplete({courseId : courseId , subSectionId : subSectionId} ,token);
          //Update the state
          if(res){
                dispatch(updateCompletedLecture(res?.completedVideos)); 
          }
          // console.log("Sendff" ,completedLecture);
          setLoading(false);
  }
               
  return (
    <div className = " w-11/12 lg:w-[980px] text-richblack-5 relative  overflow-y-auto   ">
         {
            !videoData ? (<h1 className =' mt-[4rem]  left-[48px] '>No course Found</h1>) : 
              (
                     <div  className="  w-full  text-richblack-5 mt-3  rounded-md relative" >
                          <Player 
                               ref={playerRef}
                               aspectRatio= "16:9"
                               playsInline
                               onEnded={()=>setVideoEnd(true)}
                               src={videoData?.videoURL}
                           >
                               {/* <FaPlay className=' absolute' /> */}
                               {
                                  videoEnd && (
                                    <div> 
                                                       {/*-------------- Mark as Completed lecture ------------*/}
                                          {
                                             !completedLecture.includes(subSectionId) && (
                                                 <IconBtn 
                                                     text={!loading ? "Mark As Completed" : "Loading..."} 
                                                     disabled={loading}
                                                     onClick={()=>handleLectureComplition()}
                                                     customClasses="absolute top-[58%] left-[43%] z-50"
                                                 />
                                             )
                                           }
                                           { 
                                             <div className=' absolute   bg-blue-100 bgb inset-0 h-full w-full z-10 opacity-50 blur-sm'> </div>
                                           }
                                                    {/* -------Rewatch button------ */}
                                          
                                          {
                                               <IconBtn   
                                                 disabled={loading}
                                                 text={"Rewatch"}
                                                 onClick={()=>{
                                                     if(playerRef?.current){
                                                      playerRef.current?.seek(0);
                                                      setVideoEnd(false);
                                                    // Ensure autoplay is enabled for the player
                                                       if (playerRef.current?.autoplay !== undefined) {
                                                            playerRef.current.autoplay = true; // Set autoplay to true
                                                       }
                                                       // Alternatively, manually play the video
                                                       playerRef.current?.play();
                                                     }
                                                 }}
                                                   customClasses="absolute top-[40%] left-[43%] z-50"
                                                 />
                                          }

                                          {
                                              isFirstVideo ||  isLastVideo ? 
                                              (
                                                  <div>
                                                  {
                                                   !isFirstVideo() && (
                                                     <button 
                                                         disabled={loading}
                                                         onClick={()=>gotoPrevVideo()}
                                                         className =" absolute   top-[48%] left-[53%] z-50 bg-richblack-800 py-2 px-7 rounded-md text-richblack-5 font-inter font-medium text-lg  hover:bg-richblack-700 transition-all duration-200"
                                                         >
                                                            Prev
                                                     </button>
                                                   )
                                                  }
                                                  {
                                                    !isLastVideo() && (
                                                     <button onClick={()=>goToNextVideo()} disabled={loading}
                                                            className =" absolute   top-[48%] left-[43%] z-50 bg-richblack-800 py-2 px-8 rounded-md text-richblack-5 font-inter font-medium text-lg  hover:bg-richblack-700 transition-all duration-200"
                                                     >
                                                         Next
                                                     </button>
                                                    )
                                                  }
                                             </div>                                                      
                                              ) : (<div> </div>)
                                          }



                                    </div>
                                  )
                               }

                          </Player>
                     </div> 
              )  
         }
         <div className=' flex flex-col gap-y-2 mt-3 relative'>
               <h1 className=' text-2xl font-semibold'>{videoData.title}</h1>
               <p className=' w-[70%] text-richblack-100 text-base  '>{videoData.description}</p>
         </div>

    </div>
  )
}
