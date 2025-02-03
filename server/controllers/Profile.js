const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
const uploadImageToCloudinary =require("../utils/imageUploader")
// In thsi there is no need to "create Profie" because we have already create a duplicate profile of User , Only we
//  have to Update teh duplicate Profile(i.e, we create a profile with null value)

// Update Additional fiels
exports.updateProfile = async(req ,res) =>{
    try{
        // fetch datas
        const {gender , contactNumber, dateOfBirth=" " ,about= ""} = req.body;
        // validate 
        if (!gender|| !contactNumber|| !dateOfBirth ||!about) {
            return res.status(401).json({
                success : false,
                message : "All fields are required "
            })
        }

        //Finding the Profile Id
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
       
        console.log("userdetails... " , userDetails);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // creating the object
        profileDetails.gender = gender;
        profileDetails.dateOfBirth =dateOfBirth;
        profileDetails.contactNumber =contactNumber
        profileDetails.about =about;
        // Create entry in DB'
        await profileDetails.save();
          // return response 
          const userData = await User.findById(userId).populate("additionalDetails").exec();
          res.status(200).json({
            success:true,
            data:userData,
            message: "succesfullly Profile updated"
        })
    }catch (error) {
         return res.status(404).json({
            success : false,
            message : "Internal server error",
            error : error.message
         })
    }
}

//TODO: HW how can i schedule the Delete account (means after requesting 5,10 .. days  Acccount will be delete )
exports.deleteAccount = async(req,res)=>{
     try{
        //fetch id 
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(401).json({
                success : false,
                message : "User not found"
            })
        }
        // Delete PRofile
        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails})
        // Delete from User 
        await User.findByIdAndDelete({_id : id});
     
        return  res.status(200).json({
           success :true,
           message : "Profile is succesfully Deleted"
       })
     }catch (error) {
        console.log(error.message);
        return res.status(404).json({
           success : false,
           message : "Internal server error",
           error : error.message

        })
   }
}

//|||||||||||---> Get all user Details <-----|||||||||||||                                                           
exports.getAllUserDetails = async(req ,res)=>{
    try {
         // Fetch Id 
         const  id  =req.user.id;
         // Get datas
        const allData = await User.findById(id).populate("additionalDetails").exec(); 

        res.status(200).json({
            success :true,
            message : "Profile Data is succesfully fetched",
            data : allData
        })
    } catch (error) {
        return res.status(404).json({
           success : false,
           message : "Internal server error",
           error : error.message
        })
   }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
        
        const displayPicture = req.files.ProfileImg; 
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
         
        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        )
        res.send ({
            success: true,
            message: `Image Updated Successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        console.log(error.message);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
            message : "Issue while Uploadating profileimg"
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({
            _id: userId,
        })
        .populate({
            path : "courses",
            populate : {
                path: "courseContent",
                    populate : {
                        path : "subSection"
                    }
            }
        })
        .exec()
 console.log( "UserDetails " ,userDetails)
        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could Not Find User With Id: ${userDetails}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getInstructorDashBoard = async(req,res)=>{
      
    try { 
            console.log( "Welconme to backend")
            const CourseDetails = await Course.find({instructor : req.user.id});
            const courseData = CourseDetails.map((course)=>{
                   const totalStudentEnrolled =  course.studentEnrollment.length;
                   const totalAmountGenerated  =  course.price * totalStudentEnrolled;

                   // Creating A  new Object with additional foeld
                   const CourseDataWithStats = {
                    _id : course._id,
                    courseName : course.courseName,
                    courseDescription : course.courseDescription,
                    totalAmountGenerated,
                    totalStudentEnrolled

                   }
                   return CourseDataWithStats;

            })
            return res.status(200).json({
                success:true,
                message: "Fetched all data ",
                data : courseData
            })
        
      } catch (error) {
        console.log( error);
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"Interval Sever error"
        })
      }
}