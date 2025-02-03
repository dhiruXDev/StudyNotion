import toast from "react-hot-toast";
import {enrolledCoursesEndpoints} from "../../"
import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";
import { Instructor_Details } from "../../Components/core/Dashboard/Instructor-Course-Details/Instructor_Details";
import { useNavigate } from "react-router-dom";

 const {
    GET_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_COURSE_WITH_STATUS_API
 } = profileEndpoints

export const enrolledCourses =  async(token)=>{
          let result =[];
         // const toastId= toast.loading("Loading...");
          try {
              const response= await apiConnector("GET",GET_ENROLLED_COURSES_API,null, {
                 Authorization : `Bearer ${token}`
              })
             console.log("RESPONSE OF FETcHING COURSE DETAILS .. " , response)
              if (!response.data.success) {
                   throw new Error(response.data.message);
              }
              result = response?.data?.data;
          } catch (error) {
            console.log("ERROR DURING FETCHIN GTHE COURSE DETAILS ..",error);
            if(error.response.data.message === "Token not Found"){
                     
                      toast('Please LogIn again!', {
                        icon: '🙎‍♂️',
                      });
                      return result = "Login-karo"
                      
              }else{
                 toast.error(error.response.data.message);
              }
          }
        //  toast.dismiss(toastId);
          return result;
}
export const getInstructorDetailsWithStats = async(token)=>{
          // const toastId = toast.loading("Loading...");
          let result =[];
          try {
            const response = await apiConnector("GET",GET_INSTRUCTOR_COURSE_WITH_STATUS_API ,null, {
                 Authorization : `Bearer ${token}`
            })
            //console.log( "resonse ", response);
            // if(!response.success){
            //     throw new Error(response.message);
            // }
            result = response.data.data ;
            
          } catch (error) {
            console.log( "ERROR DURING FETCHING INSTRUCTOR DETAILS WITH STATS -- ",error);
            console.error(error.message);
            toast.error("Something went wrong");
          }
          // toast.dismiss(toastId);
          return result;
}
