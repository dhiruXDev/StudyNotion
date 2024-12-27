import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon2 from "react-icons/hi2"
import * as Icon3 from "react-icons/io5"

import { TiMessages } from "react-icons/ti";
import { ContactFormSection } from '../Components/core/AboutPage/ContactFormSection';
import { ContactUsForm } from '../Components/ContactPage/ContactUsForm';
import { Footer } from '../Components/Common/Footer';
import { ReviewSlider } from '../Components/Common/ReviewSlider';
 

export const ContactUsPage = () => {

const contactDetailsdata = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "info@studynotion.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details: 
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+123 456 7869",
    }
]
  return (
    <div className=' w-full  flex flex-col  text-richblack-25 gap-5  py-1  '> 
       <div className='relative  w-full lg:w-11/12  mx-auto flex lg:flex-row flex-col  gap-4 gap-x-20 lg:px-[4rem]  px-[2rem] font-inter mt-[5rem] justify-center'> 
                <div className=' flex flex-col text-richblack-5 lg:w-[40%]  h-auto  lg:max-h-[440px]  xl:max-h-[410px] bg-richblack-800 py-[1.5rem] px-7 rounded-lg '>
                    {
                            contactDetailsdata.map((data,index)=>{
                                let Icon = Icon1[data.icon] || Icon2[data.icon] || Icon3[data.icon]
                                return(
                                    <div className=' flex flex-row gap-x-4 text-white py-5  '> 
                                            <div className='  pr-3 lg:pr-1'> 
                                                    < Icon size={25} />
                                            </div>
                                            <div className=' flex flex-col gap-1  lg:w-[90%] xl:w-[70%] '>
                                                    <h1 className=' text-lg font-semibold text-richblack-25'>{data.heading} </h1>
                                                    <p className=' text-[14px] leading-[20px] text-richblack-300 font-medium'>{data.description}</p>
                                                    <p className=' text-[14px] text-richblack-300 font-medium'> {data.details}</p>
                                            </div> 

                                    </div>

                                )
                            })
                    }
                </div>
                <div className='  w-[100%] lg:w-[55%] gap-4 flex flex-col text-richblack-25 border-[1.5px] border-richblack-600 rounded-lg lg:p-[3rem]  px-5 pt-10  pb-5  '>
                    <h1 className= '  text-center base:text-start text-xl base:text-2xl lg:text-4xl text-richblack-25 font-semibold'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                    <p className=' text-richblack-400   text-base base:text-lg  font-medium'>Tall us more about yourself and what you’re got in mind.</p>
                    <ContactUsForm />
                </div>
       </div>

        <div className=' w-full  lg:w-11/12   mx-auto flex flex-col gap-y-4  lg:px-12     justify-center  mt-14'>
            <h1 className='  text-richblack-25 text-3xl text-center py-3 font-semibold'> Revews From Other Learners</h1>
             <ReviewSlider />
        </div>
       
       <div>
          <Footer />
       </div>
     
    </div>
  )
}
