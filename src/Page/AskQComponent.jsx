import React, { useEffect, useRef, useState } from 'react'
 import logo from '../assets/image/profileimg.jpg'
 import { RxCross2 } from "react-icons/rx";
 import { FaChevronDown } from "react-icons/fa";
 import { IoChevronDown } from "react-icons/io5";
import { ChatFooter } from '../Components/Chat/ChatFooter';
import EmojiPicker from 'emoji-picker-react';
import { ChatContainer } from '../Components/Chat/ChatContainer';
import  "../App.css"
import "../Components/Common/spinner.css"
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { setChatData ,setChatNotification} from '../slices/chatSlices';
import { IoIosNotifications ,IoIosNotificationsOff} from "react-icons/io";
import notificationPath from "../Components/Chat/notificationtune.mp3"
import { ChatEndModal } from '../Components/Chat/ChatEndModal';
 
export const AskQComponent = () => {
    const[isVisible,setIsvisible] = useState(false);
    const[isShowEmozy , setIsShowEmozy] = useState(false);
    const [userInput, setUserInput] = useState("");
    //const[isnotification , setIsnotification] = useState(false);
    const {chatMessageData  ,chatNotification} = useSelector((state)=>state.chat);
    const [isShowModal ,setIsShowModal]=useState(false);
    const notificationSound = new Audio(notificationPath);
    

    const dispatch = useDispatch();
    // The emoji picker   invisible if you click inside the ChatContainer. othervise it will be visible
    const ref = useRef(null);
    const containerRef = useRef(null);
    useOnClickOutside(ref , (event)=>{
        // Ensure the click is inside hte ChatContainer
           if(containerRef.current && containerRef.current.contains(event.target)){
               setIsShowEmozy(false);
           }
    });

    const notificationSoundHandle = ()=>{
           notificationSound.play();
    }
    const minimizeChatHandler = ()=>{
        setIsvisible(false);
    }
    const handleEmojiClick = (emoji)=>{
          setUserInput((prev)=> prev += emoji.emoji);
    }
    const endChatHandler =()=>{
          // Clear the Redux state for new chat 
           dispatch(setChatData([]));
          // Clear session storage for chat messages
          sessionStorage.removeItem("chatMessageData");
          setIsvisible(false);
          setIsShowModal(false);
           
    }

    const closeChatSupport =()=>{
        setIsShowModal(true);
        //  if (chatMessageData.length > 0) {
              
        //  }else{
        //      setIsvisible(false);
        //  }
    }
    
  return (
    <div className='fixed    bottom-10  right-5  xs:right-10 z-[1000]  overflow-hidden  ' > 
         {
            !isVisible &&           
                    <div  onClick={()=>{setIsvisible(true)}} className={`${!isVisible ? 'fade-in' : 'fade-out'} transition-all duration-200 ease-out relative min-h-[95px] cursor-pointer  `} >
                        <div className=' flex gap-x-2  text-richblack-900  bg-caribbeangreen-300 py-1 px-1   rounded-tl-xl rounded-b-xl '>
                            <span className=' text-xl'>👋</span>
                            <span className=' pr-1'>
                                    <p className=' text-xs'> Hi there! Got any questions?</p>
                                    <p className=' text-xs'>I can help you...</p>
                            </span>
                        </div>
                        <div className=''>
                            <img src={logo}  width={60} height={60}   className=' absolute right-0 top-6 aspect-square rounded-full border-t-2  border-richblack-100 ' />
                        </div>
                </div>
         }
         {
           isVisible && 
             <div  className={`transition-all duration-300 ease-in ${isVisible ? 'fade-in' : 'fade-out'} w-[320px] h-[440px] bg-richblack-800 flex flex-col justify-between relative rounded-md border-[1.5px] border-richblack-300`}>

                
                  {/*------------------------------------ Header---------------------------------- */}
                   <div className=' bg-caribbeangreen-300 w-full  h-[48px] pl-2  flex   justify-between relative '>
                        <div className='flex items-center justify-center gap-x-2 py-1 '>
                           {
                              chatMessageData.length == 0 ? <p className=' font-normal'>Chat Support</p> : (
                                    <>
                                        <img src={logo}  width={40} height={40} className='   aspect-square rounded-full border-t-2  border-richblack-100 ' />
                                        <span className=' text-base  font-[500]'>Dhiraj</span>
                                    </>
                              )
                           }
                
                         </div>
                         <div className=' flex gap-x-2   justify-center relative'>
                               <div  className=' flex items-center  text-2xl  '> 
                                     {
                                         chatNotification === true ? 
                                           (<IoIosNotifications title='Sound On' onClick={()=> {dispatch(setChatNotification(false))}}  className='    swing-animation cursor-pointer ' />)                                                     
                                            : 
                                           ( <IoIosNotificationsOff  title='Sound Off'  onClick={()=> { dispatch(setChatNotification(true)) ; 
                                                                                                        notificationSoundHandle();
                                                                                                         } }  className=' cursor-pointer  ' />) 
                                     }
                               </div> 
                              <div className=' flex items-center  cursor-pointer '>
                                    <IoChevronDown onClick={minimizeChatHandler} title='Minimize chat'  className=' text-xl  flex items-center  '/>
                              </div>
                              <div className=' flex    transition-all duration-300 items-center pr-2  cursor-pointer  '>
                                    <RxCross2 onClick={()=>setIsShowModal(true)}  title='End chat' className='  text-lg font-extrabold  '/>
                               </div>

                         </div>
                   </div>
                  {/* Chat Container */}
                  <div  ref={containerRef} className='relative    '> 
                      <ChatContainer  />
                      {
                         isShowEmozy && <div ref={ref} className=' absolute   left-5 top-4 bottom-0'> <EmojiPicker style={{'--epr-emoji-size': '18px' ,}  } height={300} width={280} searchDisabled={true}  onEmojiClick={handleEmojiClick}  theme='dark' className=' z-[1000] custom-scrollbar ' /> </div>
                      }
                      {
                            isShowModal && <div className=' h-full w-full  absolute top-0'> 
                                                     <div className=' h-full w-full  absolute     bg-richblack-700    blur-md opacity-50 top-0'> </div>
                                                     <div  className='absolute w-[210px]  h-[88px] top-[40%] left-[20%] text-richblack-200     '>
                                                                 <ChatEndModal setIsShowModal={setIsShowModal}  endChatHandler={endChatHandler} />
                                                    </div> 
                                         </div>
                      }
                  </div>

                  {/* Chat Footer */}
                   
                  <ChatFooter userInput={userInput} setUserInput={setUserInput}  setIsShowEmozy={setIsShowEmozy} /> 
                  
             </div>
         }


    </div>
  )
}
