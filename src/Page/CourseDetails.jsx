import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/operation/CourseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import {spinner} from "../Components/Common/spinner.css"
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../Components/Common/RatingAndStar';
import { PiInfoBold } from "react-icons/pi";
import { PiGlobeBold } from "react-icons/pi";
import { FormatDate } from '../utils/FormatDate';
import { CourseAccordationBar } from '../Components/core/Course/CourseAccordationBar';
import { Footer } from '../Components/Common/Footer';
import { CourseDetailsCard } from '../Components/core/Course/CourseDetailsCard ';
import { BuyCourse } from '../services/operation/studentFeatureAPI';
import { ConfirmationModal } from '../Components/Common/ConfirmationModal';
import { ReviewSlider } from '../Components/Common/ReviewSlider';
export const CourseDetails = () => {
   
const {courseId} = useParams();
//const  courseId  = useParams(); -------------> ye vala phle tha , DEKHOOOOOOOOOOOOOOOOOOOOOoo
  //  console.log( "COurseId" , courseId);
    const[Course ,setCourse ] =useState("");
    
    const[loading,setLoading] = useState(false);
    const[avgReviewCount ,setAvgReviewCOunt] =useState(0);
    const[totalLecture , setTotalLecture] =useState(0);
    const[totalHour , setTotalHour] =useState(0);
    const[isActive ,setIsActive] = useState([]);  //useState(Array(0)) -- >Empty array pont kr raha hai
    const[confirmationModal ,setConfirmationModal] =useState(null);
    const dispatch =useDispatch();
    const navigate= useNavigate();

    const { user } = useSelector((state) => state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {paymentLoading} = useSelector((state)=>state.course);
    useEffect(()=>{
        const getCOurseData = async()=>{
            try {
                const response = await getCourseDetails(courseId,token);
                setCourse(response);  
            } catch (error) {
                 console.log("Error during fetching courseDetails ",error.message);
                 console.log(error);
            }
        }
        if (courseId) {
            getCOurseData();
        }   
    },[])


 useEffect(()=>{
            function fetchingAgvRating(){
                const count = GetAvgRating(Course?.ratingAndReviews);
                setAvgReviewCOunt(count);
            }
            function fetchTotalLecture (){
                      let count = 0;
                      for (let index = 0; index < Course.courseContent.length; index++) {
                          count = Course.courseContent[index].subSection.length  ;
                      }
                      setTotalLecture(count);
            }
            function fetchTotalHourOfLecture (){
                 let count = 0;
                 Course?.courseContent?.forEach((sec)=> {
                            sec?. forEach((subsec)=>{
                               count = count+ subsec.timeDuration;
                            })   
                 }); 
                 setTotalHour(count);
            }
        if(Course){
            fetchingAgvRating();
            fetchTotalLecture();
           // fetchTotalHourOfLecture();
        }
 },[])

   const handleActive = (id)=>{  // If collapse is clicked menas all the open subsection shoud be close
             console.log("called", id);  //If isActive array is empty means every subsection should be closed,
             setIsActive(!isActive.includes(id) ? isActive.concat([id])  : isActive.filter((e) => e != id));     //ydi isActive array have this id then remove it if not then add this , Means TOUGGLE KR RHE HAI.     
   }
   const handleBuyCourse = () => {
          if (token) {
                BuyCourse(user,[courseId] ,token,  navigate, dispatch)
                return;
          }
          //If Token is not present means the user is not logIn , so display modal
          setConfirmationModal({
            heading: "You are not logged in",
            discription: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
          })
  }
 if (loading || paymentLoading) {
         return (
            <div className=' grid place-content-center  place-items-center w-[100vw] h-[100vh]'>
                     <div className='spinner'></div>
            </div>  
         )
 }
 //By using this we can easly only add courseName,thumbnail ..etc , no need to addd {Course.courseDescription} & so on every time
//  const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       thumbnail,
//       price,
//       courseContent,
//       ratingAndReviews,
//       studentEnrollment,
//       createdAt
//  } = Course;


  return (
     <>
          {
            Course?.length === 0  ? (
                <div className=' grid place-content-center  place-items-center w-[100vw] h-[100vh]'>
                    <div className='spinner'></div>
                </div>  
           ) :
           (
            <div className='  text-richblack-25 w-full flex flex-col gap-y-3 relative '> 
            {/* Section 1 */}
                  <div className=' w-full bg-richblack-800 font-inter    relative '>
                        <div className='  lg:w-[85%] w-full mx-auto px-3 md:px-20  lg:px-5 flex flex-col gap-y-2 py-5  '>
                                <p className=' text-base  text-richblack-200'>Home / Learning / <span className=' text-yellow-25'>{Course?.category[0]?.name}</span></p>
                                <div className=' w-full md:max-w-[69%] md:pr-2  lg:border-r-[1.7px] border-richblack-700 '>
                                      <h1 className=' text-richblack-25 text-3xl lg:text-4xl font-medium '>{Course?.courseName}</h1>
                                      <div className=' py-2 flex flex-col gap-y-2'>
                                            {/* <p className=' text-richblack-300 text-[14.5px] py-1'>{Course.courseDescription}</p> */}
                                            <div className=' flex gap-x-2 items-center '>
                                                <span className=' text-yellow-25 font-semibold text-lg'>{avgReviewCount || 4.5}</span>
                                                <RatingStars Review_Count = {avgReviewCount}  />
                                                <span className=' text-richblack-50 text-base'>({Course?.ratingAndReviews?.length} ratings)</span>
                                                <span className=' text-richblack-50 text-base'>{Course?.studentEnrollment?.length || 450} students</span>
                                            </div>
                                            <span className=' text-richblack-200  font-inter text-base'>Created By <span className=' text-richblack-50'>  {Course?.instructor?.firstName} {Course?.instructor?.lastName}</span></span>
                                              <div className=' flex gap-x-3 items-center '>
                                                    <div className=' flex gap-x-1.5 items-center text-richblack-50'>
                                                        <PiInfoBold className=' text-richblack-25 text-xl' />
                                                        <span className=' text-richblack-100'>Created at {FormatDate(Course?.createdAt).split("|").at(0)}</span>
                                                    </div>
                                                      <div  className=' flex gap-x-1.5 items-center text-richblack-50'>
                                                              <PiGlobeBold  className=' text-xl text-richblack-25 '/>
                                                               <span className=' text-richblack-100'>English</span>
                                                      </div>
                                                  
                                              </div>
                                      </div>
                                </div>
                        </div>
                  </div>
                 
                  <div className='  flex  lg:max-w-max  h-fit mx-6 md:absolute inset-0 left-[67%] top-[2%] bg-richblack-700   z-50  rounded-lg '>
                              <CourseDetailsCard  
                                    course ={Course}
                                    setConfirmationModal={setConfirmationModal}
                                    handleBuyCourse={handleBuyCourse}
                              />
                  </div>

                  {/* Section 2 */}
                  <div className='lg:w-[85%] w-full  pt-10 px-5 mx-auto    relative bg-transparent flex flex-col gap-y-10  z-20 '>
                            {/* What you will learn */}
                            <div className=' w-full md:max-w-[69%] p-6 border-[1.7px] border-richblack-700 flex flex-col gap-y-2 '>
                                    <h1  className=' text-xl lg:text-3xl font-medium  text-richblack-5 py-2'>What You Will Learn</h1>
                                    <p className=' text-richblack-200 text-base   '>{Course?.whatYouWillLearn}</p>
                            </div>
                            
                            {/* COurse Content */}
                            <div className=' w-full lg:max-w-[69%] flex flex-col  '>
                                             <div className=' flex flex-col  gap-y-1 pb-1'>
                                                      <h1 className=' text-2xl text-richblack-50 py-1 font-medium'>Course Content</h1>
                                                        <div className=' flex justify-between'>
                                                              <div className=' flex gap-x-1 items-center text-richblack-100 font-[400] text-xs base:text-base'>
                                                                      <span>{Course?.courseContent?.length} Sections  </span>
                                                                      <span>. {totalLecture} lectures</span>
                                                                      {/* <span>{FormatDate(totalHour)} Hours </span> */}
                                                                      <span>7h 25m total length</span>    {/*  duration is given in subsection  */}
                                                              </div>
                                                              <div>
                                                                    <button
                                                                        className="text-yellow-100  text-xs base:text-base hover:text-yellow-25 duration-200"
                                                                        onClick={() => setIsActive([])}
                                                                      >
                                                                        Collapse all Sections
                                                                    </button>
                                                              </div>
                                                        </div>
                                                       
                                              </div>
                                              
                                  
                                      {/* Section Table */}
                                      <div className=' pt-2'>
                                            {
                                              Course?.courseContent?.map((section,index)=>{
                                                        return(  // this type of Setion called ---> "Accordian"
                                                          <CourseAccordationBar
                                                              key={index}
                                                              course = {section}
                                                              isActive ={isActive}
                                                              handleActive={handleActive}
                                                          />
                                                        )
                                              })
                                            }
                                      </div>
                                  
                            </div>
                            {/* Author details */}
                            <div  className=' py-3  lg:max-w-[69%] flex flex-col gap-y-1 '>
                                  <h1 className=' text-3xl text-richblack-25 py-3 '>Author</h1>
                                  <div className=' flex gap-x-2 items-center'>
                                      <img src= {` ${Course?.instructor?.image}`} height={50} width={50} className=' aspect-square  rounded-full'/>
                                      <span className=' text-xl  text-richblack-5 '>{Course?.instructor?.firstName} {Course?.instructor?.lastName}</span>
                                      
                                  </div>
                                  <p className=' text-richblack-100 pt-2 text-[14.5px]'>{Course?.instructor?.additionalDetails?.about}</p>
                            </div>

                            {/* Rating  */}
                              <div  className=' py-3  w-full lg:max-w-[100%] flex flex-col gap-y-6  '>
                                   <h1 className=' text-3xl text-center py-3 font-semibold'> Reviws From Other Learners</h1>
                                  <ReviewSlider  />
                              </div>
                  </div>
                                              {/* Footer */}
                  <Footer />

                  {
                    confirmationModal && <ConfirmationModal  modalData={confirmationModal}  />
                  }

          </div>
        )
    }
    
    </>
  )
}
