import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import { BsEmojiSmile, BsQuestion } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { chatCommunicating } from '../../services/operation/chatFeatureApi';
import { useDispatch, useSelector } from 'react-redux';
import { setChatData } from '../../slices/chatSlices';
import notificationPath  from "./notificationtune.mp3"
export const ChatFooter = ({setIsShowEmozy ,setUserInput ,userInput}) => {
        
        const dispatch = useDispatch();
        
        const {chatNotification , chatMessageData} = useSelector((state)=>state.chat);
        const notificationSound =  new Audio(notificationPath);

        const playNotificationSound = ()=>{
            if(chatNotification){
                notificationSound.play();
            } 
           
        }
        const handleSendMessage = async() => {
            if (!userInput.trim()) return;
            playNotificationSound();
            // Add user's message to Redux state
            dispatch(setChatData({ type: "user", content: userInput }));
            try {
                // Make API request to get bot response
                 const response = await chatCommunicating({userInput}) ;
                // Add bot's response to Redux state
                dispatch(setChatData({ type: "bot", content: response }));
                console.log("The resp",response)
                console.log("Chat data is ",chatMessageData )
                playNotificationSound()
            } catch (error) {
                console.error("Error fetching chat response:", error);
                dispatch(setChatData({ type: "bot", content: "Sorry, I couldn't process your request." }));
            }
            setUserInput("");  
        };
    //  const changeHandler = (e)=>{
    //      e.preventDefault();
    //      setDataMessage((prev)=>(
    //         {
    //              ...prev ,
    //              [e.target.name] : e.target.value
    //         }
    //      ))
    //  }

  return (
    <div className=' w-full h-[48px] flex border-t-[1px] border-richblack-700   justify-between   items-center relative px-4 py-2'>
          {/* Emozy */}
          <div className=' flex justify-center items-center gap-x-2 '>
                <div>
                    <BsEmojiSmile  onClick={()=>{setIsShowEmozy((prev)=> !prev)}} className=' cursor-pointer text-richblack-50  hover:text-richblack-300 duration-200 text-lg '/>
                </div>
                <div className=' px-1'>
                        <input 
                            type='text'
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e)=> e.key === "Enter" && handleSendMessage() }
                            placeholder='Write Message here...'
                            className='  placeholder:text-richblack-500 placeholder:text-sm bg-transparent outline-none  text-richblack-100 text-sm'
                            />
                </div>
          </div>

          <div className=' flex justify-end '>
                <IoMdSend    onClick={handleSendMessage} title='Send' className=' text-xl hover:text-richblack-500 transition-all duration-200 text-richblack-200 cursor-pointer' />
          </div>
 
    </div>
  )
}

 