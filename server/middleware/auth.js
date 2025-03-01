const User= require("../models/User");
const jwt = require("jsonwebtoken")

// authn
 exports.authN =  async(req, res, next)=>{
            try {
              
                //extract Token
                 const token = req.body.token ||
                               req.cookies.token || 
                               req.header("Authorization").replace("Bearer ","");
              
                if (!token) {
                    return res.status(400).json({
                        success :false,
                        message: "Token not Found"
                    })
                }
                 
                // validatiing the Token
                try {
                 console.log("before validation");
                    const decodedData = await jwt.verify(token , process.env.JWT_SECRET);
                   console.log("JWT verification message: " , decodedData);
                    req.user = decodedData;
                 console.log("after validation");
                } catch (error) {
                    return res.status(400).json({
                        success :false,
                        message: "something Went Wrong during Token validating"
                    })
                }
             console.log("before next");
               next();  
             console.log("after next");
     
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
