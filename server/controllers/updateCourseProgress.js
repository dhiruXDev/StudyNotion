const CourseProgress = require("../models/CourseProgress");
 
exports.updateCourseProgress = async(req,res)=>{
     const{courseId,subSectionId} = req.body;
     const  userId = req.user.id;
     try {
            if(!courseId|| !subSectionId){
                return res.status(404).json({
                    success:false,
                    message:"Invalid subsection"
                })
            }
            //Check for Old entry
             
                const courseProgress = await CourseProgress.findOne({
                    courseId :courseId,
                    userId:userId
                });

           
            if(!courseProgress){
                return res.status(400).json({
                    success:false,
                    message :"Course Progress is not exists"
                })
            }else{
                //check for re-completion of video/Lecture
                if(courseProgress.completedVideo.includes(subSectionId)){
                    return res.status(400).json({
                        success:false, 
                        message:"Lecture is already completed"
                    })

                }else{
                /// Push into completedVideo      
                    courseProgress.completedVideo.push(subSectionId);
                } 
            }

            // Save the DB
            await courseProgress.save();

            return res.status(200).json({
                success:true,
                completedVideos: courseProgress?.completedVideo? courseProgress?.completedVideo: [],
                message:"Lecture is Completed"
            })
        
     } catch (error) {
         console.log(error.message);
         return res.status(404).json({
            success:false,
            message:"Internal server error"
         })
     }    
}

exports.fetchCompletedLectures = async(req,res)=>{
      try {
        const{courseId,subSectionId} = req.body; 
        console.log("wel")
        const  coorseProgressAllData = await CourseProgress.findOne({ courseId:courseId}) ;
        console.log("first" ,  coorseProgressAllData)
        if (!coorseProgressAllData) {
            return res.status(400).json({
                success:false,
                message :"Not compled Lecture"
            })
        }

        return res.status(200).json({
            success:true,
            completedVideos: coorseProgressAllData.completedVideo ? coorseProgressAllData.completedVideo: [],
            message:"Lecture is Completed"
        })
        
      } catch (error) {
        console.log( "error during fetching the lecture comlpetion data",error);
        return res.status(404).json({
           success:false,
           message:"Internal server error"
        })
      }
}