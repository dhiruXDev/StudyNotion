const Course = require("../models/Course");
const mongoose = require("mongoose")
const User = require("../models/User");
const Category = require("../models/Catagory");
const Section = require('../models/Section');
const SubSection = require('../models/SubSection')
const uploadImgToCloudinary = require("../utils/imageUploader")
// Crreate course handler
exports.createCourses = async (req, res) => {
  try {
    /// Fetcching datas 
    let { courseName, courseDescription, whatYouWillLearn, price, tag, category, status, Instructions, createdAt } = req.body;
    // fetching thumbnail 
    const thumbnail = req.files.thumbnail;
    if (!status || status === undefined) {
      status = "Draft";
    }

    // Validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category || !createdAt) {
      return res.status(404).json({
        success: false,
        message: "all fields are required"
      })
    }
    //checck for Instructor (niddleware for isInstruction)
    const userId = req.user.id;   // Why user.id because the id of User is stored in Payload of JWT TOken
    const InstructorDetails = await User.findById(userId);
    // console.log("Instructor details: " , InstructorDetails);
    /// Validation of Instructor
    if (!InstructorDetails) {
      return res.status(404).json({
        success: false,
        message: " Instructor details not found"
      })
    }

    // Tags validation
    //  const categoryDetails = await Category.findById(category);    // Here tag is fetch from re.body is containing the objectId / Id , Bq course Schema is conained teh reference of Tag , not actual tags

    let categoryDetails;
    if (mongoose.Types.ObjectId.isValid(category)) {
      // If category is a valid ObjectId, find by Id
      categoryDetails = await Category.findById(category);

    } else {
      // If category is not a valid ObjectId, find by name
      categoryDetails = await Category.findOne({ name: category });

    }
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: " categoryDetails details not found"
      })
    }
    // console.log( "Category details ." , categoryDetails)
    // Upload thumbnail on cloudinary
    const thumbnailImg = await uploadImgToCloudinary(thumbnail, process.env.FOLDER_NAME);
    console.log("Response of Thumbnail upload : ", thumbnailImg);
    // Create a entry for new courses
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      thumbnail: thumbnailImg.secure_url,
      instructor: InstructorDetails._id,
      category: categoryDetails._id,
      tag: tag.split(','),
      status: status,
      whatYouWillLearn,
      createdAt: createdAt,
      Instructions: Instructions.split(','),
      //studentEnrollment ////////////////esko hatao bq abhi dale hai
      //courseProgress --> completed Lec ka details rkh raha hai , so isko add kro
      courseProgresses : []   // dekho khi error to nhi de raha hai
    });
    //add a new Course into User schema of Instructor
    await User.findByIdAndUpdate(
      { _id: InstructorDetails._id },// es Search parameter ka use krke Entry find krke lao and (User may be Instructor or Student or Admin)
      {                           // If User , Instructor hoga then uska kuch _id hoga then abhi jo
        $push: {                   // User(instructor) course create krna chahta hai uska already Data store (bq SignUp ho gya hoga) hoga DB me with some _id
          courses: newCourse._id   // then usi _id ko find out kro and uske crossponding newCourse add kr do , Tbhi TO ,then can know about their pblished course
        }  // Courses array me NewCourse ka id Store kr do
      },
      { new: true }
    )
    // Update Tags schema HWTODO :----   Confusion
    //  await Course.findByIdAndUpdate(
    //                                 categoryDetails._id,
    //                               {
    //                                 $push:{
    //                                    tag:categoryDetails._id
    //                                 }
    //                               } ,{new : true}
    //  )
    await Category.findByIdAndUpdate({ _id: categoryDetails._id },
      {
        $push: {
          course: newCourse._id
        }
      },
      { new: true }
    )
    // Esko extra add kiye hai , yadi dikkat hai to "newCourse" ye bhej do response me..........
    const courseDetails = await Course.findById(newCourse._id).populate("category").exec();
    // returning response
    return res.status(200).json({
      success: true,
      message: "Succesfully created COurse",
      data: courseDetails
    })
  } catch (error) {
    console.error(error)
    console.log("error while creating  courses :  ", error.message);
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

// Edit course
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        error: "Course not Found"
      })
    }
    if (req.files) {  // If thumbnail is updating
      const thumbnail = req.files.thumbnail;
      const imageUploadResponse = await uploadImgToCloudinary(thumbnail, process.env.FOLDER_NAME);
      course.thumbnail = imageUploadResponse.secure_url;
    }
    //Updates only those fields that are present in Req body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === 'tag' || key === 'Instructions') {
          course[key] = updates[key].split(',');
        } else if(key === 'status' ) {
         // console.log(course[key] ,  JSON.stringify(updates[key]));
          //console.log(course[key] , JSON.parse(updates[key]) );
          course[key] =   updates[key] 
        }else{
          course[key] = updates[key].split(',');
        }
      }
    }
    await course.save();
    const updatedCourse = await Course.findOne({ _id: courseId }).
      populate({
        path: "instructor",
        populate: ({
          path: "additionalDetails"
        })
      }).
      populate({
        path: "courseContent",
        populate: ({
          path: "subSection"
        })
      }).
      populate("ratingAndReviews")
      .populate("category")
      .exec();
    //console.log(updatedCourse)   
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course Updated Sucesfully"
    })

  } catch (error) {
    console.log("Usseue occur during updates the course .. > ", error)
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("corse - ", courseId)
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "Something Went wrong ,COurseID missing"
      })
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Course not found"
      })
    }

    //Enrolled student from Course
    const studentEnrolled = course.studentEnrollment;
    if (studentEnrolled) {   ///here may be problem , ek bar if hatakr ke dekho
      for (const studentId of studentEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: {
            courses: courseId
          }
        })
      }
    }

    // Deleting Section and subsection
    const CourseSection = course.courseContent;

    if (CourseSection) {
      for (const sectionId of CourseSection) {
        //Deleting sub-section
        const section = await Section.findById(sectionId);
        if (section) {
          for (const subSectionId of section.subSection) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
        //Deleting section
        if (section) {
          await Section.findByIdAndDelete(section);
        }
      }

    }
    //Deleting the course
    await Course.findByIdAndDelete(courseId);
    return res.status(200).json({
      success: true,
      message: "Course succesfully Deleted"
    })

  } catch (error) {
    console.log("Error occur during Deletting the Course .. ", error.message);
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

// Get all course handler
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}, {
      courseName: true,
      whatYouWillLearn: true,
      instructor: true,
      ratingAndReviews: true,
      price: true,
      thumbnail: true,
      studentEnrollment: true
    }).populate("instructor").exec();
    res.status(200).json({
      success: true,
      message: "All courses fetched succesfully ",
      allCourses
    })
  } catch (error) {
    console.error(error)
    console.log("error while fetching All courses :  ", error);
    res.status(404).josn({
      success: false,
      message: error.message
    })
  }
}

