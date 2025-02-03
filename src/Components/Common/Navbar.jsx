import React, { useEffect, useReducer, useRef, useState } from 'react'
import logo from "../../assets/logo/Logo-Full-Light.png"
import { Link,   matchPath,   useLocation, useNavigate } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import {ProfileDropDown} from "../core/auth/ProfileDropDown"
import { apiConnector } from '../../services/apiConnector'
import { catagories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import useOnClickOutside from '../../hooks/useOnClickOutside'
import "../../App.css"
export const Navbar = () => {
     const {token} = useSelector((state)=> state.auth);
     const {user} = useSelector((state)=> state.profile);
     const {totalItem} = useSelector ((state)=>state.cart)
     const location = useLocation();
     const navigate = useNavigate();
     const[subLinks , setSubLinks]= useState([]);
     const [loading , setloading] = useState(true);
     const[isMenuVisible,setIsMenuVisible]  = useState(false);
     const[isCatalogDropDownVisible ,setIsCatalogDropDownVisible] =useState(false);
     const[isanimation ,setIsanimation] = useState(false);
     const ref = useRef(null);

     useOnClickOutside(ref,()=>setIsCatalogDropDownVisible(false));

     const FetchSubLinks =async()=>{
          try {   
                 const result = await apiConnector("GET" , catagories.CATAGORIES_API);
                 setSubLinks(result.data.AllCategory);
                 setloading(false);
          } catch (error) {
                console.log(error.message);
                console.error();
          }
     }
     useEffect(()=>{
          FetchSubLinks();
     },[])
     
  
     const  matchRoute = (route) =>{
          return matchPath({path:route} , location.pathname) 
     }
   // Define routes where Catalog should not be highlighted
    const excludeCatalogHighlight = ['/', '/about', '/contact'];
  
    // Check if Catalog should be highlighted
    const shouldHighlightCatalog = !excludeCatalogHighlight.some((route) =>
      matchRoute(route)
    );
    
     return (
      <>
       <div className="w-full h-16 md:h-14 flex items-center bg-richblack-800 border-b-[1.5px] border-richblack-700">
            <div className=" w-full md:w-11/12 max-w-maxContent mx-auto flex md:px-8  px-5   justify-between items-center ">
                      <Link to="/">
                        <img src={logo} loading="lazy" height={120} width={140} alt="Logo" />
                      </Link>
                      <nav className="!hidden md:!flex ">
                        <ul className="flex space-x-4 text-richblack-25">
                          {NavbarLinks.map((links, index) => {
                            const isCatalog = links.title === 'Catalog';
              
                            return (
                              <li
                                key={index}
                                className="flex items-center gap-x-1 text-[16px] leading-[24px] font-inter font-[400]"
                              >
                                {isCatalog ? (
                                  <div
                                    className={`flex items-center gap-x-1 ${
                                      shouldHighlightCatalog
                                        ? 'text-yellow-50'
                                        : 'text-richblack-5'
                                    } hover:text-richblack-200 duration-300 cursor-pointer group`}
                                  >
                                    <p>{links.title}</p>
                                    <FaChevronDown className="text-[12px] leading-3 top-[3px]" />
                                    {/* Dropdown menu */}
                                    <div className="invisible absolute left-[52%] top-[0.5%] z-30 flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible overflow-visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[200px]">
                                      <div className="absolute bg-richblack-5 h-6 w-6 rounded rotate-45 translate-x-[25%] translate-y-[-90%] left-[10%] -z-10"></div>
                                      {loading ? (
                                        <div>Loading...</div>
                                      ) : (
                                        subLinks.map((Element, idx) => (
                                          <Link
                                            to={`/catalog/${Element.name
                                              .split(' ')
                                              .join('-')
                                              .toLowerCase()}`}
                                            key={idx}
                                          >
                                            <p className="text-[14px] text-black bg-transparent hover:bg-richblack-200 py-2 px-3 font-inter font-[500] rounded-md">
                                              {Element.name}
                                            </p>
                                          </Link>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <Link to={links.path}>
                                    <p
                                      className={`${
                                        matchRoute(links.path)
                                          ? 'text-yellow-50'
                                          : 'text-richblack-5'
                                      } hover:text-richblack-200 duration-300`}
                                    >
                                      {links.title}
                                    </p>
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </nav>
                      
                      {/* Login / SignUp / Dashboard */}
                      <div className=" flex base:!ml-5 gap-x-4 items-center ">
                        {user && user.accountType !== 'Instructor' && (
                          <Link to="/dashboard/cart" className="relative pl-10 py-2">
                            <AiOutlineShoppingCart className="text-3xl text-richblack-25 hover:text-richblack-300 duration-200 transition-all" />
                            {totalItem > 0 && (
                              <div className="absolute top-1.5 left-[36%] h-6 w-6 p-1 bg-caribbeangreen-400 text-richblack-900 rounded-full flex items-center justify-center animate-bounce">
                                <span className="text-xs font-semibold">{totalItem}</span>
                              </div>
                            )}
                          </Link>
                        )}
                        {token === null && (
                          <>
                            <Link 
                                to="/logIn" className="  md:text-sm text-richblack-100 bg-richblack-800 border-2 border-richblack-700 px-3 py-1 rounded-md font-inter font-medium text-xs hover:bg-richblack-700 transition-all duration-200"
                              >
                              Log In
                            </Link>
                            <Link
                              to="/signUp"
                              className=" hidden md:!flex  md:text-sm text-richblack-100 bg-richblack-800 border-2 border-richblack-700 px-3 py-1 rounded-md font-inter font-medium text-xs hover:bg-richblack-700 transition-all duration-200"
                            >
                              Sign Up
                            </Link>
                          </>
                        )}
                        {token !== null && <ProfileDropDown />}
                        <div className=' md:!hidden  !flex '>
                              {
                                !isMenuVisible&& <HiMenuAlt3 onClick={()=>{setIsMenuVisible(true) ; setIsCatalogDropDownVisible(false)}} className=' animate-open-menu  text-richblack-300 text-2xl cursor-pointer  hover:text-richblack-500 duration-300 transition-all ' />               
                              }  
                            {
                                isMenuVisible && <RxCross2 onClick={()=>{ setIsanimation(true); setTimeout(()=>{
                                  setIsMenuVisible(false);
                                  setIsanimation(false);
                                } , 500)}} className=' animate-open-menu text-richblack-300 text-2xl cursor-pointer      hover:text-richblack-500 duration-100 transition-all ' />
                            } 
                      </div>
                      </div>
            </div>
       </div>
              {
                  isMenuVisible && 
                       <div className={`transition-all  duration-200  ${isMenuVisible && "animate-slide-down" } ${isanimation && "animate-slide-up"}  md:!hidden !flex items-center justify-center absolute   w-full overflow-visible z-[10000] h-auto pb-4 bg-richblack-800 border-b border-r-richblack-600`}>
                             {/* <div className=' bg-richblack-500 blur-md  absolute  -z-[50] opacity-50  w-full h-full  '> jb</div> */}
                            <div className="flex flex-col items-center mt-5  gap-y-3 space-x-4 text-richblack-25">
                                  {NavbarLinks.map((links, index) => {
                                    const isCatalog = links.title === 'Catalog';          
                                    return (
                                      <li
                                        key={index}
                                        className="flex items-center gap-x-1 text-[16px] leading-[24px] font-inter font-[400]"
                                      >
                                        {isCatalog ? (
                                          <div
                                             onClick={()=>setIsCatalogDropDownVisible(true)}
                                            className={`flex items-center gap-x-1 ${
                                              shouldHighlightCatalog
                                                ? 'text-yellow-50'
                                                : 'text-richblack-5'
                                            } hover:text-richblack-200 duration-300 cursor-pointer group`}
                                          >
                                            <p>{links.title}</p>
                                            <FaChevronDown className="text-[12px] leading-3 top-[3px]" />
                                            {/* Dropdown menu */}
                                            {
                                                isCatalogDropDownVisible &&   
                                                    <div className="  absolute left-[70%] top-[28%] z-[5000] flex w-[200px] translate-x-[-50%] translate-y-[2.8em] flex-col rounded-lg bg-richblack-5 px-3 py-2 text-richblack-900   transition-all duration-200   overflow-visible  opacity-100 lg:w-[200px]">
                                                      <div className="absolute bg-richblack-5 h-6 w-6 rounded rotate-45 translate-x-[25%] translate-y-[-70%] left-[10%] -z-10"></div>
                                                         {
                                                              loading ? (<div className=' text-xs'>Loading...</div> )  
                                                            : 
                                                              (
                                                                subLinks.map((Element, idx) => (
                                                                  <p
                                                                  key={idx}
                                                                  onClick={() => {
                                                                    navigate(`/catalog/${Element.name.split(' ').join('-').toLowerCase()}`);
                                                                    setIsCatalogDropDownVisible(false);
                                                                    setIsMenuVisible(false);
                                                                  }}
                                                                  className="text-[14px] text-black bg-transparent   py-1 px-2 font-inter font-[500] rounded-md cursor-pointer"
                                                                >
                                                                  {Element.name}
                                                                </p>
                                                                ))
                                                              )}
                                                    </div>
                                            }
                                            
                                          </div>
                                        ) : (
                                           
                                            <p
                                              onClick={()=>{
                                                 navigate(links.path);
                                                 setIsMenuVisible(false);
                                              }}
                                              className={`${
                                                matchRoute(links.path)
                                                  ? 'text-yellow-50'
                                                  : 'text-richblack-5'
                                              } hover:text-richblack-200 duration-300 cursor-pointer`}
                                            >
                                              {links.title}
                                            </p>
                                           
                                        )}
                                      </li>
                                    );
                                  })}

                                  {token === null && (
                                    <>
                                      <p
                                        onClick={()=>{
                                           navigate("/signUp");
                                           setIsMenuVisible(false);
                                        }}
                                        className=" cursor-pointer md:text-sm text-richblack-100 bg-richblack-800 border-2 border-richblack-700 px-3 py-1 rounded-md font-inter font-medium text-xs hover:bg-richblack-700 transition-all duration-200"
                                      >
                                        Sign Up
                                      </p>
                                    </>
                                  )}

                            </div>

                       </div>
              }
       </>
     );


}

 