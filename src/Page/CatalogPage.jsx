import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { catagories } from '../services/apis';
import { CatagoryPageData } from '../services/operation/CatagoryPageData';
import {Footer} from "../Components/Common/Footer";
import { CourseCard } from '../Components/core/Catalog/CourseCard';
import { CourseSlider } from '../Components/core/Catalog/CourseSlider';
import spinner from "../Components/Common/spinner.css"
import { AskQComponent } from './AskQComponent';
export const CatalogPage = () => {
    const {CatalogName} =useParams();
    const[categoryId , setCategoryId] = useState("");
    const[catalogPageData , setCatalogPageData] = useState(null);
    const[active ,setActive] = useState(1);
    const[loading,setLoading] = useState(false);
     // Fetching the CourseId when i clicked on any catalog (i.e, wev dev )
    useEffect(()=>{
              const getCategory = async()=>{
                      setLoading(true);
                       // Finding all category
                      const response = await apiConnector("GET",catagories.CATAGORIES_API);
                      //console.log( "Response  for fetching categoryID " ,response)
                      const category_id = response?.data?.AllCategory?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === CatalogName)[0]._id;
                      setCategoryId(category_id);
                      setLoading(false);
              }
              getCategory();
    },[CatalogName])

    //Fetching the categorypage details when any category is clicked , and it will happen after fetcing categorID
    useEffect(()=>{
           const getCategoryPageData =  async()=>{
               try {
                     setLoading(true);
                    const response =  await  CatagoryPageData({categoryId:categoryId});
                   // console.log( "REsponse of getting page details ", response)
                    setCatalogPageData(response);
               } catch (error) {
                  // console.log( "Error during fetching page Data -- ", error)
                   console.error(error.message);
               }
               setLoading(false);
           }
           if(categoryId){
            getCategoryPageData();
           }
         
    },[categoryId])
    
if(loading || !catalogPageData){
        return(  
              <div className=' grid place-content-center  place-items-center w-[100vw] h-[100vh]'>
                     <div className='spinner'></div>
              </div>  
        )
}
   console.log("sel",catalogPageData?.SelectedCategory?.course) 
   console.log("dif",catalogPageData?.defferentCatagoris?.course) 
  return ( 
           <div className=' text-white  font-inter'>
                {/* Heading */}
                <div className=' bg-richblack-800  mx-auto flex flex-col  w-full h-auto p-2 font-inter'>
                     <div className=' w-[910px]  px-3  md:ml-[6rem] md:pl-14 md:pr-3   pb-6 pt-5   flex flex-col gap-y-4   '>
                            <span className=' text-base  text-richblack-300  '>Home{" "}/ Catalog / <span className=' text-base  text-yellow-100'>{catalogPageData?.SelectedCategory?.name}</span></span>
                            <h1 className=' text-richblack-25 text-3xl font-medium '>{catalogPageData?.SelectedCategory?.name}</h1>
                            <p className='text-[14px] leading-[22px]  text-richblack-300 '>{catalogPageData?.SelectedCategory?.description  }</p>
                     </div>
                </div>
                       {/* Sections  */}
                <div className=' flex flex-col gap-y-8  mx-auto  lg:max-w-[90%] w-full px-10 md:px-20   pt-5  '> 
                     {/* Section 1 --- > Course To get started */}
                        <div className='  flex-col gap-y-3  pt-1 '>
                             <h1 className=' text-4xl py-2 font-semibold  text-white pb-5 '>Courses to get you started</h1>
                             <div className=' flex gap-x-4   border-b-[1.5px]  border-richblack-600  text-sm '>
                                  <button onClick={()=>setActive(1)} className={`${active=== 1 ? "border-yellow-25 text-yellow-25 border-b-[1.5px]" : "  border-richblack-600 text-richblack-500" }  pb-2`}>
                                         Most Popular
                                  </button>
                                  <button onClick={()=>setActive(2)} className={`${active=== 2 ? "border-yellow-25 text-yellow-25 border-b-[1.5px]" : "border-richblack-600 text-richblack-500" } pb-2 `}>
                                        New
                                  </button>

                             </div>
                             <div className=' w-[360px]'>
                                   <CourseCard course={catalogPageData?.SelectedCategory?.course[0]} /> 
                             </div>
                        </div>

                        {/* Section 2 ------>Top courses */}
                        <div className='  flex-col gap-y-3  '>
                               <h1 className=' text-2xl base:text-4xl py-2 font-semibold  text-white pb-4 '>Top courses in {catalogPageData?.defferentCatagoris?.name}  </h1>
                               <CourseSlider Courses={catalogPageData?.defferentCatagoris?.course}  /> 
                        </div>

                        <div className=' flex flex-col gap-y-6 w-full pb-24'>
                                <h1 className='  text-2xl base:text-4xl pt-2 font-semibold  text-white pb-4 '>Frequently Bought Together</h1>
                                 <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6   '>
                                       {
                                          catalogPageData?.mostSellingCourses?.slice(0,4).map((course,index)=>(
                                                  <CourseCard  course={course} key={index}    Height ={" h-[320px]"} />
                                          ))
                                       }
                                 </div>
                        </div>
                </div>
              
              {/* Footer section */}
               <Footer />
           </div>
  )
}

 