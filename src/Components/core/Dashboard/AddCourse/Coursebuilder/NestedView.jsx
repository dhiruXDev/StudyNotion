import React, { useState } from 'react'
import { FaPlus  } from 'react-icons/fa';
import { BiSolidDownArrow, BiSolidDroplet } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBack2Line } from 'react-icons/ri';
import {IoMdArrowDropup ,IoMdArrowDropdown} from 'react-icons/io';

import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SubSectionModal } from './SubSectionModal';
import { ConfirmationModal } from '../../../../Common/ConfirmationModal';
import { deleteSection, deleteSubsection } from '../../../../../services/operation/CourseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import {  TbLineHeight  } from "react-icons/tb";
import { IoCaretUpOutline } from "react-icons/io5";    // uperDrop
export const NestedView = ({handleEditSectionName}) => {
    const[addSubSection , setAddSubSection] = useState(null);
    const[editSubSection , setEditSubSection] = useState(null);
    const[viewSubSection , setViewSubSection] = useState(null);
    const{course} = useSelector((state)=>state.course);      // Jb bhi course change hoga to re-render hoga , dont worry , WHY ?????  find answer  
    const{token} = useSelector((state)=>state.auth);
    const[confirmationModal  , setConfirmationModal] = useState(null);
    const[isOpenSection ,setIsOpenSection] = useState({});      // Key pair value  means Object
   // const [isOpen ,setIsOpen] =useState(null);
    const dispatch= useDispatch();
    let isOpen ;

    // Accross every sectionId i'm updating the true or false value for changing the DropDown icon
    const handleToggleDropDown = (SectionId) =>{
        setIsOpenSection((prevState)=>({      // Tougling the state with true or false
            ...prevState,
            [SectionId] : !prevState[SectionId]   // storing as   --- > 65284ajdsnjd584 : true / false
        }))
        isOpen  = isOpenSection[SectionId._id] || false;
        // setIsOpenSection((prev)=> 
        //     prev.includes(SectionId) ?  prev.filter((id)=>id !== SectionId) :  [...prev , SectionId]
        //    )
        //  setIsOpen(SectionId)    
    }

 const HandleDeleteSection = async(sectionId)=>{
         const result = await deleteSection({sectionId ,courseId:course._id },token);
        //  console.log( "response of deleting section... ",result);
         if (result) {
             dispatch(setCourse(result))
         }
         setConfirmationModal(null)
 }

 const HandleDeleteSubSection = async(subSectionId , sectionId)=>{
        const  result = await deleteSubsection({subSectionId ,sectionId},token);
        const updatedCourseContent = course?.courseContent.map((section)=>section._id === sectionId ? result : section );
        const updatedCourse = {...course,courseContent:updatedCourseContent};
        // console.log( "response of deleting subsection... ",result)
        if (result) {
            // Can we do some extra operation here 
             dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null)
 }
 
  return (
    <div className=' '> 
           <div className= '  border-[1.7px] border-richblack-600 rounded-md px-6 pt-2 bg-richblack-700'>
                 {
                    course?.courseContent.map((section)=>{
                    // Initialize isOpen to false if not yet in openSections
                     
                      console.log(isOpen)
                        return(
             
                           <details key={section._id} open>
                                   <summary  className=' flex justify-between items-center border-b-[1.5px] border-richblack-600  py-3' >
                                         <div className=' text-richblack-500  flex  gap-x-1 items-center'>
                                               <TbLineHeight  className=' text-2xl text-richblack-400 font-semibold' /> 
                                               <p className=' text-richblack-25 text-lg font-medium'>{section.sectionName}</p>
                                         </div>
                                         <div className=' text-richblack-400  flex     gap-x-2 items-center '>
                                                    <button onClick={()=>handleEditSectionName(section.sectionName ,section._id)}>
                                                        <MdEdit className=' text-2xl  hover:text-richblack-200 duration-200' />
                                                    </button>
                                                    <button onClick={ ()=> setConfirmationModal({
                                                            heading:"Delete this Section",
                                                            discription:"All lectures will be deleted from this section",
                                                            btn1Text:"Delete",
                                                            btn2Text : "Cancel",
                                                            btn1Handler: ()=>HandleDeleteSection(section._id) ,
                                                            btn2Handler: ()=>setConfirmationModal(null)
                                                          
                                                    })}>
                                                        < FaRegTrashAlt   className=' text-xl font-extrabold hover:text-richblack-200 duration-200'  />
                                                    </button>

                                                    <span className=' px-2 '>|</span>
                                                     <span onClick={()=>handleToggleDropDown(section._id)}>
                                                             {
                                                                isOpen ?  <IoMdArrowDropup className=' text-2xl cursor-pointer' /> :<IoMdArrowDropdown  className=' text-2xl cursor-pointer'/>  
                                                             }
                                                     </span>
                                                     
                                         </div>
                                   </summary>

                                   <div className='  '>
                                         {section?.subSection?.map((data)=>(
                                                 <div key={data._id} onClick={()=>setViewSubSection(data)} className=' pl-4  flex py-2 justify-between border-b-[1.5px] border-richblack-600 '>
                                                          <div className=' text-richblack-500  flex  gap-x-2 items-center '>
                                                              <TbLineHeight className=' text-2xl text-richblack-400 font-semibold'  /> 
                                                              <p className=' text-base text-richblack-200 '>{data.title}</p>
                                                         </div> 
                                                          <div className=' text-richblack-400 flex gap-x-4' onClick={(e)=>e.stopPropagation()}> {/*   onClick={(e)=>e.stopPropagation() => for stop the parent propegaation  when i clicked on  this div */}
                                                                <button onClick={()=>setEditSubSection({...data , sectionId:section._id})}>
                                                                    <MdEdit className=' text-2xl hover:text-richblack-200 duration-200' />
                                                                </button>
                                                                <button onClick={()=>setConfirmationModal({
                                                                     heading:"Delete this sub-Section",
                                                                     discription:"Selected lecture will be Deleted",
                                                                     btn1Text:"Delete",
                                                                     btn2Text : "Cancel",
                                                                     btn1Handler: ()=>HandleDeleteSubSection(data._id , section._id) ,
                                                                     btn2Handler: ()=>setConfirmationModal(null)
                                            
                                                                })}>
                                                                     < FaRegTrashAlt  className=' text-xl font-extrabold hover:text-richblack-200 duration-200'  />
                                                                </button>
                                                           </div> 
                                                 </div>  
                                         ))}
                                   </div>

                                   <button onClick={()=>setAddSubSection(section._id)}  >
                                        <div  className=' flex gap-x-2 text-yellow-50 items-center py-2'>
                                             <FaPlus  className='    font-semibold text-base' />
                                            <p className=' text-base '>Add Lecture</p>
                                        </div>
                                  </button>
                           </details> 
                           
                     
                        )
                    })
                 }
           </div>
 
            {
                 addSubSection ? (<SubSectionModal   modalData = {addSubSection}
                                                     setModalData ={setAddSubSection}
                                                     add={true} />) : 
                                       
                 viewSubSection ? (<SubSectionModal  modalData={viewSubSection}
                                                     setModalData={setViewSubSection}
                                                     view = {true} />) : 
                 editSubSection ? (<SubSectionModal modalData={editSubSection}
                                                    setModalData={setEditSubSection}
                                                    edit={true} />) : (<div> </div>)
            }
            {
                confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)
            }
    </div>
  )
}
