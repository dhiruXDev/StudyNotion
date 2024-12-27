import React from 'react'
import Logo  from "../../assets/logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import {FaGoogle, FaTwitter, FaFacebook, FaYoutube} from "react-icons/fa"
import { FaHeart } from "react-icons/fa";
import { FooterLink2 } from '../../data/footer-links'
const Resources = ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
export const Footer = () => {
  return (  
    <div className=' w-full  max-h-max bg-richblack-800 text-richblack-400 border-t-2 border-richblack-700  '> 
          <div className='  w-full xs:w-11/12 mx-auto flex flex-wrap flex-col gap-4   px-10 '>
                <div className=' w-full xs:w-11/12 flex flex-row gap-4 justify-between  pt-14  pb-7   '>
                    {/* Left side */}
                       <div className='flex  flex-wrap  base:flex-col   lg:flex-row gap-12  base:border-r-2  border-richblack-700  base:pr-[2rem]'>
                             <div className=' max-w-max lg:w-[30%] flex flex-col gap-1'>
                                 <img src={Logo}   alt='Logo' height={10} width={180} className=''/>
                                 <h1 className=' text-[18px] leading-[24px] text-richblack-100  pb-2 font-semibold pt-3 '>Company</h1>
                                 {
                                    ["About" , "Career" , "Affiliates"].map((Element , index)=>{
                                        return(
                                            <div key={index} className=' text-sm  lg:text-[15px] lg:leading-[21px] font-[400] transition-all duration-200  '>
                                                <Link to={Element.split(" ").join("-").toLowerCase()} className='hover:text-richblack-50'>{Element}</Link>
                                            </div>
                                              
                                        )
                                    })
                                 }
                                    <div className=' flex gap-2 items-center justify-between  pr-12  pt-4 text-2xl  '>
                                            <FaFacebook  className='hover:text-richblack-25  cursor-pointer transition-all duration-200 '/>
                                            <FaGoogle className='hover:text-richblack-25  cursor-pointer transition-all duration-200 ' />
                                            <FaTwitter className='hover:text-richblack-25  cursor-pointer transition-all duration-200 ' />
                                            <FaYoutube className='hover:text-richblack-25  cursor-pointer transition-all duration-200 ' />
                                    </div>
                             </div>
                             <div className='flex base:flex-col base:gap-1 gap-x-9  relative  top-0 base: '>
                                   <div className=' flex flex-col'> 
                                      <h1  className='text-[18px] leading-[24px] text-richblack-100  pb-2 font-semibold pt-2'>Resources</h1>
                                      {
                                          Resources.map((element ,index)=>{
                                            return(
                                                <div key={index} className=' text-sm lg:text-[15px] lg:leading-[21px] font-[400] transition-all duration-200'>
                                                <Link to={element.split(" ").join("-").toLowerCase()} className='hover:text-richblack-50'>{element}</Link>
                                            </div>
                                            )
                                          })
                                      }
                                      </div>
                                      <div className=' flex  flex-col items-start relative top-0  -mt-10 base:mt-1'> 
                                            <h1 className='text-[18px] leading-[24px] text-richblack-100   font-semibold pt-12'>Supports</h1>
                                            <Link to={"help-center"}  className=' hover:text-richblack-50 text-sm lg:text-[15px] font-[400] transition-all duration-200  '> Help center </Link>
                                      </div>
                             </div>
                             <div  className=' flex  gap-x-8 base:flex-col relative'> 
                                <div className=''>
                                  <h1  className='text-[18px] leading-[24px] text-richblack-100   font-semibold pt-2 pb-2'>Plans</h1>
                                    {
                                           Plans.map((element , index)=>{
                                            return(
                                                <div key={index}  className=' text-[15px] leading-[24px] font-[400] transition-all duration-200   '>
                                                <Link to={element.split(" ").join("-").toLowerCase()} className='hover:text-richblack-50  transition-all duration-200'>{element}</Link>
                                            </div>
                                            )
                                          })
                                    }
                                            
                                </div>
                                <div className='  -mt-8 base:mt-0'>
                         
                                  <h1  className='text-[18px] leading-[24px] text-richblack-100  pb-2  font-semibold pt-12 '>Community</h1>
                                  {
                                        Community.map((element,index)=>{
                                         return(
                                             <div key={index} className=' text-[15px] leading-[21px] font-[400]   transition-all duration-200 '>
                                             <Link to={element.split(" ").join("-").toLowerCase()} className='hover:text-richblack-50 transition-all duration-200'>{element}</Link>
                                         </div>
                                         )
                                       })
                                   }
                                              
                                </div>
                             </div>                            
                       </div>
                       {/* Right side */}
                       <div  className=' base:!flex hidden    flex-wrap flex-col lg:flex-row gap-20      '>
                              
                                {
                                     FooterLink2.map((element,index)=>{
                                         return(
                                            <div key={index} className=' flex flex-col '> 
                                                <h1 className='text-[18px] leading-[24px] text-richblack-100  pb-2  font-semibold  '> {element.title} </h1>
                                                <div> 
                                                     {
                                                        element.links.map((data ,index)=>{ 
                                                            return(
                                                                 <div key={index} className=' max-[375px]:!text-[5px] xs:text-sm lg:text-[15px] lg:leading-[27px] fon8-[400]     transition-all duration-200'>
                                                                     <Link to={data.link.split(" ").join("-").toLowerCase()} className='hover:text-richblack-50 transition-all duration-200 '>{data.title}</Link>
                                                                 </div>
                                                            )
                                                        })
                                                     }
                                                </div>
                                            </div>
                                              
                                                
                                         )
                                     })
                                } 
                       </div>
                </div>
          </div>
            <div className=' w-[85%] flex-wrap  mx-auto border-t-2 border-richblack-700 pt-4   flex  justify-between  items-center gap-2 '>
                    <div className='flex py-10 gap-3   '>
                        {
                            BottomFooter.map((element,index)=>{
                                return(
                                    <div key={index} className ={`${element === "Terms" ? " border-none" : " border-r-[2px] border-richblack-700 "}  pr-3 text-[15px] leading-[24px] font-medium `}> 
                                        <Link to={element.split(" ").join("-").toLowerCase()} >{element}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className=' flex flex-row gap-1 '>
                        <p className=' flex flex-row gap-2 items-center  font-medium'>Made with <FaHeart className=' text-pink-500' /> codehelp ©2023 StudyNotion </p>
                    </div>
            </div>
    </div>
  )
}
