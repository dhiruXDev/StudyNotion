import React from 'react'

export const ChatEndModal = ({setIsShowModal ,endChatHandler}) => {
    return (
        <div className=' w-full h-full flex flex-col   ml-auto z-[1000] px-2 pt-2 text-richblack-5 gap-y-2  bg-caribbeangreen-400 rounded-sm border-2  border-caribbeangreen-400  '>
                <p className=' text-sm text-richblack-800 font-medium '>Are you sure, you want to finish this chat? </p>
                <div className=' flex gap-x-2 text-sm'>
                     <button onClick={()=>setIsShowModal(false)} className=' text-richblack-50 bg-richblack-700 border-b-[1px] border-richblack-100  py-1 px-5 font-medium  rounded-md   duration-200 '>No</button>
                     <button onClick={endChatHandler} className=' text-richblack-800 bg-yellow-200 border-b-[1px] border-richblack-100  py-1 px-5  font-medium rounded-md   duration-200 '>Yes</button>
                </div>
        </div>
      )
}
