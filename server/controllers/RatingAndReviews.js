const RatingAndReview = require("../models/RatingAndReview");
const Course =require("../models/Course");
const { default: mongoose } = require("mongoose");

// create RatingAndReviews 
exports.createRatingAndReviews = async(req ,res)=>{
        try {
              // get userId and Course_id ,rating ,reviews 
               const userId = req.user.id;
               const {courseId ,rating ,reviews} = req.body;
                console.log( courseId ,rating ,reviews, userId)
               // validate User
               const CourseDetails = await Course.findById(   // Finding with the help of Equal operator , we can also find by using FindById()
                                                        {_id:courseId,
                                                           studentEnrollment:{$elemMatch :{$eq : userId}} 
                                                        }
               )
               if (!CourseDetails) {
                     return res.status(400).json({
                         success :false,
                         message : "Given CourseId is Invalid"
                     })
               }
              // check if user already rate and reviews (in this one user can only one rate teh same course)
               const alreadyReviewed = await RatingAndReview.findOne({
                                                                       user: userId,
                                                                       Course : courseId
                                                                    });
                                                                     
                        if (alreadyReviewed) {
                             return res.status(403).json({
                                success :fasle,
                                message : "User is already reviewed"
                             })
                        }        
              // crerate entry in RatingReviews schema 
              const ratingReviews = await RatingAndReview.create({
                                                                  rating ,
                                                                  reviews,
                                                                  user: userId,
                                                                  course : courseId
              })
              // Update course with ratignAndReviews Id
              const updatedCourse = await Course.findByIdAndUpdate({ _id:courseId },
                                                                    {
                                                                        $push:{
                                                                            ratingAndReviews:ratingReviews._id  
                                                                        }
                                                                    },{new : true}
              )
              console.log(updatedCourse);
              // return response
              return res.status(200).json({
                   success:true,
                   message : "succesfully created Rating and Reviews",
              })
            
        } catch (error) {
             console.log(error);
             return res.status(404).json({
                success :false,
                message :error.message
             })
        }
}

//get avgRating
exports.getAvgRating = async(req ,res)=>{
    try {
         // Get id
         const courseId = req.body.courseId;
         //calculate the Avg rating
         const result = await RatingAndReview.aggregate([ // See the aggregate() in documentation
                                                         {
                                                            $match:{  // Find out ek esa entry in RatingAndReview that mathes the Course with given courseId 
                                                                Course :new mongoose.Types.ObjectId(courseId)
                                                            }
                                                         },
                                                         {
                                                            $group:{   // Group kro ab
                                                                _id : null,
                                                                averageRating: {$avg : "rating"} // Avg kro Rating the basis pr
                                                            }
                                                         }
         ]); // Aggregate() fun will return the array of single vale that indicate the Average rating

         // return rating , 
         if (result.length > 0) {
              return res.status(200).json({
                success :true ,
                avgRating :result[0].averageRating
              })
         }
         // No any rate id given by User
       return res.status(200).json({
           success :true,
           avgRating:0
       })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
           success :fasle,
           message :"Error found while Finding AVG rating"
        })
    }
}

// Get all rating And reviews
exports.getAllRatingAndReviews = async(req ,res)=>{
    try {
           // Find all rating 
           const allreviews = await RatingAndReview.find({})
                                                         .sort("desc")
                                                         .sort({rating :"desc"})
                                                         .populate({
                                                            path : "user",
                                                            select :"firstName lastName email image"
                                                         })
                                                         .populate({
                                                            path :"course",
                                                            select :"courseName"
                                                         })
                                                         .exec();
            return res.status(200).json({
                  success :true,
                  message :"All reviews are fetched succesfully",
                  Allreviews : allreviews,
            })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
           success :false,
           message :"Error found while Finding all rating and reviews"
        })
    }
}

