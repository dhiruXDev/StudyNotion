 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setChatData } from "../../slices/chatSlices";
import { apiConnector } from "../../services/apiConnector";
import { chatCommunicating } from "../../services/operation/chatFeatureApi";
import logo from "../../assets/image/profileimg.jpg"
import notificationSoundPath  from "../Chat/notificationtune.mp3"
import { FormatDate } from "../../utils/FormatDate";
export const ChatContainer = () => {
            const { chatMessageData ,chatNotification} = useSelector((state) => state.chat);
            const dispatch = useDispatch();
            const [userInput, setUserInput] = useState("");
            const PlayTune = new Audio(notificationSoundPath)
           
            const handleDefaultSentMessage = async()=>{ 
                setUserInput("Default_Question");  
                console.log("User input ", userInput)
                try {
                    const response = await chatCommunicating({userInput}) ;
                    dispatch(setChatData({ type: "bot", content: response }));
                } catch (error) {
                    console.error("Error fetching chat response:", error);
                    dispatch(setChatData({ type: "bot", content: "Sorry, I couldn't process your request." }));
                }
             }
            const handleSendMessage = async (e) => {
                setUserInput(e.target.innerText);
                if (!userInput.trim()) return;   // means where there is not input 

                if (chatNotification ) {
                    PlayTune.play();
                }

                // Add user's message to Redux state
                dispatch(setChatData({ type: "user", content: userInput}));
                try {
                    // Make API request to get bot response
                     const response = await chatCommunicating({userInput}) ;
                    // Add bot's response to Redux state
                    dispatch(setChatData({ type: "bot", content: response }));
                    if (chatNotification ) {
                        PlayTune.play();
                    }
                } catch (error) {
                    console.error("Error fetching chat response:", error);
                    dispatch(setChatData({ type: "bot", content: "Sorry, I couldn't process your request." }));
                }
                setUserInput("");  
            };
          console.log("Message data",chatMessageData);
    useEffect(()=>{
        console.log("inside vala  data",chatMessageData);
    },[chatMessageData])      
    return (
        <div className="w-full h-[342px] text-richblack-100 flex flex-col ">
            <div className=" overflow-auto custom-scrollbar mt-3 px-2 h-full ">
                {
                        chatMessageData.length == 0 ? 
                          (
                            <div className=' w-full h-full text-richblack-100 gap-y-2 flex items-center justify-center flex-col     '>
                                    <img src={logo} height={80} width={80} className=' aspect-square rounded-full border-b-4  border-richblack-200' />
                                    <p>👋 Hi there! I am Dhiraj </p>
                                    <p className=' text-richblack-300 text-sm'>How can I help you ! </p>
                            </div>
                          ) 
                        :
                        (   <>{
                                chatMessageData.length >= 2 &&  
                                <div className=" flex flex-col  w-full "> 
                                        <div className=" flex items-center gap-x-1 text-richblack-600 text-[8px] ">
                                            <div className=" w-[99px] h-[1.5px] bg-richblack-600 "></div>
                                            <span className=" !text-[8px]">{FormatDate(Date.now()).split("|")[0]}</span>
                                            <div className=" w-[90px] h-[1.5px] bg-richblack-600"></div>
                                        </div>
                                        <div className=" flex items-center justify-center  mt-3">
                                            <span className=" text-richblack-500 text-base ">Chat Started</span>
                                        </div>
                               </div>
                             }
 
                                       {
                                                chatMessageData?.map((message, index) => (
                                                    <div key={index} className={`p-2  mb-1 max-w-max  ${message.type === "user"? "ml-auto bg-blue-500 text-white rounded-b-lg rounded-tl-lg ": "mr-auto bg-gray-200"   }`}    >    
                                                            {
                                                                message.type == "user" ? ( <p className="text-xs">{message.content}</p> ) : 
                                                                ( 
                                                                            message?.content?.map((item)=>{
                                                                                return(
                                                                                    <div className=" flex gap-x-2"> 
                                                                                         <div className=" h-[25px] w-[25px] relative">
                                                                                               <img src={logo}   className=' aspect-square rounded-full   object-cover h-full w-full  ' />
                                                                                        </div>
                                                                                        <div className=" flex flex-col  w-[290px]  gap-y-2"> 
                                                                                                <h1  className=" text-sm  text-richblack-25">{item.heading}</h1>
                                                                                                <div className="flex  flex-wrap gap-2 ">
                                                                                                        {  
                                                                                                            item?.text?.map((option)=>{
                                                                                                                return(
                                                                                                                    <span
                                                                                                                    onClick={(e) => {
                                                                                                                      if (option?.split("&")[1] === "") {
                                                                                                                        e.preventDefault(); // Prevent navigation only if the link is empty
                                                                                                                        handleSendMessage(e);
                                                                                                                      }
                                                                                                                    }}
                                                                                                                    className={`border-[1.5px] border-richblack-700 ${
                                                                                                                      option?.split("&")[1] === "" && "hover:bg-caribbeangreen-500 hover:border-caribbeangreen-500 hover:text-richblack-900"
                                                                                                                    } text-richblack-500 duration-200 py-0.5 px-2 rounded-sm`}
                                                                                                                  >
                                                                                                                    <span
                                                                                                                      className={`text-xs ${option?.split("&")[1] === "" && "cursor-pointer"}`}
                                                                                                                    >
                                                                                                                      {option?.split("&")[0]}
                                                                                                                    </span>
                                                                                                                    {option?.split("&")[1] && (
                                                                                                                      <a
                                                                                                                        href={option?.split("&")[1]}
                                                                                                                        target="_blank"
                                                                                                                        rel="noopener noreferrer"
                                                                                                                        className="!text-[10px] text-blue-200 underline"
                                                                                                                        onClick={(e) => {
                                                                                                                          handleDefaultSentMessage(); // Remove e.preventDefault() here
                                                                                                                        }}
                                                                                                                      >
                                                                                                                        {option?.split("&")[1]}
                                                                                                                      </a>
                                                                                                                    )}
                                                                                                                  </span>
                                                                                                                  

                                                                                                                )
                                                                                                            })
                                                                                                        
                                                                                                        }
                                                                                                </div>  
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        
                                                                    )
                                                            }
                                                    
                                                    </div>
                                                ))
                                        }
                                     
                              

                            </>
                        )
                }

            </div>
        </div>
    );
};
 //