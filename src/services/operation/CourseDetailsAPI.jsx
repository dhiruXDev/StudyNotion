import toast from "react-hot-toast";
import {enrolledCoursesEndpoints} from "../../"
import { CoursesEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";
import { TbBroadcast, TbHorse } from "react-icons/tb";
import { setLoading } from "../../slices/authSlices";

 const {
     GET_ALL_COURSE_API,
     GET_COURSE_DETAILS_API,
     UPDATE_COURSE_API,
     ADD_COURSES_API,
     DELETE_COURSE_API,
     FETCH_INSTRUCTOR_ALL_COURSE_API,
     UPDATE_SECTION_API,
     CREATE_SECTION_API,
     DELETE_SECTION_API,

     UPDATE_SEBSECTION_API,
     CREATE_SUBSECTION_API,
     DELETE_SUBSECTION_API,
     
     LECTURE_COMPLETE_API ,
     LECTURE_COMPLETE_DATA_FETCH_API,
 } =CoursesEndpoints ;
 

 //edit the course details
export const updateCourse = async(data,token)=>{
         const toastId = toast.loading("Loading...");
         let result = null;
         try { console.log("Before calling the Backend for updating course")
               const response = await apiConnector("POST" , UPDATE_COURSE_API , data , {
                           "Content-Type": "multipart/form-data",
                             Authorization: `Bearer ${token}`
               })
               console.log("AFTER calling Backend and RESPONSE OF UPDATING COURSE in CourseAPI ...", response);
               if (!response.data.success) {
                      throw new Error(response.data.message)
               }
               toast.success("Cpurse Details Updated Succesfully");
               result =response?.data?.data;
               
         } catch (error) {
              console.log("Updating couseDetails Failed", error);
              toast.error(error.message)
         }
         toast.dismiss(toastId);
         return result
}


/// Add new course
export const addCourse = async(data,token)=>{
           const toastId = toast.loading("Loading...");
           let result =null; 
           try {console.log("Before calling the Backend for adding new course and data is  " , data) 
                 const response = await apiConnector("POST" , ADD_COURSES_API,data ,{
                                     Authorization : `Bearer ${token}`,
                                     "Content-type" : "multipart/form-data"
                 }) ;
                 console.log(" after adding new course in DB")
                 console.log("Response of creating ne course.. ",response)
                 if (!response.data.success) {
                        throw new Error(response.data.message)
                 }
                 result =  response?.data?.data
                 toast.success("Course is created succesfully");
                
           } catch (error) {
             console.log("ERROR DURING ADDING NEW COURSE ." , error);
             console.log(error.message);
             toast.error(error.message);
           }
           toast.dismiss(toastId)
           return  result 
}

// Delete course
export const deleteCourse = async(courseId , token)=>{
            const toastId = toast.loading("Loading...");
            try {
                  const response = await apiConnector("DELETE" ,DELETE_COURSE_API,courseId ,{
                                                 Authorization: `Bearer ${token}`
                  } )
                  if (!response?.data?.success) {
                         throw new Error(response.data.message)
                  }
                  toast.success("Course is succesfully Deleted");
   
            } catch (error) {
                console.log( "Error during Deleting the course .. ",error.message);
                toast.error(error.message);
            }
            toast.dismiss(toastId);       
}  

// Get course details crossponding their courseId
export const getCourseDetails = async (courseId ,token)=>{
        console.log( "courseId " ,courseId);
        
        let result;
        try {
               const response = await apiConnector("POST" , GET_COURSE_DETAILS_API ,{courseId},{
                                         Authorization : `Bearer ${token}`
               })
            console.log( "API RESPONSE OF FETCHINF ALL DATA OF SINGLE COURSE -- ",response);

               if (!response?.data.success) {
                      throw new Error(response?.data.message)
               }
               result = response?.data?.data;

        } catch (error) {
               console.log( "Error during fetching COurseDetails --- ",error.message);
               console.log( error)
               toast.error("Cann't fetch Course details")   
        }
     
     return result;
}
export const updateSection = async( data , token)=>{
           const toastId = toast.loading("Loading...");
           let result;
           try {
            const response = await apiConnector("POST" , UPDATE_SECTION_API , data , {
                            Authorization : `Bearer${token}`
            }  )

            console.log("RESPONSE OF UPDATING SECTION ...",response);
            if (!response.data.success) {
                   throw new Error(response.data.message)
            }
            toast.success("Succesfully updated Section");
            result = response?.data?.data;
           } catch (error) {
                 toast.error(error.message);
                 console.log( "something went wrong duting updating Section" ,error);
           }
           toast.dismiss(toastId);
           return result;
}

export const createSection = async(data ,token)=>{
        const toastId = toast.loading("Lodaing...");
        let result;
         try {
                const response = await  apiConnector("POST" ,CREATE_SECTION_API ,data,{ 
                                 Authorization : `Bearer${token}`

                });
                console.log( "API RESPONSE OF CREATING SECTION..." ,response);
                 if (!response.data.success) {
                          throw new Error(response.data.message)
                 }
                   toast.success("Section is created succesfully");
                   result =response?.data?.data;
         } catch (error) {
             console.log( "something went wrong duting creating Section" ,error);
             toast.error(error.message)
         }
         toast.dismiss(toastId);
         return result;
}

export const deleteSection = async(data,token)=>{
       const toastId = toast.loading("Loading...");
       let result ;
       try {
                const response = await apiConnector("DELETE" , DELETE_SECTION_API , data , {
                                   Authorization : `Bearer${token}`
                })
                 console.log( "API RESPONSE OF DELETING SECTION .... " ,response)
                 if (!response?.data.success) {
                         throw new Error(response?.data.message)
                 }
                 result = response?.data?.data;
                 toast.success("Succesfully Section is Deleted");

       } catch (error) {
              console.log( "Something went wrong..",error);
              toast.error(error.message)
       }
       toast.dismiss(toastId)
       return result

}


export const deleteSubsection = async(data,token)=>{
           const toastId =toast.loading("Loading...");
           let result;
           try {
                    const response= await apiConnector("DELETE" , DELETE_SUBSECTION_API ,data,{
                                        Authorization : `Bearer ${token}`
                    })
                    console.log( "API RESPONSE OF DELETING SUBSECTION .... " ,response)
                    if (!response?.data.success) {
                            throw new Error(response?.data.message)
                    }
                    result = response?.data?.data;
                    toast.success("Succesfully SubSection is Deleted");
   

           } catch (error) {
              console.log( "Something went wrong..",error);
              toast.error(error.message)
       }
       toast.dismiss(toastId)
       return result;
}
export const updateSubsection = async(data ,token)=>{
       const toastId =toast.loading("Loading...");
       let result;
      console.log( "in updateSubSection in API")
       try {
              console.log("FormData content in CourseDetailsAPI :");
              for (let pair of data.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
              }
                const response= await apiConnector("POST" , UPDATE_SEBSECTION_API ,data,{
                                    Authorization : `Bearer ${token}`
                })   
                
                console.log( "API RESPONSE OF UPDATING SUBSECTION .... " ,response)
                if (!response?.data.success) {
                        throw new Error(response?.data.message)
                }
                result = response?.data?.data;
                console.log( "result is  >> ", result);
                toast.success("Succesfully SubSection is Updated");


       } catch (error) {
          console.log( "Something went wrong..",error);
          toast.error(error.message)
   }
   toast.dismiss(toastId)
   return result;  
}

// CREATE SUBSECTION ..................
export const createSubsection = async(data,token)=>{
       const toastId =toast.loading("Loading...");
       let result;
       try {
              console.log("FormData content in CourseDetailsAPI IN CREATESUBSSECTION :");
              for (let pair of data.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
              }

                const response= await apiConnector("POST" , CREATE_SUBSECTION_API ,data,{
                                    Authorization : `Bearer ${token}`
                })
                console.log( "API RESPONSE OF CREATING SUBSECTION .... " ,response)
                if (!response?.data.success) {
                        throw new Error(response?.data.message)
                }
                result = response?.data?.data;
                toast.success("Succesfully SubSection is Added");


       } catch (error) {
          console.log( "Something went wrong..",error);
          toast.error(error.message)
   }
   toast.dismiss(toastId)
   return result;
}

// fetching all courses under a specific instructor
export  const fetchInstructorAllCourse = async(token)=>{
   //  const toastId =toast.loading("Loading...");
     let res= [];
     try {
           const response = await apiConnector("GET",FETCH_INSTRUCTOR_ALL_COURSE_API,null,{
                                                   Authorization: `Bearer ${token}`
           })     
           console.log( response)
           if(!response?.data?.success){
                    throw new Error(response?.data?.message)
           }   
           res = response?.data?.data;
          // toast.success("Fetched All Courses");    

     } catch (error) {
       console.log( "Something went wrong..",error);
       toast.error(error.message)
     }
     setLoading(false);
    
     return res;    
}

export const markLectureAsComplete = async (data ,token)=>{
          let result = null;
          const toastId =toast.loading("Loading...");
          //console.log( "Mark as complete lecture data -- ", data);
          try {
              const response = await  apiConnector("POST" ,LECTURE_COMPLETE_API ,data,{
                     Authorization : `Bearer ${token}`
              });
              console.log( "Respone of Lecture mark as complete -- ",response);

              if (!response.data.success) {
                     console.log("Respo ", response.data.message )
                     throw new Error(response.data.message);  
              }
              toast.success("Lecture Completed");
              result = response?.data;
              
          } catch (error) {
               console.log( "ERROR WHILE MARKING LECTURE AS COMPLETED ", error);
               console.log( "ERROR WHILE MARKING LECTURE AS COMPLETED ", error.message);
               if (error.response.data.message == "Lecture is already completed"){ 
                     toast.success("Lecture is already completed");  
               }else{
                       toast.error(error.message); 
               }
            
               result = false;
          }
          toast.dismiss(toastId);
          return result;
}

export const fetchCompletedLecturesAPI =  async( data , token )=>{
       let result = null;
        
       try {

           const response = await  apiConnector("POST" ,LECTURE_COMPLETE_DATA_FETCH_API ,data,{
                  Authorization : `Bearer ${token}`
           });
           
           console.log( "Respone of Lecture get marked  as complete -- ",response);
           if (!response.data.success) {
                  throw new Error(response.data.message);
           }
     
           result = response?.data;
           
       } catch (error) {
            console.log( "ERROR WHILE getting MARKKED LECTURE AS COMPLETED ", error);
            toast.error(error.message);
            result = false;
       }
        
       return result;
} 

 // Add course Details

// export const enrolledCourses =  async(token)=>{
//           let result =[];
//           const toastId= toast.loading("Loading...");

//           try {
//               const response= await apiConnector("GET",GET_ENROLLED_COURSES_API, {
//                 Authorization : `Bearer ${token}`
//               })
//              console.log("RESPONSE OF FETcHING COURSE DETAILS .. " , response)
//               if (!response.data.success) {
//                    throw new Error(response.data.message);
//               }
//             //   toast.success("Succsfully fetched data of course ");
//               result = response?.data?.data;
             
             

//           } catch (error) {
//             console.log("ERROR DURING FETCHIN GTHE COURSE DETAILS ..",error);
//             toast.error(error.message)
//           }
//           toast.dismiss(toastId);
//           return result;
// }
