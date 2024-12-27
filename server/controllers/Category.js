 
const { ConnectionStates } = require("mongoose");
const Category = require("../models/Catagory");
//const Course  =require("../models/Course");
// Create a Category
exports.createCategory = async(req , res)=>{
    try {
         // Get all  data 
         const{name , description} =req.body;
         // Validation
         if (!name || !description) {
            return res.json({
                success:false,
                message : "Please fill all required field"
            })
         }
       //create enry in DB
       await Category.create({
         name :name ,
         description:description
       });
       res.status(200).json({
           success : true ,
           message : "Created Category succesfully"

       })
    } catch (error) {
           console.log("Error while creating Category : " ,error )
           res.status(200).json({
                success : false ,
                message : "Somthing went wrong while creating Category"
       })
    }
}
/*****************************Important******************************* 
     conversion of string into ObjecId format----------

     const res = await getCalogPage(new mongoose.Types.Object(categoryId)) ;

     It will convert the incoming categoryId string into Object Id format , basically uses in Backend for converting
*/

// Get all Category  
exports.showAllCategory = async(req, res) =>{
     try {
           const AllCategory = await Category.find({} , {name : true , description :true })  // give all tags and name and description should be there
          // console.log("Categories ,", AllCategory)
           res.status(200).json({
               success:true,
               message: "Fetching all tags succesfullly",
               AllCategory
           })

     } catch (error) {
         console.log("Error while getting all Tags : " ,error )
         res.status(200).json({
         success : false ,
         message : "Somthing went wrong while getting Tags"
         
     })
     }
}

exports.catagoryWisePageDetails= async(req ,res)=>{
   try {   
           // console.log( "Welcome ");
            const {categoryId} = req.body; 
            // Get all coyurse by specify given catagoryId
            const SelectedCategory = await Category.findById(categoryId).
                                                                populate({
                                                                    path: "course" ,
                                                                    populate: {
                                                                        path:"instructor"
                                                                       },
                                                                    match : {status : "Published"},

                                                                })
           // console.log("3");
            //console.log( "selected --- ", SelectedCategory);
            //Handle the case when there is no course for selected course
            if (SelectedCategory.course.length === 0) {
                  // console.log( "No COurse found for selected Course");
                   return res.status(404).json({
                    success :false,
                    message : "No Course for selected category"
                   })
            }
            if (!SelectedCategory) {
                return res.status(400).json({
                    success :false,
                    message :"Catagory not Found"
                })
            }

           // console.log("SelectedCatagory respone " , SelectedCategory);

            //also Get courses for different catagories
            const CategoryExceptSelected = await  Category.find({_id : {$ne : categoryId}});
           // console.log( "CategoryExceptSelected  " ,CategoryExceptSelected)
            function getRandomInt(max) {
               // console.log( "CategoryExceptSelected" , max);

                 let val = Math.floor(Math.random() * max );
                  console.log( "vlaue  " ,val);
                 return val;
            }
            const defferentCatagoris = await Category.findOne(CategoryExceptSelected[getRandomInt(CategoryExceptSelected.length)]._id).
                                                                                              populate({
                                                                                                path: "course" ,
                                                                                                populate: {
                                                                                                    path:"instructor"
                                                                                                   },
                                                                                                match : {status : "Published"}
                                                                                              }).exec();

          //  console.log("DifferentCategories -- " ,defferentCatagoris);   
            //Get top 10 most selling Course 
             const allCatagories = await Category.find().populate({
                                       path : "course",
                                       populate: {
                                        path:"instructor"
                                       },
                                       match : {status : "Published"}
             }).exec();
             const allCourses = allCatagories.flatMap((category)=>category.course);
             const mostSellingCourses = allCourses.sort((a,b)=>b.sold - a.sold).slice(0,10);

            console.log( "mostSellingCourses -- " ,mostSellingCourses);  
            return res.status(200).json({
                 success :true,
                 message :"Succesfully Fetched All catagories datas",
                 data:{
                    SelectedCategory,
                    defferentCatagoris,
                    mostSellingCourses
                 }
            });
   } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(400).json({
        success :false,
        message :"Invalid Catagory Id"
    })
   }
}
