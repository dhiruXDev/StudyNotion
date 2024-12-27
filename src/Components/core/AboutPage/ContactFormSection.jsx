import React from 'react'
import { ContactUsForm } from '../../ContactPage/ContactUsForm'
 

export const ContactFormSection = () => {
  return (
    <div className=' w-[98%] lg:max-w-[90%] lg:mx-auto text-richblack-25 flex flex-col py-16  lg:px-0 px-[1rem] gap-3 lg:items-center '> 
           <h1 className='   text-center text-3xl base:text-4xl font-semibold '>Get In Touch</h1>
           <p className=' text-center text-richblack-400 text-base font-medium '>We’d love to here for you, Please fill out this form.</p>
           <div className=' relative py-3 ' >
               <ContactUsForm />
           </div>

    </div>
  )
}
