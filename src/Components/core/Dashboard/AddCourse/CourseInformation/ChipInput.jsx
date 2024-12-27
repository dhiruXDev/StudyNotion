import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdOutlineCancel } from "react-icons/md";
export const ChipInput = ({
     name,
     label,
     setValue,
     getValues,
     placeholder,
     register,
     id,
     errors
}) => {

const[chipsValue , setChipsValue] = useState([]);
const{editCourse,course} = useSelector((state)=>state.course)
// const{inputvalue,setinputvlaue} = useState("")
useEffect(()=>{
     
        if (editCourse) {
             setChipsValue(course?.tag);   // If the course have any tag then it must be visible
        } 
        register(name , { required :true ,validate : (value)=> value.length > 0});       
},[])

useEffect(()=>{
    setValue(name,chipsValue);  
},[chipsValue])
 
function  changeHandler(e){
    console.log(e.target.value)
}
const handleKeyDown = (event)=>{

    if (event.key === "," || event.key==="Enter") {
        event.preventDefault();
        //get the input value and remove any leading/tariling spaces
        const newTag = event.target.value.trim();
         //check if the input value exists and is not already in the chip array
        if (newTag && !chipsValue.includes(newTag)) {
             setChipsValue([...chipsValue , newTag])
              event.target.value = ""
        }
    }
}
//function to handle deletion of a chip 
const deleteChips = (chipIndex)=>{
     
    //filter the chips array to remove the chip with the given index
    const newChips = chipsValue.filter(( _ , index)=> index !== chipIndex)
    setChipsValue(newChips);
}

  return (
      <div className=' flex flex-col gap-y-1 mb-2 '>
                <label htmlFor= {label} className=' text-[14.5px] leading-[24px] text-richblack-25'>Tags<span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span></label>
                {
                    chipsValue && (
                        <div className=' flex flex-wrap gap-2 '> 
                              {
                                chipsValue.map((tags,index)=>(
                                    <div key={index} className=' flex mb-2  gap-x-1 bg-yellow-50  text-richblack-900 px-2.5 py-1 rounded-2xl'>
                                            <span className=''>{tags}</span>
                                             <button onClick={()=>deleteChips(index)} className=' text-sm'>   {/*   */}
                                                <MdOutlineCancel />
                                            </button>
                                    </div>
                                ))
                              }
                        </div>
                       
                    )
                }
                  
                <input
                    type='text'
                    name={name}
                    id= {id}
                    onChange={changeHandler}
                    placeholder= {placeholder}   
                    onKeyDown={handleKeyDown}    // it means you're passing the handleKeyDown function reference to the onKeyDown event handler. 
                    className=' bg-richblack-700  outline-none border-b-[1.4px] border-richblack-500 focus:border-blue-300 py-2  px-2  rounded-lg placeholder:text-[14.5px] placeholder:leading-[28px] text-base text-richblack-100'
                    
               />
                {
                    errors[name] && <span className=' text-xs text-pink-600 font-medium '>Tags is required</span>
                }
            </div>
  )
}
 

/*
onClick={deleteChips(index)}:-
  If you use onClick={deleteChips(index)}, the deleteChips function will be called immediately when the component renders, not when the button is clicked. This happens because you are invoking the function directly within the JSX instead of passing a function reference.
                    onClick={deleteChips(index)}: This will execute deleteChips(index) immediately during rendering, which is not what you want.

onClick={deleteChips}:-
  When the button is clicked, the deleteChips function will be called. This approach works well when no parameters are needed or when the logic inside the function doesn't depend on specific values passed from the event.

*/