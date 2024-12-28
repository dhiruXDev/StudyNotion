import React from 'react'
import { useSelector } from 'react-redux'
import { RenderCartCourses } from './RenderCartCourses';
import { RenderTotalAmount } from './RenderTotalAmount';

export const Cart = () => {
  const{total,totalItem} = useSelector((state)=>state.cart);   //total --> price , totalItem  --> no of total Item
  return (
    // w-[100vw]
    <div className=' w-full px-3 lg:px-0 lg:w-[1460px] mx-auto flex flex-col gap-y-2  relative   '>
          
           <div className=' flex flex-col gap-1 px-1 md:px-6 pt-6 '>
                  <span className=' text-base text-richblack-50 font-medium py-2'>Home{"   "} / Dashboard / <span className=' text-yellow-25 text-base font-medium'>Watchlist</span></span>
                  <h1 className=' text-3xl  text-richblack-25 '>My Watchlist</h1>
            </div>
           
           <div className=' w-full lg:w-[75%]  ml-2 md:ml-6 pr-2 mt-6 border-b-[1.5px]  border-richblack-700'>
              <p className=' text-base leading-[24px] text-richblack-400  font-semibold py-1 '>{totalItem}  Courses in your Cart</p>
           </div >
            {
                 totalItem > 0 ? 
                 (
                  <div className=' w-[100%] flex lg:flex-row flex-col gap-x-2 '>
                        <RenderCartCourses />
                        <RenderTotalAmount  totalAmount={total} />
                  </div>
                ) :
                 (
                   <p className=' text-xl w-[85%] grid place-items-center h-[60vh] text-richblack-50 '>Your Cart is Empty !</p>
                 )
                  
            }
    </div>
  )
}
