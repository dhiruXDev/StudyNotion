import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelinevideo  from "../../../assets/image/Timelinevideo.mp4"

 const timeLine = [
     {
        logo : logo1,
        heading : "Leadership",
        Decription : "Fully committed to the success company"
     },
     {
        logo : logo2,
        heading : "Responsibility",
        Decription : "Students will always be our top priority"
     },
     {
        logo : logo3,
        heading : "Flexibility",
        Decription : "The ability to switch is an important skills"
     },
     {
        logo : logo4,
        heading : "Solve the Problem",
        Decription : "Code your way to a solution"
     },
]
;
export const TimeLineSection = () => {
  return (
    <div className=" w-full lg:w-11/12 mx-auto px-[3rem] py-10 pb-20   my-5 flex lg:flex-row flex-col   gap-[70px] lg:justify-between lg:items-center  relative">
              <div className='absolute  md:h-[300px] h-[20%]   w-[40%]  md:rotate-0 rotate-90  md:w-[53%] lg:w-[39%]  xl:w-[41%] 2xl:w-[46%]   shadow-[-28px_18px_88px_18px_#1565C0]   rounded-full z-10  bottom-[8%]  md:top-auto left-[29.2%] lg:left-[53%] xl:left-[50%]  2xl:left-[48%] md:bottom-[12rem] mr-[20rem]   ' > </div>
         <div className=' w-full lg:w-[45%]  flex flex-col gap-2  '>
                {
                    timeLine.map((data , index)=>{
                        return (
                            <div key={index} className=' flex flex-col gap-1'> 
                                    <div className=' flex flex-row gap-8  items-center '>
                                            <div className=' bg-white rounded-full py-4 px-4'> 
                                                <img src= {data.logo} height={20} width={20} />
                                            </div> 
                                            <div  className='flex flex-col gap-1   '> 
                                                <p className='text-lg xs:text-2xl  font-semibold  '>{data.heading}</p>
                                                <p className=' text-sm xs:text-[16px] xs:leading-[22px]  font-normal  text-richblack-700 '>{data.Decription}</p>
                                            </div>
                                    </div>
                                    {
                                          data.heading === "Solve the Problem" ? 
                                          <div className='   bg-pure-greys-25   '></div>  : 
                                          <div className=' h-14 bg-pure-greys-25 w-[0.5px] relative left-6  border-dashed border-pure-greys-200 border-[1.5px] mt-1 '></div>
                                    }
                            </div>
             
                            
                        )
                      
                    })
                }
         </div>
         <div className=' right-5 w-full lg:w-[57%]    shadow-[14px_14px_1px_1px_rgb(255,255,255)]  relative lg:right-12   z-30   '>
           
                               <video muted autoPlay loop  height={540} width={800} className="   relative left-2    md:right-9  h-auto lg:h-[510px] base:object-cover object-cover  " >
                                          <source src={timelinevideo} type="video/mp4"   /> 
                              </video>
         </div>
         <div className=' z-30 absolute    left-[5%] md:left-[49%]  px-2  md:pl-10 font-inter md:py-10 py-5  w-10/12 h-fit   xl:max-w-[42%]  bottom-1 bg-caribbeangreen-700 flex   justify-center items-center   md:space-x-5 gap-x-5  '> 
        
                    <div className='  flex  pl-2 md:pl-0  md:gap-5 '> 
                        <span className=' text-white font-bold  md:text-4xl  text-lg  pr-5'>10</span>
                        <span  className='  font-medium text-xs  base:text-sm  md:text-base   md:leading-6  text-caribbeangreen-300'>YEARS EXPERIENCES</span>
                    </div>

                    <div className=' w-[0.5px] h-[40px] bg-caribbeangreen-400  '></div>
                    
                    <div className='  flex   items-center md:gap-x-5 md:pr-0 pr-5 '> 
                        <span className=' text-white font-bold  pr-5 md:pr-[5.5px]  text-lg base:text-2xl md:text-4xl  '>250</span>
                        <span  className='  font-medium  text-xs base:text-sm md:text-base  md:leading-6 text-caribbeangreen-300'>TYPES OF COURSES</span>
                    </div>  
        </div>

    </div>
  )
}
