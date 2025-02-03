import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
 
import { CourseInformationForm } from './CourseInformation/CourseInformationForm';
import { CourseBuilder } from './Coursebuilder/CourseBuilder';
import {PublisCourse} from './PublicCourse/index'
import { useParams } from 'react-router-dom';
import { setEditCourse } from '../../../../slices/courseSlice';
export const RenderStep = () => {
    const{step, editCourse } = useSelector((state)=>state.course);
    const{courseId}  = useParams();

    const dispatch =useDispatch();
    // Hatana padega 
    // console.log( "courssssss ",courseId)
    // if (courseId == null ) {
    //   dispatch(setEditCourse(false));
    // }
   //
    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
      ]
      // useEffect(()=>{
      //      console.log( "courseId   ",courseId);
      //       if (!courseId) {
      //         dispatch(setEditCourse(false));
      //       }  
      // },[])
 return (
 
    <div className={`${editCourse ? ' ':'  '}`}>  
      <div className={`${editCourse ? '':''}  w-full relative mb-2 flex  mt-4 justify-center px-3`}>
        {
          steps.map((item) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center" >
                <button  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                  ${step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"} 
                  ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
                >
                  {step > item.id ? (
                           <FaCheck className="font-bold text-richblack-900"/>
                  ) : (
                    item.id
                  )}
                </button>
              </div>

              {item.id !== steps.length && (
                <>
                  <div
                    className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                    ${step > item.id ? "border-yellow-50" : "border-richblack-500" } `}  
                  ></div>
                </>
              )}
            </React.Fragment>
          ))
        }
      </div>

      <div className={` ${editCourse ? ' ':'  '}  relative mb-10 flex w-full select-none justify-between px-3`}>
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
            >
              <p
                className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}
              >
                {item.title}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    {/* Step ===1    CourseInfoForma */}
    {/* Step ===2   CourseBuilding */}
    {/* Step ===3    publishing */}
 
        
          {
            step ===1 && <CourseInformationForm />
          }

        {
           step === 2 && <CourseBuilder />
        }
        {
           step === 3 &&    <PublisCourse />
        }


    </div>
  )
}


/**
 *   <div className="relative mb-2 flex w-full justify-center">
        {
          steps.map((item) => (
            <React.Fragment key={item.id}>
              <div
                className="flex flex-col items-center"
              >
                <button
                  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                  ${step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"} 
                  ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
                >
                  {step > item.id ? (
                    <FaCheck className="font-bold text-richblack-900"/>
                  ) : (
                    item.id
                  )}
                </button>
              </div>

              {item.id !== steps.length && (
                <>
                  <div
                    className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                    ${step > item.id ? "border-yellow-50" : "border-richblack-500" } `}  
                  ></div>
                </>
              )}
            </React.Fragment>
          ))
        }
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
            >
              <p
                className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}
              >
                {item.title}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
 */