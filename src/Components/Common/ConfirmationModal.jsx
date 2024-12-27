import React from 'react'
import { IconBtn } from './IconBtn'
export const ConfirmationModal = ({modalData}) => {
  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm  "'> 
          <div className=' flex flex-col gap-3   max-w-[420px]  pr-[4rem]  border-2 border-richblack-500 rounded-lg p-[2rem]   bg-richblack-800  '>
                <p className=' text-3xl  text-richblack-25 font-semibold py-1'>{modalData.heading}</p>
                <p className=' text-base font-medium'>{modalData.discription}</p>
                <div className=' flex gap-4 py-3'>
                      <IconBtn 
                            onClick={modalData.btn1Handler}
                            text={modalData.btn1Text}
                        />
                        <button onClick={modalData.btn2Handler} className=' bg-richblack-200 py-2 px-5 rounded-lg text-black font-semibold hover:bg-richblack-300 transition-all duration-300'>
                              {modalData.btn2Text}
                        </button>
                </div>
          </div>  
    </div>
  )
}
