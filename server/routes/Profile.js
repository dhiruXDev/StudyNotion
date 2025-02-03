const express= require("express");
const router = express.Router();
 
//Import the required controllers and  middleware functions
    const{  updateProfile 
            ,deleteAccount
            ,getAllUserDetails 
            ,updateDisplayPicture 
            ,getEnrolledCourses,
            getInstructorDashBoard
        } = require("../controllers/Profile");
const{authN } = require("../middleware/auth");

// Api routes handler
router.put("/update-profile" ,authN,  updateProfile);
router.delete("/deleteAccount" , authN , deleteAccount);
router.get("/get-allUserDetails" ,authN, getAllUserDetails);
router.put("/update-profile-image" ,authN, updateDisplayPicture);
router.get("/all-Enrolled-course" ,authN, getEnrolledCourses);
router.get("/instructor",authN,getInstructorDashBoard);
module.exports =router;