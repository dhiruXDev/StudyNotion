const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require('../models/Course')
const uploadImgToCloudinary = require("../utils/imageUploader")

exports.createSubSection = async(req , res)=>{
    try {
         // Fetch datas
         const {sectionId , title ,description} = req.body;
         // fetch videos
         const video = req.files.videoURL;
            
         //validate
         if (!title || !sectionId   || !description || !video ) {
            return res.status(401).json({
                success : false,
                message : "All fields are required "
            })
        }
         //create aa subsection
         const videoUpload =await  uploadImgToCloudinary(video , process.env.FOLDER_NAME); // for video URL store on Cloudinary
         console.log("videoUpload response  " , videoUpload);
         const subSectionDetails = await SubSection.create({    title:title ,
                                                                timeDuration: `${videoUpload.duration}` ,
                                                                description:description , 
                                                                videoURL:videoUpload.secure_url                                                              
         })
         // update the section with Sub-section objectID
            const updateSection = await Section.findByIdAndUpdate({_id:sectionId}  
                                                                       , {
                                                                           $push :{
                                                                            subSection:subSectionDetails._id
                                                                           }
                                                                        },{new : true}).populate("subSection").exec();
             
                                                           
         // return response 
          res.status(200).json({
             success:true,
             data: updateSection,
             message: "succesfullly Subsection created"
         })
    } catch (error) {
         return res.status(404).json({
            success : false,
            message : "Internal server error",
            error : error.message
         })
    }
}

exports.updateSubSection = async(req ,res)=>{
    console.log( "In update subssection...........")
      try {

        // Fetch datas
         const {subSectionId,sectionId, title,description} = req.body;
         console.log( "In update subssection...........2" , subSectionId,sectionId, title,description);
         //validate
         if (  !subSectionId     ) {
            return res.status(401).json({
                success : false,
                message : "Something Went wrong(SubsectionId is missing)"
            })
        }    
        let response; 
        // if (req.files.videoURL){...} , if im using this one then its showing error i.e, cannot read property of null of VideoUrl, The error is occurring because req.files.videoURL is being accessed even when req.files is null or undefined
        if(req.files && req.files.videoURL){ //   im sending the video for updating  
                const video = req.files.videoURL;
                // update 
                const videoUpload = await uploadImgToCloudinary(video , process.env.FOLDER_NAME);
                console.log("video file upload response " , videoUpload);

                response = await SubSection.findByIdAndUpdate({_id:subSectionId} ,
                                                              {title:title ,  timeDuration:`${videoUpload.duration}`  ,description:description , videoURL:videoUpload.secure_url} , {new : true});
        }else{
                 const responseOfSubsection = await SubSection.findByIdAndUpdate({_id:subSectionId} ,
                 {title:title ,  description:description} 
                 , {new : true});

                console.log("Sebsection Update : ", responseOfSubsection);
                response = await Section.findById(sectionId).populate("subSection").exec();
        }
 

        res.status(200).json({
            success:true,
            data:response,
            message: "succesfullly Subsection Updated"
        })
      } catch (error) {
        console.log(error);
        console.log("Error in Updating subsection --> ", error.message)
        return res.status(404).json({
           success : false,
           message : "Internal server error",
           error : error.message
        })
   }
}

exports.deleteSubSection = async(req ,res) =>{   // SomeThing went wrong
    try {  
        // Fetch datas
        // const {SubSectionId } = req.params;
        const {subSectionId ,  sectionId} = req.body;
         const updated =await SubSection.findByIdAndDelete({ _id:subSectionId});
        // Also delete entry fromm section array
       // const updatedSection =await Section.findByIdAndDelete({SubSection :SubSectionId});
          
       const updatedSection=  await Section.findByIdAndUpdate(
                        {_id: sectionId},
                        {
                            $pull: {
                                subSection: subSectionId,
                            },
                        },{new:true}
                    )
        res.status(200).json({
            success:true,
            data: updatedSection,
            message: "succesfullly Subsection Deleted"
        })
      } catch (error) {
        console.log(error.message);
        return res.status(404).json({
           success : false,
           message : "Internal server error",
           error : error.message
        })
   }
}



// Check it isse , niche vala sahi hai


// exports.deleteSubSection = async (req, res) => {
//     try {
//         const {subSectionId, sectionId} = req.body;
//         await Section.findByIdAndUpdate(
//             {_id: sectionId},
//             {
//                 $pull: {
//                     subSection: subSectionId,
//                 },
//             }
//         )
//         const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

//         if(!subSection) {
//             return res
//                 .status(404)
//                 .json({
//                     success: false,
//                     message: "SubSection Not Found",
//                 })
//         }

//         return res.json({
//             success: true,
//             message: "SubSection Deleted Successfully",
//         })

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "An Error Occurred While Deleting the SubSection",
//         })
//     }
// }