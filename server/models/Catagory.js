const mongoose =require("mongoose");
const categorySchema = new mongoose.Schema({
      name: {
        type : String,
        required : true
      },
      description: {
        type : String,
        required : true
      },
      course:[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
      }]
});
module.exports = mongoose.model("Category" ,categorySchema);
// Lec 79 . 35:95 min changes are there 
