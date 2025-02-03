const Course = require("../models/Course");
const Section = require("../models/Section")

exports.createSection = async(req, res)=>{
    try {
            // Data fetch
            const {sectionName , courseId} =req.body;
            // validation 
            if (!sectionName || !courseId) {
                return res.status(401).json({
                    success : false,
                    message : "All fields are required "
                })
            }
            // Create a section
            const newSection = await Section.create({sectionName});
            // Update Course model with section ObjectId
            const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                        courseId ,
                                                        {
                                                            $push : {
                                                                courseContent : newSection._id 
                                                            }
                                                        } ,{new : true}
                                                   ).populate({
                                                        path : "courseContent" , // Populating sections in courseContent
                                                            populate:{
                                                                path: "subSection"// Populating subsection  in sections
                                                            }
                                                    }).exec();
//HW TODO: Use populate for replace both section and sub-section from updatedCourseDetails                                      
            // return response
           return  res.status(200).json({
                success :true,
                message:"Succesfully section created ",
                data: updatedCourseDetails
             })

    } catch (error) {
        console.log(error);
        console.error(error.message);
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateSetion = async(req ,res)=>{
    try {
         // Fetch data
         const{sectionName , sectionId,courseId} = req.body;
         // validate 
         if (!sectionName || !sectionId) {
            return res.status(401).json({
                success : false,
                message : "All fields are required "
            })
        }
        
        // Update By uing ID
        await Section.findByIdAndUpdate(sectionId , {sectionName} ,{new : true})   // updaing sectionName with the hepl of SectionId
        let courseDetails = await Course.findById(courseId).populate( {
                                                                        path: "courseContent",
                                                                          populate:{
                                                                            path:"subSection"
                                                                          }
                                                                            }).exec();                     
        console.log("courseDetails . " ,courseDetails);
        // return res
        res.status(200).json({
            success :true,
            message:"Succesfully section Updated ",
            data:courseDetails
         })
    } catch (error) {
        console.log(error);
        console.error(error.message);
        return res.status(401).json({
            success:false,
            message:"something Went wrong while Updating Section"
        })
    }
}

exports.deleteSection = async(req, res)=>{
    try {
        // Get ID  ---> from req ki parameter assume we are sending the ID in parameter
       // const{sectionId} = req.params;     check kro isko bhi ....
       const{sectionId,courseId} = req.body;
        // Delete 
        await Section.findByIdAndDelete(sectionId);
        // course ko Update kro
      const newCourse=  await Course.findByIdAndUpdate( 
                courseId,
                 {
                    $pull:{
                        courseContent : sectionId
                    },
                 },
                 {new : true},
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
       // return res
       res.status(200).json({
           success :true,
           data:newCourse,
           message:"Succesfully section is Deleted"
        })

   } catch (error) {
       console.log(error);
       console.error(error.message);
       return res.status(401).json({
           success:false,
           message:"something Went wrong while Deleting Section"
       })
   }
}