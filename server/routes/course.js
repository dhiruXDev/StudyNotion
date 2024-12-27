const express =require("express");
const router = express.Router();

// importing the Controllers
const {createCourses,editCourse ,deleteCourse ,showAllCourses  ,getCourseDetails,getInstructionCourses } =require("../controllers/Courses");
const{ createCategory, showAllCategory ,catagoryWisePageDetails} = require("../controllers/Category");
const {createSection,updateSetion, deleteSection} = require("../controllers/Sections");
const{createSubSection,updateSubSection,deleteSubSection} =require("../controllers/SubSection");
const{createRatingAndReviews ,getAvgRating ,getAllRatingAndReviews} = require("../controllers/RatingAndReviews");
const{updateCourseProgress ,fetchCompletedLectures} =require("../controllers/updateCourseProgress")
const{authN , isAdmin , isStudent , isInstructor} = require("../middleware/auth");
const { get } = require("mongoose");
                            
//*************************************************************************************
//                  Course Routes
//*************************************************************************************
router.post("/showAll-Courses" , showAllCourses);    ////Get all Registered Courses
router.post("/getCourseDetails" , getCourseDetails);  // //Get Details for a Specific Courses

// Write down for edit courses

router.post("/addCourses" ,authN,isInstructor, createCourses);
router.post("/updateCourse" , authN,isInstructor,editCourse);
router.delete("/deleteCourse",authN ,isInstructor,deleteCourse);
router.post("/addSection" ,authN , isInstructor, createSection);
router.post("/updateSetion" , authN ,isInstructor , updateSetion);
router.delete("/deleteSection" , authN ,isInstructor , deleteSection);

router.post("/addSubSection" ,authN , isInstructor, createSubSection);
router.post("/updateSubSetion" , authN ,isInstructor , updateSubSection);
router.delete("/deleteSubSection" , authN ,isInstructor , deleteSubSection);

router.get("/getInstructor-allCourse", authN,isInstructor, getInstructionCourses);

//********************* COurseProgress  *******************************
router.post("/updateCourseProgress",authN,isStudent,updateCourseProgress);
router.post("/fetchCompletedLectures",authN,isStudent,fetchCompletedLectures);

//***********************************************************************
//              Category Routes (Only By Admin)
//***********************************************************************
router.post("/addCategory" ,authN,isAdmin,createCategory);
router.get("/showAllCategory" ,showAllCategory);
router.post("/getCategoryPageDetails" , catagoryWisePageDetails);


//*****************************************************************************
//              Rating And Review
//*****************************************************************************
router.post("/createRating"  , authN ,isStudent,createRatingAndReviews);
router.get("/getAvgRating" ,getAvgRating);
router.get("/getAllReviews" , getAllRatingAndReviews )

module.exports = router ;

