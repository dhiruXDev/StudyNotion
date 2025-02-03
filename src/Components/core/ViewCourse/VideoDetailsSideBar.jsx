// import React, { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { IoChevronBackCircleSharp } from "react-icons/io5";
// import { FaChevronUp } from "react-icons/fa";
// import {HiDesktopComputer} from "react-icons/hi"
// import { FaPlay } from "react-icons/fa";
// import HighlightText from '../HomePage/HighlightText';
 
// import "../HomePage/gradeint.css"

// export const VideoDetailsSideBar = ({setReviewModal}) => {
    
//     const[activeStatus ,setActiveStatus] =useState("");
//     const[videoBarActive ,setVideoBarActive] =useState("");
//     const location = useLocation();   // location = location.pathname -->fetcch the current URL where U stand
//     const{sectionId ,courseId,subSectionId} =useParams();
//     const navigate = useNavigate();
//     const[isOpen ,setIsOpen] = useState([]);

//     const {
//             courseSectionData,
//             couseEntireData,
//             completedLecture,
//             totalNoOfLecture
//     } = useSelector((state)=>state.viewCourse);

//       // const state = useSelector((state)=>state);
//      console.log( "Completed lec-- ",completedLecture)
//     //console.log( "CourseEntire Data ",couseEntireData)
    
//     const handleIsActive = (id)=>{
//         //  console.log("Id",id);
//           setIsOpen(!isOpen.includes(id) ? isOpen.concat([id]) : isOpen.filter((e)=> e != id));
//     }

//     useEffect(()=>{
//         ;(()=>{
//               if(courseSectionData.length === 0){
//                  return;
//               }
//               const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId);
//               const currentSubSectionIndex =courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data)=>data._id === subSectionId);
//               const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
//               setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);   //Set Current section here 
//               setVideoBarActive(activeSubSectionId);   // Set current subsection (means lecture) here.
//         })()

//         //upper vala is new Syntax for function defining and calling
//     },[location.pathname , courseSectionData,couseEntireData])

//     const[sectionHeight ,setSectionHeight] =useState(0);
//     const [active ,setActive] =useState(false);
//     const contetnE1 = useRef(null);

//     useEffect(()=>{
//         setSectionHeight(active ? contetnE1.current.scrollHeight : 0);
//     },[active])
//   return (
//      < >
//          {/*For Section and subsection */}
//          <div className = " h-[calc(100vh-3.8rem)] w-[350px] max-w-[370px]     font-inter bg-richblack-800 pt-5 flex flex-col relative ">
//                   <div className=' flex flex-col gap-y-6 px-4 pb-3  '>
//                                 <div className=' flex gap-x-2 flex-row items-center justify-between gap-y-2 text-richblack-5'>
//                                         <div >
//                                             <IoChevronBackCircleSharp className=' text-richblack-25 text-4xl cursor-pointer'  onClick={()=>navigate("/dashboard/enrolled-course")} />
//                                         </div>
//                                         <div>
//                                             <button onClick={()=>setReviewModal(true)} className=' bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-all duration-300 text-richblack-800 font-semibold'>
//                                                 Add Review
//                                             </button>
//                                         </div>
//                                 </div>      
//                                 <div className=' flex  items-center gap-x-5 text-richblack-5  '>
//                                     <span className=' text-2xl font-semibold '>{couseEntireData?.courseName}</span>
//                                     <span className=' text-gradient font-semibold text-lg'> {completedLecture.length } / {totalNoOfLecture}   </span>
//                                 </div>
                               
//                                 <div className=' h-[0.8px] w-[98%] bg-richblack-600'> </div>

//                     </div>

//                 {
//                     courseSectionData?.map((section ,index)=>(
//                         <div key={index} onClick={()=>handleIsActive(section._id)} className='   '> 
//                               {/* For Section  */}
//                               <div className=' flex gap-x-2 justify-between cursor-pointer bg-richblack-700 border-b-[1.6px] border-richblack-500 text-richblack-25 text-base font-medium font-inter items-center py-4 px-4'> 
//                                     <span>{section.sectionName}</span>
//                                     <i className={`${isOpen.includes(section._id) ? "rotate-180" : "rotate-0"} transition-all duration-200`} >
//                                         <FaChevronUp   className={` text-sm `} />
//                                     </i>
//                               </div>
//                               {/* For subSection */}
//                               <div className=' my-1'> 
//                                     {
//                                         activeStatus === section._id && (
//                                                 section?.subSection?.map((subSection , index)=>(
//                                                      <div    
                                                        
//                                                              key={index} className={`${videoBarActive === subSection._id ? "   text-blue-100" : " bg-richblack-800   text-richblack-100"}  relative   duration-[0.35s] ease-[ease] cursor-pointer  flex items-center gap-x-3 py-3 px-3`}
//                                                                       onClick={()=>{
//                                                                                         navigate(`/view-course/${couseEntireData?._id}/section/${section?._id}/sub-section/${subSection._id}`)
//                                                                                         setVideoBarActive(subSection?._id)
//                                                                                     }}> 
//                                                             {
//                                                                 videoBarActive === subSection._id ? ( <FaPlay /> ) : ( <input  
//                                                                                                                             type='checkbox'
//                                                                                                                             onChange={()=>{}}
//                                                                                                                             checked = {completedLecture?.includes(subSection._id)}
//                                                                                                                              className=' cursor-pointer'
//                                                                                                                             />) 
//                                                             } 

//                                                             {
//                                                                 completedLecture.includes(subSection._id) ? ( <del>{subSection.title}</del>) : (<span>{subSection.title}</span>)
//                                                             } 
//                                                             <HiDesktopComputer  className=' text-richblack-100 text-xl' />
//                                                      </div>

//                                                 ))
                                             
