const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      firstName : {
        type : String,
        required : true,
        trim : true
      },
      lastName : {
        type : String,
        required : true,
        trim : true
      },
      email : {
            type : String,
            required : true,
            trim : true
      },
      password: {
        type : String,
        required : true
      },
      accountType: {
          type : String,
          enum : ["Student" , "Instructor" , "Admin"],
          required : true
      },
      additionalDetails : {
           type : mongoose.Schema.Types.ObjectId,
           required: true,
           ref : "Profile"
      },
      image : {
         type : String,
         required :true
      },
      token:{
        type : String
      },
      resetPwdExpiryTime:{
           type : Date
      },
      courses : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
      ],
      coursesProgress : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
        }
      ]
      
}, // Timestam is add , this is for adding data when the document is created and last modified
 {timestamps:true}
);

   

module.exports = mongoose.model("User" , userSchema);
/*The "trim()" method of String values removes whitespace from both ends of this string and returns a new string, without modifying the original string. To return a new string with whitespace trimmed from just one end, use trimStart() or trimEnd() */