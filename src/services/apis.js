
const BASE_URL =  process.env.REACT_APP_BASE_URL;

//AUTH Endpoints
export const endPoints = {
    LOGIN_API : `${BASE_URL}/auth/logIn`,
    SIGNUP_API : `${BASE_URL}/auth/signUp`,
    SENDOTP_API : `${BASE_URL}/auth/sendOTP`,
    RESET_PASSWORD_TOKEN_API : `${BASE_URL}/auth/reset-password-token`,
    RESET_PASSWORD_API : `${BASE_URL}/auth/reset-password`,    
}    


//PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile//get-allUserDetails",
    GET_ENROLLED_COURSES_API : `${BASE_URL}/profile/all-Enrolled-course`,
    GET_INSTRUCTOR_COURSE_WITH_STATUS_API : `${BASE_URL}/profile/instructor`,
}

// Setting Endpoints

export const settingEndpoints = {
      UPDATE_PROFILE_API : `${BASE_URL}/profile/update-profile`,  // It included gender  , name,DOB etc
      UPDATE_DISPLAY_PICTURE_API : `${BASE_URL}/profile/update-profile-image`,    // It is responsible for updating profileIMG  
      DELETE_ACCOUNT_API : `${BASE_URL}/profile/deleteAccount`,
      CHANGE_PASSWORD_API : `${BASE_URL}/auth/changePassword`,     
}

// Enrolled Courses endpoints
export const CoursesEndpoints = {
    GET_COURSE_DETAILS_API : `${BASE_URL}/Course/getCourseDetails`,
    GET_ALL_COURSE_API : `${BASE_URL}/Course/showAll-Courses`,
    ADD_COURSES_API : `${BASE_URL}/Course/addCourses`,
    UPDATE_COURSE_API: `${BASE_URL}/Course/updateCourse`,
    DELETE_COURSE_API: `${BASE_URL}/Course/deleteCourse`,
    FETCH_INSTRUCTOR_ALL_COURSE_API: `${BASE_URL}/Course/getInstructor-allCourse`,
    UPDATE_SECTION_API: `${BASE_URL}/Course/updateSetion`,
    CREATE_SECTION_API:  `${BASE_URL}/Course/addSection`,
    DELETE_SECTION_API : `${BASE_URL}/Course/deleteSection`,

    DELETE_SUBSECTION_API : `${BASE_URL}/Course/deleteSubSection`,
    UPDATE_SEBSECTION_API : `${BASE_URL}/Course/updateSubSetion`,
    CREATE_SUBSECTION_API : `${BASE_URL}/Course/addSubSection`, 

    LECTURE_COMPLETE_API :  `${BASE_URL}/Course/updateCourseProgress`, 
    LECTURE_COMPLETE_DATA_FETCH_API :  `${BASE_URL}/Course/fetchCompletedLectures`, 
}

export const catagories  = {
    CATAGORIES_API:`${BASE_URL}/Course/showAllCategory` ,
    CATAGORIESWISE_PAGE_DETAILS_API : `${BASE_URL}/Course/getCategoryPageDetails` ,
    
}

//Payments
export const studentEndpoints = {
     COURSE_PAYMENT_API : `${BASE_URL}/Payments/capturePayments` ,
     PAYMENT_VERIFY_API:   `${BASE_URL}/Payments/verifyPayment`,
     SEND_PAYMENT_SUCCESFULL_EMAIL_API : `${BASE_URL}/Payments/sendPaymentSuccesfullEmail`,
}
//CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// Rating and Review
export const RatingAndReviewEndPoint = {
     CREATE_RATING_API  : BASE_URL + "/Course/createRating",
     GET_AVG_RATING_API : BASE_URL + "/Course/getAvgRating",
     GET_ALL_RATING_AND_REVIEW_API : BASE_URL + "/Course/getAllReviews",
}

// Chat 
export const ChatAndResponseEndpoint = {
       CHAT_CONNETCING_COMMUNICATING_WITH_SERVER : BASE_URL + "/chat/communicating",
}