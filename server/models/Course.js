const mongoose =require("mongoose");
const courseSchema = new mongoose.Schema({
     courseName: {
        type : String,
        required : true
     },
     courseDescription : {
        type : String
     },
     instructor: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
     },
     whatYouWillLearn : {
        type : String
     },
     courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Section"
     }],
     //Abhi add kye hai  courseProgress ko bq it's storing the completed lec details
     courseProgresses : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
     }], // 
     ratingAndReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReview"
     }],
     tag:{
         type: [String],
         required : true
     },
     category:[{               // Changeing happend , maked array ,seeeeee
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
     }],
     price : {
        type : Number
     },
     thumbnail :{
        type : String,
        required : true
     },
     Instructions:{
               type :[String]
     },
     status:{
      type : String,
      enum :["Draft" , "Published"]
     },
     studentEnrollment:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",     
     }],
     createdAt: {
      type: Date,
      default: Date.now()
  }

},{timestamps:true});
module.exports = mongoose.model("Course" ,courseSchema);