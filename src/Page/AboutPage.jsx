import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText'
import Bannerimg1 from "../assets/image/aboutus1.webp"
import Bannerimg2 from "../assets/image/aboutus2.webp"
import Bannerimg3 from "../assets/image/aboutus3.webp"
import { Quote } from '../Components/core/AboutPage/Quote'
import foundingStory from "../assets/image/FoundingStory.png" 
import { StatsComponent } from '../Components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../Components/core/AboutPage/LearningGrid'
import { ContactFormSection } from '../Components/core/AboutPage/ContactFormSection'
import { Footer } from '../Components/Common/Footer'
import "../Components/core/HomePage/gradeint.css"
import { ReviewSlider } from '../Components/Common/ReviewSlider'
 
export const AboutPage = () => {
  return (
    <div className='relative w-full   flex flex-col gap-2   mx-auto justify-center   font-inter  '> 
      
              {/* Section 1 */}
           <section className='   z-20 bg-richblack-800  lg:pb-[8rem] relative text-richblack-5 overflow-visible '>
                    <div className='  z-20  w-11/12   py-1 lg:py-[5rem]   overflow-visible  mx-auto px-[2rem] mt-[1rem] relative  flex flex-col items-center justify-center '>
                         <header className='  relative flex flex-col items-center gap-6 md:pb-10'>
                              <h1  className=' mx-auto lg:w-[60%] text-center text-2xl base:text-3xl lg:text-4xl py-1 font-semibold'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /> </h1>
                              <p className='  mx-auto lg:w-[70%] text-center   text-base base:text-base  lg:text-base text-richblack-400 font-inter font-medium'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                         </header>
                         <div className='    lg:absolute grid grid-cols-3 xs:relative    gap-3 lg:gap-2  base:w-[90%]  w-full overflow-visible     xs:translate-y-[50%]  lg:top-0 left-0  lg:left-[50%]     lg:translate-x-[-50%] lg:translate-y-[105%]  '>
                                <div className=' absolute bannerGradeint translate-y-[30%] lg:w-[45%] w-[80px]  translate-x-[280%]  md:translate-y-[45%]  md:translate-x-[10%] lg:translate-y-[-28%] '> </div>
                               <img src={Bannerimg1}  className=' object-contain' />
                               <img src={Bannerimg2} />
                               <img src={Bannerimg3} />
                         </div>
                    </div> 
           </section>

           {/* Section 2 */}
           <section className=' px-[2rem] lg:px-0 z-10 lg:pt-[9rem]  border-b-[2px] border-richblack-600   ' >
                     <Quote />
           </section>

           {/* section 3 */}
           <section className='text-richblack-5 my-9 '>
                   <div className=' relative lg:w-[85%] lg:px-[4rem] px-6  mx-auto flex flex-col gap-10 py-10 '>
                         <div className=' relative flex lg:flex-row flex-col lg:gap-y-4  justify-between  '>
                            <div className=' relative flex  flex-col gap-7  w-[98%] lg:w-[50%]  justify-center'>    
                                    <h1 className=' base:text-4xl text-3xl font-semibold  bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent '>Our Founding Story</h1>
                                    <p className=' text-sm base:text-base font-medium  text-richblack-400 lg:w-[80%] '>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                                    <p className=' text-sm base:text-base font-medium  text-richblack-400 lg:w-[80%] '>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                            </div>
                                <div className=' relative w-[100%] lg:w-[50%] flex lg:items-center lg:justify-center  py-[7rem]'>
                                   <div className={`foundingStorybg  absolute    left-[-7%] top-[20%]     lg:translate-x-[-40%]    lg:translate-y-[-20%]   lg:left-[30%] ` }></div>
                                     <img src= {foundingStory}    />
                                </div>
                        </div> 
                         <div className=' flex lg:flex-row flex-col -mt-20 lg:mt-0 lg:py-8 gap-6 lg:gap-14 lg:space-x-20  lg:justify-between lg:items-center  '>
                                <div className=' flex flex-col gap-y-6  '>
                                    <h1 className='  text-3xl lg:text-4xl font-semibold  bg-gradient-to-br from-[#E65C00] to-[#F9D423]  bg-clip-text text-transparent  '>Our Vission</h1>
                                    <p className=' lg:text-base text-richblack-400 font-medium  '>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                                </div>
                                <div  className=' flex flex-col gap-y-6 '>
                                    <h1 className=' text-3xl lg:text-4xl font-semibold bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>Our Mission</h1>
                                    <p className='  lg:text-base text-richblack-400 font-medium  '>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                                </div>
                         </div>
                   </div>
           </section>
          
          {/* Section 4 */}
          <section className='  bg-richblack-800 flex items-center  border-b-[1.7px] border-richblack-700   '>
                 <StatsComponent />
          </section>

          {/* Section 5 */}
            
            <section className=' w-full  lg:w-11/12 flex flex-col gap-5 mx-auto  px-6 lg:px-[4.5rem] py-8 ' >
                 <LearningGrid />
                 <ContactFormSection />
            </section>

            <section className=' w-full lg:w-11/12 flex flex-col h-auto   mx-auto  lg:px-[4.5rem]  '>
                         <div  className=' py-3  h-auto w-full lg:max-w-[100%] flex flex-col gap-y-6  '>
                              <h1 className='  text-richblack-25 text-3xl text-center py-3 font-semibold'> Reviews From Other Learners</h1>
                              <ReviewSlider  />
                         </div>
            </section>

            <section>
                 <Footer />
            </section>
        
    </div>
  )
}
