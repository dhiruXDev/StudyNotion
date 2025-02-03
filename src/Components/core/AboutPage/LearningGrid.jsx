import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import { Link } from 'react-router-dom';
import CTAbutton from '../HomePage/CTAbutton';

export const LearningGrid = () => {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/"
        },
        {
          order: 1, 
          heading: "Curriculum Based on Industry Needs",
          description: 
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];

  return (
    <div className='grid w-full    relative grid-cols-1 lg:grid-cols-4 pb-14 mt-10 '> 
         {
            LearningGridArray.map((data , index)=>{
                return (
                    <div className= {`
                                ${index===0  && "lg:col-span-2 lg:h-[300px] " } 
                                ${data.order % 2 === 1  ? " bg-richblack-700  " : " bg-richblack-800   "}
                                ${data.order === 3 && "lg:col-start-2"}
                                ${data.order < 0 && "bg-transparent"}
                                ${index > 0 && "lg:w-auto sm:w-[50%] w-[80%] lg:my-0 my-4 " }
                                 
                        `}>
                             {
                                data.order < 0 ? 
                                    ( 
                                        <div className=' relative flex flex-col lg:gap-2  pb-10 lg:pb-0   text-richblack-5 '> 
                                            <div className=' flex flex-col gap-3'>
                                                 <h1 className=' w-[90%]  md:w-[60%] lg:w-[90%] xl:w-[80%] text-2xl base:text-3xl lg:text-4xl font-semibold'>{data.heading} <HighlightText text={data.highlightText} /></h1>
                                                 <p className=' w-[90%] md:w-[70%] lg:w-[90%]  xl:w-[90%] text-richblack-400 font-medium text-xs  base:text-sm md:text-base lg:text-lg'> {data.description}</p>
                                             </div>
                                             <div className=' w-fit '>
                                                    <CTAbutton active={true} linkTo={data.BtnLink}>
                                                                    {data.BtnText}
                                                    </CTAbutton>
                                                 </div>      
                                            
                                        </div>
                                    ) 
                                    
                                    : ( 
                                        <div className='  flex flex-col  gap-y-4 base:gap-10   py-5 base:py-10 px-11 lg:my-0     lg:min-w-[180px] lg:min-h-[280px]'> 
                                            <h1 className=' text-richblack-5  text-xl'>{data.heading}</h1>
                                            <p className=' text-richblack-300  text-sm sm:text-base'>{data.description}</p>
                                        </div>
                                    )
                             }

                    </div>
                )
            })
         }  
    </div>
  )
}
