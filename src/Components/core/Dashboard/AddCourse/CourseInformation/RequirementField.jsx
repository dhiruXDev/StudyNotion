import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const RequirementField = ({
    name,
    id,
    register,
    getValues,
    setValue,
    label,
    errors
}) => {
    const[requirement,setRequirement] = useState("");
    const[requirementList , setRequirementList] = useState([])
    const{course,editCourse} =useSelector((state)=>state.course);
     
    useEffect(()=>{
        register(name,{required:true,
              validation : (value)=>value.length > 0    // jo bhi value enter kr rhe hai , thau must be greater than 0 , this is validation
        });

        if(editCourse){
            setRequirementList(course?.Instructions);
            console.log( "lskdf -- ",course?.Instructions)
        }

    },[])

    useEffect(()=>{
         setValue(name , requirementList) ;

    },[requirementList])

    const handleAddRequirementList =()=>{
             if (requirement) {
                   setRequirementList([...requirementList , requirement]);
                   setRequirement("");
             }
    }
    const handleRemoveRequirementList = (index)=>{
           const updatedRequirementList =  [...requirementList]
           updatedRequirementList.splice(index,1) ;     // Remove the given index element
           setRequirementList(updatedRequirementList);
    }

  return (
    <div className=' flex flex-col gap-y-1 '>
                <label htmlFor={name} className=' text-[14px] leading-[24px] text-richblack-25'>  {label}<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                <div>
                        <input
                                    type='text'
                                    name= {name}
                                    id= {id}
                                    value={requirement}
                                    placeholder='Enter Instructions of Course'
                                    onChange={(e)=>setRequirement(e.target.value)}
                                    className=' min-h-[5px]  w-full bg-richblack-700 outline-none border-b-[1.4px] border-richblack-500 focus:border-blue-300 py-2 px-3 rounded-lg placeholder:text-[14.4px] placeholder:leading-[28px]  text-base text-richblack-100'
                                />
                                <button type='button' onClick={handleAddRequirementList} className={`text-yellow-50 font-semibold mt-2 hover:text-yellow-200 duration-200  `}>
                                    Add
                                </button>
                </div>
                {
                    requirementList.length > 0 &&  ( requirementList.map((item,index)=>(
                           <div key={index} className=' flex gap-2   '> 
                                    <p className=' text-base leading-tight text-richblack-25'>{item}</p>
                                    <button onClick={()=>handleRemoveRequirementList(index)} className=' text-sm  text-richblack-400 hover:text-richblack-500  duration-200'>
                                        Clear
                                    </button>
                           </div>
                     )))
                }

                {
                    errors[name] && <span className=' text-xs text-pink-600 font-medium '>Course Description is Required</span>
                }
</div>
  )
}
