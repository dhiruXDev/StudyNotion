const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const mailSender = require("../utils/mailSender");
const passwordUpdated = require("../mail/templates/PasswordUpdate")
//reset Pasword Token(Visiting the FrontEnd for reseting teh Password and generating Token )
  exports.resetPasswordToken = async(req , res)=>{
    try {              
           // get email 
           const email = req.body.email;
           // Validate the email , if it will not present 
            const user = await User.findOne({email});
            if (!user) {
                return res.json({
                    success: false,
                    message : "Entered email is not Registerd with us"
                }) 
            }
           // Generate token
           const token =  crypto.randomUUID();
           // Update User by adding their token and expiry Time
             const UpdateResponse = await User.findOneAndUpdate(
                                        {email : email},  // Email ke basis pr Search kro
                                        {
                                            token : token,
                                            resetPwdExpiryTime : Date.now() + 25*60*1000
                                        },
                                        { new : true}  // It will return the Updated docs in Response
             )
             console.log("Token added Response " , UpdateResponse);
           // Create URL
            const url = `http://localhost:3000/update-password/${token}`;
            console.log(token);
           // Send to email
            await mailSender(`Password Reset`, 
                              email,
                             `Password Reset Link For verification: ${url} Please click on this URL for reset password`
            )
            // Return respone
            res.status(200).json({
                success : true,
                message : "Password Link sent succesfuly"
                
            })
    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success : false,
            message : "something Went wrong while Generating Token"
        })
    }
  }

// Reset password (FInally reseting teh password)
exports.resetPassword = async(req, res)=>{
    try {
         // Get data 
         const {password , confirmPassword , token} = req.body;
         //validation
         if (password !== confirmPassword) {
            return res.json({
                success: false,
                message : "Password and ConfirmPassword is not matched"
            }) 
         }  
         //get UaserDetails from DB
         const userDetails  =  await User.findOne({token : token});
         if (!userDetails) {
            return res.json({
                success: false,
                message : " Invalid Token , please Regenerate Token"
            })
         }
         // check if user's token time is expired
         if (userDetails.resetPwdExpiryTime < Date.now()) {
            return res.json({
                success: false,
                message : "Token time is expired , Regenrate teh token"
            })
         }
          // Hash pwd
          const hashedPass =await  bcrypt.hash(password, 10);
          //Password updating in DB
          await User.findOneAndUpdate(
                        {token : token},
                        {password :hashedPass},
                        {new : true}
          )
   
        // Mail send krna hai
         await mailSender(`Password Update Confirmation` ,userDetails.email, passwordUpdated(userDetails.email, userDetails.firstName));                                                      
        // Sending response
        return res.status(200).json({
            success :true,
            message : "SuccesFully Reset password"

        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).json({
            success : true,
            message : "something Went wrong while reseting pwd"
        })
    }
}
