const User= require("../models/User");
const jwt = require("jsonwebtoken")

// authn
 exports.authN =  async(req, res, next)=>{
            try {
              
                //extract Token
                 const token = req.body.token ||
                               req.cookies.token || 
                               req.header("Authorization")?.replace("Bearer", " ");
               // console.log("in backend Token is : " , token);
                if (!token) {
                    return res.status(400).json({
                        success :false,
                        message: "Token not Found"
                    })
                }
                 
                // validatiing the Token
                try {
                    const decodedData = await jwt.verify(token , process.env.JWT_SECRET);
                 //   console.log("JWT verification message: " , decodedData);
                    req.user = decodedData;
                } catch (error) {
                    return res.status(400).json({
                        success :false,
                        message: "something Went Wrong during Token validating"
                    })
                }
               next();    
     
            } catch (error) {
                return res.status(400).json({
                    success :false,
                    message: "something Went Wrong during Token AuthN"
                })
            }       
 }                
// isStudent
 exports.isStudent = async(req, res ,next)=>{
    try {
          if (req.user.accountType !== "Student") {
            return res.status(400).json({
                success :false,
                message: "Thsi is protected Route for Student"
            })  
          }
          next();

    } catch (error) {
        return res.status(400).json({
            success :false,
            message: "User role cann't be verified , please try again "
        })
    }
 }
// isInstructor
 exports.isInstructor = async(req, res , next)=>{
    try {
        if (req.user.accountType !== "Instructor") {
          return res.status(400).json({
              success :false,
              message: "Thsi is protected Route for Instructor"
          })  
        }
        next();

  } catch (error) {
      return res.status(400).json({
          success :false,
          message: "User role cann't be verified , please try again "
      })
  }
 }
// is Admin
exports.isAdmin = async(req, res ,next)=>{
    
    console.log(req.user.accountType)
    try {
        if (req.user.accountType !== "Admin") {
          return res.status(400).json({
              success :false,
              message: "Thsi is protected Route for Admin"
          })  
        }
        next();

  } catch (error) {
    
      return res.status(400).json({
          success :false,
          message: "User role cann't be verified , please try again"
      })
  }
 }
