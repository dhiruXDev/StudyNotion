import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from 'react-dropzone';
 import {FiPause,FiPlay} from 'react-icons/fi'
import { Player, BigPlayButton, ControlBar, PlayToggle } from 'video-react';
import "video-react/dist/video-react.css"; // import css for the player , this is inbuild
 
 
export const Upload = ({
    name,
    label,
    id,
    register,
    getValues,
    setValue,
    errors,
    video = false,
    editData=null,
    viewData=null
}) => {

const[selectedFile ,setSelectedFile] = useState(null);
const[previewSourse , setPreviewSource] = useState( viewData? viewData : editData ? editData:"")
const inputRef = useRef(null);
const{editCourse,course}= useSelector((state)=>state.course);
 const onDrop = (acceptedFile)=>{
     const file=  acceptedFile[0];
     if (file) {
         setSelectedFile(file);
         previewFile(file)
     }
}
const{ getInputProps,getRootProps ,isDragActive} = useDropzone({
               accept: !video ? { "image/*": ['.jpeg', '.jpg','.png','.webp']}  : 
                                 { "video/*" : ['.mp4']},
                                 onDrop

})
 
const previewFile = (file)=>{
  // console.log("File is .. ",file)
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = ()=>{
    // console.log( reader.result)
    setPreviewSource(reader.result)
  }
}

useEffect(()=>{
    register(name,{required:true})
},[register])

useEffect(()=>{
  setValue(name , selectedFile)
},[selectedFile , setValue])
useEffect(()=>{
    if (editCourse) {
      setPreviewSource(course?.thumbnail)
    } 
},[])
  return (
    <div className=' flex flex-col gap-y-2   max-w-[99%] relative '> 
        <label htmlFor={name} className={name === "lectureVideo" ? " text-sm text-richblack-50" : ""} >{label}{!viewData  && <span className=' pl-1 text-pink-500 text-lg font-semibold'>*</span>}</label>
        <div className= {`${isDragActive? " bg-richblack-600" : " bg-richblack-700"} min-h-[220px]  flex   font-inter  rounded-lg  border-dashed border-richblack-600 border-[1.6px]  cursor-pointer    `}>
        {
                    previewSourse ? (
                         <div className=' rounded-md  p-2 flex flex-col items-center gap-y-4 '>
                              {
                                    !video ? (
                                        <img src={previewSourse} alt={"preview"}  className=" relative rounded-md  object-cover  w-fit" />
                                    ) :(
                                      <div className=' w-[280px] md:w-[400px]' > {/* Set the desired width */}
                                      <Player  aspectRatio="16:9"   playsInline src={previewSourse}   controls={false}    />
                                      {/* <button
                                            className="mt-2 text-xl text-white"
                                            onClick={handlePlayPause}
                                        >
                                            {isPlaying ? <FiPause /> : <FiPlay />}
                                        </button> */}
                          
                                  </div>
                                          // <Player  aspectRatio="22:9" playsInline src={previewSourse} className=' relative rounded-md object-cover  w-[720px]   ' />
                                    )
                               }   
                                {
                                    !viewData  && <button
                                                          type='button'
                                                          onClick={()=>{
                                                                setPreviewSource("")
                                                                setSelectedFile(null)
                                                                setValue(name,null)
                                                          }}
                                                           className="text-base leading-[20px]  text-richblack-400 underline text-center hover:text-richblack-300 duration-200 "
                                                          >
                                                Cancel
                                    </button>
                                }
                         </div> 
                    ) 
                  : 
                  (
                     <div  {...getRootProps()} className="flex w-full flex-col items-center justify-center p-6  text-richblack-300 text-[12.5px]"> 
                           <input ref={inputRef} {...getRootProps()}  className='  hidden'/>
                            <div className=' aspect-square bg-richblack-800 w-[48px] rounded-full grid place-items-center '> 
                                  <FiUploadCloud  className="text-2xl text-yellow-50"   />
                            </div>
                             
                             <p className=' mb-1 mt-4 '> Drap and Drop an {!video ? "image " : "video "}or,click to{" "} <span className=' text-yellow-50'>Browse</span> a file</p>
                             <p  className=' mb-1'> Max 6MB each (12MB for videos)</p>
                             <ul className='   grid   grid-cols-2 list-inside list-disc justify-between  font-[550] mt-4'> 
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                             </ul>
                     </div>   
                  )
        }     
        </div>
        
        {
          errors[name] &&
          <span  className=' text-xs text-pink-600 font-medium '>{label} is required</span>
        }
    </div>
  )
}



/**
 *    
 * The useDropzone hook is part of the React Dropzone library, which is a popular library for handling file uploads via drag and drop in React applications. The useDropzone hook provides an easy-to-use API to create file upload areas, manage drag-and-drop functionality, and handle file selection through file input elements.

Key Features of useDropzone:-

Drag and Drop: It allows users to drag and drop files onto a specified area on a web page for uploading.

File Input: It also supports file selection via the traditional file input element.

Customizable: You can customize the behavior, styling, and validation of the drop zone.

State Management: It manages the state of the file input, including accepted files, rejected files, and any errors related to file selection.

File Validation: Supports validation of file types, sizes, and more before the files are accepted for upload.
 
*/