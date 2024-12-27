import React from 'react'

export const StatsComponent = () => {
 const statsData = [
    {count : "5k" , label :"Active Student"},
    {count : "10+" , label :"Mentors"},
    {count : "200+" , label :"Courses"},
    {count : "50+" , label :"Awards"}

 ]

  return (
    <div className=' grid-cols-1  small:grid-cols-2 grid  sm:flex sm:flex-row   w-11/12 mx-auto  relative gap-y-5 sm:gap-x-[4rem]  py-12 lg:py-[5rem]  px-8 '> 
            
                {
                    statsData.map((data,index)=>{
                        return(
                            <div className='   w-full md:w-11/12 relative flex flex-col gap-2 items-center '> 
                                <h1 className=' text-2xl md:text-3xl text-richblack-5 font-semibold'>{data.count}</h1>
                                <p className=' text-richblack-400 text-xs  md:text-base font-semibold'>{data.label}</p>
                            </div>
                        )
                    })
                } 
            
    </div>
  )
}
