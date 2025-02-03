import React from 'react'
import { apiConnector } from '../apiConnector'
import { settingEndpoints } from '../apis'
import toast from 'react-hot-toast'
import { setUser } from '../../slices/profileSlices'
 import {logOut} from "../operation/authApi"
const {
    UPDATE_PROFILE_API ,
    UPDATE_DISPLAY_PICTURE_API,
    DELETE_ACCOUNT_API,
    CHANGE_PASSWORD_API

} = settingEndpoints

export function updateProfileImg ( token , ProfileImg){
           return async(dispatch)=>{
                 const toastId = toast.loading("Loading...");
                    try {   
                        console.log("in API .. " , ProfileImg)
                        // For printing the files data
                        for (let [key, value] of ProfileImg.entries()) {
                            console.log(key, value);
                        }
                           const response = await apiConnector("PUT" , UPDATE_DISPLAY_PICTURE_API , ProfileImg , {
                                                                            "Content-Type": "multipart/form-data",
                                                                            Authorization: `Bearer ${token}`,
                                                                        })
              
                           console.log("API uploading response.. " , response); 
                           
                           if (!response.data.message) {
                                 throw new Error (response.data.message)
                           } 
                           toast.success("Succesfully updated Profile image");
                        
                           dispatch(setUser(response.data.data));
                           localStorage.setItem("user" , JSON.stringify(response.data.data));
   
                    } catch (error) {

                        console.log("Error while uploading img ", error.message);
                        toast.error("Image updating failed")
                    }
                    
                    toast.dismiss(toastId);
           }
}
/*
The "Content-Type": "multipart/form-data" header indicates that the request body contains form data, possibly including files, split into multiple parts.
The Authorization: Bearer ${token} header is used to securely pass the user's authentication token to the server, so the server can validate the user's identity and permissions.
*/
export function updateProfile(token,formData){
        return async(dispatch)=>{
             const toastId = toast.loading("Loading...")
             try {
                  const response = await apiConnector("PUT" , UPDATE_PROFILE_API , formData,{  
                                                                                                Authorization:`Bearer ${token}`,
                                                                                             })

                  console.log("response of updating profile ", response);
                  if (!response.data.success) {
                        throw new Error(response.data.message)
                  }
                  toast.success("Succesfully updating the Profile");
                  const userImg = response.data.data.image ? response.data.data.image  :  `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
                 
                  console.log("data .." ,response.data.data);
                  console.log(response.data.data.additionalDetails);
                  
                  const updatedUser = {...response.data.data , image:userImg}

                  localStorage.setItem("user", JSON.stringify(response.data.data));
                  dispatch(setUser({...response.data.data ,image:userImg}));

             } catch (error) {
                console.log(error)
                 console.log("Somwthing went wrong during updating profile data .." ,error.message);
                 toast.error("updating profile faield")
             }
             toast.dismiss(toastId);
        }
}

// UPdate password
export function updatePassword(token,Formdata){
     return async(dispatch)=>{
         const toastId= toast.loading("Loading...");
         try {
             const response = await apiConnector("POST" , CHANGE_PASSWORD_API,Formdata , {
                                                                                            Authorization : `Bearer ${token}`
                                                                                        })
            console.log("Response of updating password . " ,response);
            if (!response.data.success) {
                   throw new Error(response.data.message);
            }
            toast.success("Password succesfully updated");
             
         } catch (error) {
            console.log("error happend during updating Password " , error.message);
            console.log(error);
            toast.error(error.response.data.message);
        
         }
         toast.dismiss(toastId)

     }
}

// Deltete Account
export function deleteAccount (token,navigate){
    return async(dispatch)=>{
           const toastId = toast.loading("Loading...");
           try {
                  const response = await apiConnector("DELETE" , DELETE_ACCOUNT_API , {
                                               Authorization : `Bearer ${token}`
                  })
                  console.log("Response of deleting Account" , response);
                  toast.success("Account succesfully Deleted");
                  dispatch(logOut(navigate));
                  
           } catch (error) {
               console.log("Something went wrong during deleting accoubnt", error.message);
               console.error(error);
               toast.error("Could Not Delete Profile")
           }
           toast.dismiss(toastId)
    }
   
}