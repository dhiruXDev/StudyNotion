import React from "react";
import { NavLink } from "react-router-dom";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import HighlightText from "../Components/core/HomePage/HighlightText";
import CTAbutton from "../Components/core/HomePage/CTAbutton"
import Banner from "../assets/image/banner.mp4"
import { CodeBlocks } from "../Components/core/HomePage/CodeBlocks";
import "../App.css"
import "../Components/core/HomePage/gradeint.css"
import { TimeLineSection } from "../Components/core/HomePage/TimeLineSection";
import { LearningLanguageSection } from "../Components/core/HomePage/LearningLanguageSection"
import { ExploreMore } from "../Components/core/HomePage/ExploreMore";
import Instructor from "../assets/image/Instructor.png"
import { Footer } from "../Components/Common/Footer.jsx"
import Tilt from 'react-parallax-tilt';
import "../App.css"
import { ReviewSlider } from "../Components/Common/ReviewSlider.jsx";
import { AskQComponent } from "./AskQComponent.jsx";
 
export default function Home() {
    
      return (
            <div className="  w-full " >
                  {/* Section 1   */}
                  <div className="lg:w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-3   items-center  overflow-visible ">
                        <div className=" relative  bg-richblack-800  rounded-full py-2 px-4 mt-7 shadow-custom-white  transition-all duration-150 group hover:scale-95 cursor-pointer" >
                              <NavLink to={'/signUp'} className=" flex  flex-row gap-1  items-center font-medium  font-inter    text-[16px] text-richblack-200">
                                    <p>Become an Instructor</p>
                                    <HiMiniArrowSmallRight className=" text-[22px]" />
                              </NavLink>
                        </div>
                        <div className=" mt-2 relative py-3 text-center   ">
                              <p className=" px- base:text-[26px] md:text-4xl text-3xl  font-semibold font-inter text-richblack-5  "> Empower Your Future with <HighlightText text={`Coding Skills`} /> </p>
                        </div>
                        <div className=" relative  px-2  xs:w-[70%] text-richblack-300 font-medium text-center">
                              <p className=" text-[0.6rem] xs:text-[0.8rem]  md:text-[1.09rem] md:leading-[24px]  "> With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.   </p>
                        </div>
                        <div className=" relative flex  gap-x-6 mt-0 xs:mt-2 text-[12px]  flex-row ">
                              <CTAbutton active={true} linkTo={'/signUp'} >Learn More</CTAbutton>
                              <CTAbutton active={false} linkTo={'/logIn'}> Book a Demo</CTAbutton>
                        </div>
                        {/* shadow-[-8px_-12px_20px]   shadow-blue-200  */}
                        {/* <div className=' absolute  md:h-[450px]  ml-4 mt-12 px-5 py-8 w-[39%] pb-[12rem] shadow-[5px_5px_70px_10px_#00C2FC] rounded-full z-10  translate-x-[5%]  translate-y-[70%] ' > </div> */}
                        {/* left-[31%] top-[50%] */}
                        <div className="  relative   xs:mt-6  px-10  py-24   max-w-max  max-h-max  z-50     flex items-center justify-center ">   {/*   Box shadow is added in talwind config  */}
                                                                   <div className=" absolute homePagebackground  translate-x-[25%] translate-y-[30%]  xs:translate-x-[25%] xs:translate-y-[-70%]  "> </div>
                                                                  <video muted autoPlay loop height={380} width={910}  className="    shadow-[12px_12px_0px_4px_rgba(255,255,255,1)]  z-50 "  >
                                                                        <source src={Banner} type="video/mp4" />
                                                                  </video> 
                                                                  {/* <div className="  absolute h-[27rem] w-[14rem]     shadow-[5px_5px_200px_2px_#00C2FC] rounded-xl translate-x-[80%] translate-y-[1%] -z-10 ">  </div> */}
    
                      {/* //  <div className=' absolute  h-[80%] w-[40%]    shadow-[5px_5px_110px_8px_#00C2FC]  rounded-3xl translate-x-[0%]  translate-y-[0%]    z-10  ' > </div> */}

                        </div>

                        <div  className=" flex  px-3  relative">
                              <CodeBlocks className='transition-all duration-400'
                                    heading={<p className=" text-4xl font-semibold font-inter text-richblack-5  "> Unlock your  <HighlightText text={`coding potential`} /> with our online courses. </p>}
                                    subHeading={<p className=" text-richblack-300">Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>}
                                    ctabtn1={{
                                          btnText: "Try it yourself",
                                          active: true,
                                          linkTo: "/signUp"
                                    }
                                    }
                                    ctabtn2={{
                                          btnText: "Learn More",
                                          active: false,
                                          linkTo: "/logIn"
                                    }
                                    }
                                    position={"lg:flex-row"}
                                    codeBlock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</\n title><linkrel="stylesheet"href="styles.css">\nhead>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two<\n/a><ahref="three/">Three</a>\nnav>`
                                    }
                                    backgroundGradeint={"codeblock1"}
                                    codeColor={"gradient-text"}
                              />
                        </div>

                        <div className="  flex  px-3  relative">
                              <CodeBlocks
                                    heading={<p className=" text-4xl font-semibold font-inter text-richblack-5  ">Start  <HighlightText text={`coding in seconds`} /> </p>}
                                    subHeading={<p className=" text-richblack-300">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</p>}
                                    ctabtn1={{
                                          btnText: "Countinue Lession",
                                          active: true,
                                          linkTo: "/signUp"
                                    }
                                    }
                                    ctabtn2={{
                                          btnText: " Learn More",
                                          active: false,
                                          linkTo: "/logIn"
                                    }
                                    }
                                    position={"lg:flex-row-reverse"}
                                    codeBlock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\nead>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two<\n/a><ahref="three/">Three</a>\nnav>`

                                    }
                                    backgroundGradeint={"codeblock2"}
                                    codeColor={"gradient-text"}
                              />
                        </div>
                              
                        <ExploreMore />
  
                  </div>
                  {/* Section 2 */}
                  <div className=" relative   lg:w-full   bg-pure-greys-5  w-full ">
                        <div className="bg_home  bg-contain  h-[100px] base:h-[333px] flex flex-wrap gap-3  justify-center items-start  mt-5 base:mt-0 py-3 base:py-[8rem] z-30 relative  " >
                              <CTAbutton active={true} linkTo={"/signUp"} >
                                    <div className=" flex  items-center gap-2 font-inter font-bold ">
                                          Explore Full Catalog
                                          <HiMiniArrowSmallRight className=" text-[24px]" />
                                    </div>
                              </CTAbutton>
                              <CTAbutton active={false} linkTo={'/signUp'}>
                                    Learn More
                              </CTAbutton>
                        </div>
                        <div className="my-[5rem]     w-full  items-start gap-5  mx-auto px-6 flex lg:flex-row  flex-col   lg:gap-12  lg:justify-between lg:items-center ">
                              <div className=" lg:w-1/2  mt-5 lg:px-8 ">
                                    <p className=" overflow-y-hidden  text-3xl xs:text-4xl font-bold"> Get the skills you need for a <HighlightText text={"job that is in demand."} /></p>
                              </div>
                              <div className=" w-full lg:w-1/2 flex flex-col gap-4  pr-5">
                                    <p className="   text-sm  xs:text-lg font-inter font-semibold text-richblack-800">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                                    <div className=" w-[55%] xs:max-w-[30%]  font-bold  lg:text-sm ">
                                          <CTAbutton active={true} linkTo={'/logIn'} >Learn More</CTAbutton>
                                    </div>
                              </div>
                        </div>

                        <TimeLineSection />
                        <LearningLanguageSection />

                  </div>
                  {/* Section 3 */}
                  <div className=" relative w-full bg-richblack-900  max-h-maxContent ">
                        <div className=" w-full lg:w-11/12 mx-auto max-w-maxContent flex  lg:flex-row flex-col-reverse  justify-between lg:items-center lg:py-[7rem] lg:px-[2rem] px-6 pt-5 gap-2 lg:gap-2 ">
                              <div className=" w-fit  lg:w-[50%] lg:shadow-[-15px_-13px_0px_1px_rgb(255,255,255)] ">
                                    <img src={Instructor} alt="Instructor" />
                                    <div className=" flex lg:!hidden ">
                                          <CTAbutton active={true} linkTo={"/singUp"}    >
                                                <div className="   gap-2 flex  ">
                                                      Start Teaching Today
                                                      <HiMiniArrowSmallRight className=" text-2xl" />
                                                </div>
                                          </CTAbutton>
                                    </div>
                              </div>

                              <div className=" lg:w-1/2 flex flex-col gap-2  items-baseline  justify-center  lg:ml-[4rem] ">
                                    <p className=" text-white text-3xl lg:text-[40px] lg:leading-[48px]   font-semibold xl:w-[40%]  overflow-hidden ">Become an <HighlightText text={"insructor"} /> </p>
                                    <p className=" text-richblack-500  text-sm  lg:text-base font-semibold  w-[70%] lg:w-[90%] pt-3     "> Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                                    <div className=" hidden lg:!flex">
                                          <CTAbutton active={true} linkTo={"/singUp"}    >
                                                <div className="   gap-2 flex  ">
                                                      Start Teaching Today
                                                      <HiMiniArrowSmallRight className=" text-2xl" />
                                                </div>
                                          </CTAbutton>
                                    </div>
                              </div>

                        </div>
                        {/* Reviews  */}

                  <section className=' w-full lg:w-11/12 flex flex-col h-auto   mx-auto  lg:px-[4.5rem]  '>
                              <div  className=' py-3  h-auto w-full lg:max-w-[100%] flex flex-col gap-y-6  '>
                                    <h1 className='  text-richblack-25 text-3xl text-center py-3 font-semibold'> Reviews From Other Learners</h1>
                                    <ReviewSlider  />
                              </div>
                  </section>

                  </div>
                  {/* Footer */}
                  <Footer />

           
            </div>
      )
}