//                                         )
//                                     }
//                               </div>
//                         </div>
//                     ))
//                 }
//          </div>
//      </>
    
//    )
// }

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import "../HomePage/gradeint.css";
import { fetchCompletedLecturesAPI } from '../../../services/operation/CourseDetailsAPI';
import { updateCompletedLecture } from '../../../slices/viewCourseSlice';
import '../../../App.css'
 
export const VideoDetailsSideBar = ({ setReviewModal }) => {
  
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const [isOpen, setIsOpen] = useState([]);

    const location = useLocation();
    const {courseId, sectionId, subSectionId } = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch =useDispatch();
    const navigate = useNavigate();
    // const state = useSelector((state)=>state);
    // console.log("All Srtate is -- ", state);
    const {
        courseSectionData,
        couseEntireData,
        completedLecture,
        totalNoOfLecture
    } = useSelector((state) => state.viewCourse);

    const handleIsActive = (id) => {
        setIsOpen(!isOpen.includes(id) ? isOpen.concat([id]) : isOpen.filter((e) => e !== id));
    };

    // Fetcing the , completed lecture 
  useEffect(() => {
    const fetchCompletedLectures = async () => {
      const res = await fetchCompletedLecturesAPI({courseId, subSectionId} , token);
      if (res) {
       dispatch(updateCompletedLecture(res.completedVideos));
      } 
    };
    fetchCompletedLectures();
  }, [subSectionId , token ,completedLecture.length] );
//Adding completedLecture.length as a dependency ensures the useEffect runs only if the length of completedLecture is less than 1, preventing unnecessary fetches once the data is already loaded.

    useEffect(() => {
        if (courseSectionData.length === 0) return;

        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId);
        const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

        const activeSectionId = currentSectionIndex !== -1
            ? courseSectionData[currentSectionIndex]._id
            : courseSectionData[0]._id; // Default to first section if no sectionId

        setActiveStatus(activeSectionId);
        setVideoBarActive(activeSubSectionId);

        if (!isOpen.includes(activeSectionId)) {
            setIsOpen((prev) => [...prev, activeSectionId]);
        }
    }, [location.pathname, courseSectionData, sectionId, subSectionId]);

    useEffect(() => {
        // Ensure the first section is open by default
        if (courseSectionData.length > 0 && isOpen.length === 0) {
            setIsOpen([courseSectionData[0]._id]);
        }
    }, [courseSectionData]);

    return (
        <>
            <div className=" min-h-[calc(100vh-3.8rem)] w-[350px] max-w-[370px] font-inter bg-richblack-800 pt-5 flex flex-col relative  custom-scrollbar !overflow-auto   custom-scrollbar   ">
                <div className='flex flex-col gap-y-6 px-4 pb-3'>
                    <div className='flex gap-x-2 flex-row items-center justify-between gap-y-2 text-richblack-5'>
                        <div>
                            <IoChevronBackCircleSharp className='text-richblack-25 text-4xl cursor-pointer' onClick={() => navigate("/dashboard/enrolled-course")} />
                        </div>
                        <div>
                            <button onClick={() => setReviewModal(true)} className='bg-yellow-50 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-all duration-300 text-richblack-800 font-semibold'>
                                Add Review
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-5 text-richblack-5'>
                        <span className='text-2xl font-semibold'>{couseEntireData?.courseName}</span>
                        <span className='text-gradient font-semibold text-lg'>{completedLecture.length} / {totalNoOfLecture}</span>
                    </div>
                    <div className='h-[0.8px] w-[98%] bg-richblack-600'> </div>
                </div>

                {courseSectionData?.map((section, index) => (
                    <div key={index}>
                        <div onClick={() => handleIsActive(section._id)} className='flex gap-x-2 justify-between cursor-pointer bg-richblack-700 border-b-[1.6px] border-richblack-500 text-richblack-25 text-base font-medium font-inter items-center py-4 px-4'>
                            <span>{section.sectionName}</span>
                            <i className={`${isOpen.includes(section._id) ? "rotate-180" : "rotate-0"} transition-all duration-200`}>
                                <FaChevronUp className='text-sm' />
                            </i>
                        </div>
                        <div className='my-1' style={{ height: isOpen.includes(section._id) ? "auto" : "0", overflow: "hidden" }}>
                            {section?.subSection?.map((subSection, index) => (
                                <div
                                    key={index}
                                    className={`${videoBarActive === subSection._id ? "text-blue-100" : "bg-richblack-800 text-richblack-100"} relative duration-[0.35s] ease-[ease] cursor-pointer flex items-center gap-x-2 py-3 px-3`}
                                    onClick={() => {
                                        navigate(`/view-course/${couseEntireData?._id}/section/${section?._id}/sub-section/${subSection._id}`);
                                        setVideoBarActive(subSection?._id);
                                    }}>
                                    {videoBarActive === subSection._id ? (<FaPlay />) : (
                                       <span className='   '>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => { }}
                                                    checked= {completedLecture.includes(subSection._id)}
                                                    className={` relative w-4 h-4 appearance-none   border-2  rounded-[4px] cursor-pointer transition-all duration-300 ${completedLecture.includes(subSection._id) ? ( 'bg-richblack-500 border-richblack-500') : ("bg-transparent border-gray-400") }  `} 
                                                />
                                                    {completedLecture.includes(subSection._id ) &&
                                                        <FaCheck  className=' absolute text-xs top-3.5 left-3.5 text-richblack-800 '/>
                                                    }           
                                       </span>

                                    )}                                 
                                    
                                    {completedLecture.includes(subSection._id) ? (<del className=' text-richblack-400'>{subSection.title}</del>) : (<span>{subSection.title}</span>)}
                                    <HiDesktopComputer className='text-richblack-200 text-xl' />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
 