// Get course Details 
exports.getCourseDetails = async (req, res) => {
  try {  // Get course Id
    // Get  method have no body , so when you will use "GET" method then , there should not be any sending any value , nhi to vo value req.body me ayega hi nhi . so you can change the Mehod if you want to send anything like courseId etc.
    //const  {courseId :{courseId}} = req.body;   //In backend i send {courseId : courseId} ,   {courseId} or courseId  --> both are method to extract the courseId from req body , but  first menas destructuring  and 2nd means req body is loaded with only courseId , there is not another value on req body.
    const  {courseId} = req.body;
   // console.log("courseId is :", courseId);
    const CourseDetails = await Course.findById({ _id: courseId })
      .populate(
        {
          path: "instructor",
          populate: ({
            path: "additionalDetails"  
          }
          )
        } 
      )
      .populate("category")
      //   .populate("ratingAndReviews")
     // .populate("courseProgresses")    // isko dekho phle se nhi tha , error aa rhaah hai to hta skte hoa
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        }
      }
      ).exec();
    // Validate the details
    if (!CourseDetails) {
      return res.status(400).json({
        success: false,
        message: `Couldn't find the course of courseId ${courseId}`
      })
    }
   // console.log( "COurse --- > ",CourseDetails);
    return res.status(200).json({
      success: true,
      message: `All details fetched succesfully of courseID  ${courseId}`,
      data: CourseDetails
    })

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Get a list of course of a instructor
exports.getInstructionCourses = async (req, res) => {
  try {
    // Get instructor ID from authenticated user or req body
    const instructorId = req.user.id;
    const instructorCourse = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 }).populate( {
                                                                                       path : "courseContent",
                                                                                       populate: {
                                                                                        path : "subSection"
                                                                                       }
                                                                                            }).exec();
                                                   
    //sectionName
    return res.status(200).json({
      success: true,
      data: instructorCourse,
      message: "all Courses succesfully fetched"
    })


  } catch (error) {
    console.error(error)
    console.log("error while fetching Instructor Course :  ", error);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

// populate({
//   path : "courseContent"                                                                                populate :({
//       path: "Section"
//       ,populate : {
//          path :"subSection"
//       }
//   })
// }).exec();