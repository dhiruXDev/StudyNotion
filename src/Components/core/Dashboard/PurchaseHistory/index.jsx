import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RenderPurchaseCourse } from './RenderPurchaseCourse';
import { RenderTotalAmount } from './RenderTotalAmount';
import { enrolledCourses } from '../../../../services/operation/ProfileAPI';

export const PurchaseHistory = () => {
 
   const {token} =  useSelector((state)=>state.auth);
   const[purchaseCourses ,setPurchaseCourse] = useState([]);
   const [totalAmount ,setTotalAmount] = useState(0);
   const[loading,setLoading] = useState(false);
   async function getEnrolledCourse(){
       setLoading(true);
      try {
               const result = await enrolledCourses(token)  ;            
               setPurchaseCourse(result);
               console.log("All coursedata ", result);
               setLoading(false);
      } catch (error) {
            console.log("Erorr during fetching Course details", error.message);
      }
      setLoading(false);
    }
    useEffect(()=>{
      getEnrolledCourse();
    },[])

    useEffect(()=>{
          let amount = 0;
          purchaseCourses.forEach(course => {
               amount = amount + course.price;
          });
          setTotalAmount(amount);
    },[purchaseCourses]);

  return (

    <> 
          {
             loading ? ( <div className=' h-full w-full grid place-items-center '>
                                      <div className="spinner"> </div>
                         </div>) :
              (
                <div className=' w-full px-3 lg:px-0 lg:w-[1460px] mx-auto flex flex-col gap-y-2  relative   '>
                   <div className=' flex flex-col gap-1 px-6 pt-6 '>
                        <span className=' text-base text-richblack-50 font-medium py-2'>Home{"   "} / Dashboard / <span className=' text-yellow-25 text-base font-medium'>Purchase History</span></span>
                        <h1 className=' text-3xl  text-richblack-25 '>My Purchases</h1>
                    </div>
                        
                        <div className=' w-full lg:w-[75%] ml-6 pr-2 mt-6 border-b-[1.5px]  border-richblack-700'>
                            <p className=' text-base leading-[24px] text-richblack-400  font-semibold py-1 '>{purchaseCourses.length}  Courses in your Purchase History</p>
                        </div >
                        {
                            purchaseCourses.length > 0 ? 
                            (
                                    <div className=' w-[100%] flex lg:flex-row flex-col gap-x-2 '>
                                            <RenderPurchaseCourse  courseData = {purchaseCourses}/>
                                            <RenderTotalAmount  totalAmount={totalAmount} />
                                    </div>
                            ) :
                            (
                                <p className=' text-xl w-[85%] grid place-items-center h-[60vh] text-richblack-50 '>Your Purshase history is Empty !</p>
                            )
                            
                        }
            </div>
              )
          }

    </>

  )
}
