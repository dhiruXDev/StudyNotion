
import React, { useState } from 'react';
import { sidebarDataAndLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarLink } from './SidebarLink';
import { logOut } from '../../../services/operation/authApi';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import { IoMenu, IoClose } from 'react-icons/io5';
import { ConfirmationModal } from '../../Common/ConfirmationModal';
import { FaCircleArrowLeft } from "react-icons/fa6";
export const Sidebar = () => {
  const { loading: profileLoading, user } = useSelector((state) => state.profile);
  const { loading: authnLoading } = useSelector((state) => state.auth);
  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authnLoading) {
    return <div className="spinner"></div>;
  }

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe right to left -> Hide sidebar
      setIsOpen(false);
    } else if (touchEndX - touchStartX > 50) {
      // Swipe left to right -> Show sidebar
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`absolute top-[0%] ${
          isOpen ? 'left-0' : '-left-full'
        } md:relative md:left-0 z-50 flex flex-col  overflow-visible min-h-[100%] md:pt-10 w-[245px] bg-richblack-800 text-richblack-300 border-r-[2px] border-richblack-500 transition-all duration-300 ease-in`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* <div className=' w-full h-full z-[100]  bg-richblack-700'></div> */}
        <div className="flex justify-end items-center  -mr-5 z-[10000]  pt-4 md:hidden">
          <button onClick={() => setIsOpen(false)} className={ ` ${!isOpen && "rotate-180"} text-richblack-200 text-2xl hover:bg-richblack-700 transition-transform transform rotate-0 px-2 py-2 rounded-full duration-100     `}>
            <FaCircleArrowLeft />
          </button>
        </div>
        <div className="flex flex-col pb-8">
          {sidebarDataAndLinks.map((links) => {
            if ((links.type && user.accountType === links.type) || links.name === 'My Profile') {
              return <SidebarLink setIsOpen={setIsOpen}  key={links.id} links={links} IconName={links.icon} />;
            }
            return null;
          })}
        </div>
        <div className="h-[1.5px] w-11/12 flex mx-auto bg-richblack-700"></div>
        <div className="flex flex-col py-5">
          <SidebarLink  setIsOpen={setIsOpen}  links={{ name: 'Setting', path: 'dashboard/setting' }} IconName="VscSettingsGear" />
          <button
            onClick={() =>
              setConfirmationModalData({
                btn1Text: 'LogOut',
                btn2Text: 'Cancel',
                heading: 'Are you sure?',
                description: 'You will be logged out from your account',
                btn1Handler: () => dispatch(logOut(navigate)),
                btn2Handler: () => setConfirmationModalData(null),
              })
            }
          >
            <div className="flex gap-x-4 pl-5 hover:bg-richblack-700 duration-200 py-3">
              <VscSignOut className="text-2xl" />
              <p className="text-base">LogOut</p>
            </div>
          </button>
        </div>
        {confirmationModalData && <ConfirmationModal modalData={confirmationModalData} />}
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute  top-[1%] right-4 md:hidden bg-richblack-800 hover:bg-richblack-700 cursor-pointer text-richblack-300 p-3 rounded-full shadow-lg z-[1000]"
      >
        <IoMenu className="text-2xl" />
      </button>
    </>
  );
};

// Without gesture feeling  code 


// import React, { useState } from 'react'
// import { sidebarDataAndLinks } from '../../../data/dashboard-links'
// import { useDispatch, useSelector } from 'react-redux'
// import { SidebarLink } from './SidebarLink'
// import spinner from "../../Common/spinner.css"
// import {logOut} from "../../../services/operation/authApi"
// import { useNavigate } from 'react-router-dom'
// import { VscSignOut } from "react-icons/vsc";
// import { ConfirmationModal } from '../../Common/ConfirmationModal'
// import { IoMenu } from "react-icons/io5";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// export const Sidebar = () => {

//     const{loading : profileLoading , user} = useSelector((state)=>state.profile);
//     const{loading:authnLoading } = useSelector((state)=>state.auth);
//     const[confirmationModalData , setconfirmationModalData] = useState(null);
//     const dispatch= useDispatch();
//     const navigate=  useNavigate();
//     const[isOpen,setIsOpen] =useState(false);

//     if (profileLoading || authnLoading) {
//          return <div className='spinner'></div>
//     }

//   return (
//   <div className={`${isOpen ? "min-w-[245px] py-10" : "w-[55px] pt-2 absolute left-0 z-[1000]"}  flex flex-col  min-h-[calc(100vh-3.8rem)]    border-r-[2px] border-richblack-500  bg-richblack-800 text-richblack-300  duration-200 `}> 
//              {
//                 !isOpen && <div onClick={()=>setIsOpen(!isOpen)} className=' h-12 w-12 hover:bg-richblack-700 hover:text-richblack-100  text-richblack-500  rounded-full duration-200 transition-all text-center flex items-center justify-center'> <BsArrowLeftCircleFill className=' cursor-pointer text-4xl ' /> </div>
//              }
//             <div className='  relative flex flex-col pb-8 '>
//                           {
//                             sidebarDataAndLinks.map((links)=>{
//                                      if(links.type && user.accountType === links.type || links.name === "My Profile"){
//                                            return <SidebarLink  key={links.id}  links={links} IconName = {links.icon} />
//                                      }
//                                      else{
//                                         return null
//                                      }
//                             })
//                           }
//             </div>
//             <div className=' h-[1.5px] w-11/12 flex mx-auto bg-richblack-700'></div>
//             <div className=' flex flex-col   py-5  '>
//                     <SidebarLink links={{name:"Setting",path :"dashboard/setting"}}  IconName  ="VscSettingsGear" />
//                     <button  
//                             onClick={()=> setconfirmationModalData({
//                                 btn1Text:'LogOut',
//                                 btn2Text:"Cancel",
//                                 heading:"Are you sure?",
//                                 discription:"You will be logged out from your account",
//                                 btn1Handler:()=> dispatch(logOut(navigate)),
//                                 btn2Handler:()=> setconfirmationModalData(null)
//                             })}
//                         >
//                                 <div className=' flex gap-x-4   pl-5 hover:bg-richblack-700  duration-200 py-3 '>
//                                         <VscSignOut  className=' text-2xl' />
//                                         <p className=' text-base'>LogOut</p>
//                                 </div>
//                     </button>
//             </div>
//             {
//                 confirmationModalData && <ConfirmationModal modalData= {confirmationModalData} />
//             }
//           </div>
          
     
 
//   )
// }
