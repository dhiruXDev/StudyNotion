import React from 'react'
import toast from 'react-hot-toast'
import { setLoading, setToken } from '../../slices/authSlices';
import { setUser } from "../../slices/profileSlices"
//import {resetCart} from "../../slices/cartSlices"

import { apiConnector } from "../apiConnector"
import { endPoints } from '../apis';

const {
    LOGIN_API ,
    SIGNUP_API,
    SENDOTP_API,
    RESET_PASSWORD_TOKEN_API,
    RESET_PASSWORD_API
} = endPoints


export function sendOTP(email ,navigate){
      return async(dispatch)=>{
        // const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
               const response = await apiConnector("POST" , SENDOTP_API,{
                        email,  
                        checkuserPresent: true,
               })
               console.log("SENDOTP API RESPONSE.........." , response);
               console.log(response.data.success);
               if (!response.data.success) {
                   throw new Error(response.data.message)
               }
               toast.success("OTP sent succesfully");
               navigate("/verify-email");
        } catch (error) {
            console.log("SEND OTP API ERROR...." , error);
            console.log(error.message);
           // toast.error("Could not Sent OTP")
            toast.error(error.message);
        }
        dispatch(setLoading(false));
        // toast.dismiss(toastId);
      }
}
 
export function signUp(email,firstName,lastName,password,confirmPassword,accountType,otp,navigate){
              return async(dispatch)=>{
                //   const toastId = toast.loading("Loading...");
                  dispatch(setLoading(true));
                  try {  
                         const response = await apiConnector("POST" , SIGNUP_API,{
                            email,firstName,lastName,password,confirmPassword,accountType,otp 
                         });
                         console.log("SIGNUP API RESPONSE..." , response);
                         console.log("sihnUp success response ",response.data.success);
                         if (!response.data.success) {
                            throw new Error(response.data.message)
                         }
                         toast.success("SignUp succesfully");
                         console.log( typeof navigate);
                         if(navigate){
                            navigate("/logIn"); 
                         }
                         else{
                            console.log("something went wrong during navigating...");
                         }
                         
                  } catch (error) {
                      console.log("SIGNUP API ERROR..." , error);
                      console.log( "signUp error message -> ",error.message);
                      toast.error("SignUp failed");
                      navigate("/signUp");
                  }
                  dispatch(setLoading(false))
                //   toast.dismiss(toastId)
              }
}

export function login(email,password,navigate){
          return async (dispatch)=>{
                    //  const toastId = toast.loading("Loading...." )
                     dispatch(setLoading(true));
                     try {
                        const response = await apiConnector("POST" , LOGIN_API, {
                            email,password
                        })
                        console.log("LogIn Response.." , response);
                        if (!response.data.success) {
                               throw new Error(response.data.message);
                        }
                        toast.success("Login Successfull")
                        dispatch(setToken(response.data.token));
                        const userImage = response.data?.data?.image ?
                                             response.data.data.image : 
                                             `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
 
                         dispatch(setUser({...response.data.data , image : userImage})); 
                         localStorage.setItem("token" , JSON.stringify(response.data.token)); 
                         localStorage.setItem("user" , JSON.stringify(response.data.data)); 
                         navigate("/dashboard/my-profile");

                     } catch (error) {
                         console.log("LOGIN API ERROR..............", error);
                         console.log(error.message);
                         toast.error(error.response.data.message)
                        }
                    //      ,{
                    //         duration: 4000,
                    //         position: 'top-center',
                          
                    //         // Styling
                    //         style: {
                    //             padding: "0.6rem", // Adjusted padding
                    //              // Example of setting a background color
                    //             color: 'black', // Text color
                    //             display: 'flex',
                    //             alignItems: 'center',
                    //             font : '600'
                    //           },
                    //         className: '',
                          
                    //         icon: '❌', 
                          
                    //         // Change colors of success/error/loading icon
                    //         iconTheme: {
                    //           primary:  '',
                    //           secondary: ' ',
                    //         },
                          
                    //         // Aria
                    //         ariaProps: {
                    //           role: 'status',
                    //           'aria-live': 'polite',
                    //         }}
                    //  }
                     dispatch(setLoading(false));
                    //  toast.dismiss(toastId);
          }
}
 export function logOut(navigate){
    return async (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
       // dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/");
    }
 }

export function getPasswordResetToken( email , setEmailSent){
     return async (dispatch)=>{
        //  const toastId = toast.loading("Loading...");
         dispatch(setLoading(true));
         try {
            const response = await apiConnector("POST" ,RESET_PASSWORD_TOKEN_API,{email } );
            console.log("RESET PASSWORD TOKEN RESPONSE..." , response);
            if (!response.data.success) {
                 throw  new Error(response.data.message)
            }
            // toast.dismiss(toastId);
            toast.success("Reset email sent");
            setEmailSent(true);

         } catch (error) {
            toast.error("Failed to sent the email for reseting the password");
            console.log("REST PASSWORD TOKEN ERROR " ,error);
         }
         dispatch(setLoading(false));
        //  toast.dismiss(toastId);
     }  
}
export  function resetPassword(password ,confirmPassword,token ,navigate){
       return async(dispatch)=>{
           dispatch(setLoading(true));
           try {
                    const response = await apiConnector("POST" , RESET_PASSWORD_API ,
                                                              {password,confirmPassword ,token})
                    if (!response.data.success) {
                          throw new Error(response.data.message)
                    }                                          
                    toast.success("Password has been reset succesfully");
                    console.log("RESET PASSWORD SUCCESFULY DONE " , response)
                    navigate("/reset-complition-page");
           } catch (error) {
             console.log("RESET PASSWORD ERROR.. ",error)
             toast.error("Unable to reset password ")
           }
           dispatch(setLoading(false)); 
       }
}

