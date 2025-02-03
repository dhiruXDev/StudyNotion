import toast from "react-hot-toast"
import { RatingAndReviewEndPoint } from "../apis"
import { apiConnector } from "../apiConnector";

const {
    CREATE_RATING_API,
    GET_ALL_RATING_AND_REVIEW_API,
    GET_AVG_RATING_API
}= RatingAndReviewEndPoint
export const createRatingAndReviews = async(bodydata , token)=>{
       // console.log( "Inside rating" ,bodydata)
        const toastId = toast.loading("Loading...");
        
        try {
              const response = await apiConnector("POST",CREATE_RATING_API,bodydata , {
                                            Authorization : `Bearer ${token}`
              });
               
              if(!response.data.success){
                throw new Error(response.message);
              }
              console.log( "REspONSE of Creatig rating and review ",response);
              toast.success("Rating and Review Added ");

        } catch (error) {
             console.log("ERROR DURING CREATING RATING AND REVIEW ", error);
             toast.error(error.message)
        }
        toast.dismiss(toastId);
}

// GET AVG RATING
//    GET_ALL_RATING_AND_REVIEW_API  ---> Hum Review slider me hi call ke lenge 
