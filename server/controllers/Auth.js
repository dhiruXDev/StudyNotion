const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require('bcryptjs');
    
const passwordUpdated = require("../mail/templates/PasswordUpdate")

const Profile = require("../models/Profile");
const JWT = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
// otp sending Handlers
exports.sendOTP = async (req , res) =>{
    try {
          // Fetch the email from req 
          const{email} = req.body;
          const UserExits = await User.findOne({email}) ;
         if (UserExits) {
             return res.status(500).json({
                success : false,
                message : "User already regestired "
             })
         }
         
        // Generate OTP (Only numbers)
        let otp =  otpGenerator.generate(6 , {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        }) 
        console.log("Otp is : " , otp)
        // Check uniuq OPT or Not ? (This is bekar methosd in Indusrty level there is a standard Library for generating Unique OTP , We can use them)
        let result = await User.findOne({otp : otp});
        while(result){
            otp = otpGenerator.generate(6 , {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false
            }) 
              result = await User.findOne({otp : otp});
        }
        // console.log("After checking Unique OTP.");
        // Store in DB
       const otpResponse =  await OTP.create({
        email,otp
       });
   console.log("OTP saved Response" ,otpResponse );
       res.status(200).json({
        success : true,
        message : "OTP send succesfully and stored in DB",
        otpResponse
       });

    } catch (error) {
          console.error(error);
          console.log(error.message);
          return res.status(500).json({
            success :false,
            message : "Something went Wrong"
         })
    }
}

// SighUp handlers
exports.signUp = async(req , res) =>{
    try {
    // Fetch all data
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        console.log("otp send by front",otp);
// Validation of data
     if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
        return res.status(401).json({
            success : false,
            message : "All fields are required"
        })
     }
   const userPresent = await User.findOne({email});
   if(userPresent){
    return res.status(400).json({
        success:false,
        message: "User already registered"
    })
   }
   // Password matcing
   if (password !== confirmPassword) {
    return res.status(400).json({
        success:false,
        message: "Password not matched"
    })
   }
   //Recently(stored) OTP verification, Find most recent OTP for User
   const recentOTP = await OTP.find({email}).sort({createdAt : -1}).limit(1);
   console.log("RecentOtp response" , recentOTP);
   
   if (recentOTP.length ===0) {
    return res.status(401).json({
          success : false,
          message : "OTP not Found"
    })
   } 
 
   if(recentOTP[0].otp !== otp){
    return res.status(401).json({
        success : false,
        message : "OTP not Matched , please try again"
    })
   }
// Validation completed
 // Hashing the password and store all data in DB
   const hashedPass = await  bcrypt.hash(password , 10);
   console.log("Hashed password : " , hashedPass);

  const profileDetails = await Profile.create({   // create initially User detILS empty
          gender : null,
          dateOfBirth: null,
          contactNumber :null,
          about: null
  })
   const user = await User.create({
       firstName,
       lastName,
       email,
       password : hashedPass,
       accountType ,
       additionalDetails : profileDetails._id,
       image :`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
   })

   // Return response
  return res.status(200).json({
      success :true,
      message : "User registered succesfully",
      data : user
   })
    } catch (error) {
         console.log(error);
         console.log(error.message);
         return res.status(400).json({
            ssucces : false,
            message : "someThing Went wrong , please try again"
         })
    }
}

// LogIn handler
exports.logIn = async(req , res) =>{
    try {
         const{email , password} = req.body;
         // Validdation
         if(!email || !password){
            return res.status(401).json({
                success: false,
                message  :"All are required , please fill all fields"
            })
         }
         const user = await User.findOne({email}).populate("additionalDetails"); console.log("2");
         if (!user) {
            return res.status(401).json({
                success: false,
                message  :"User not Registered, Please SignUp firstly"
            })
         }
         if(await bcrypt.compare(password , user.password) ) {
              const payload = {
                        email:user.email,
                        id:user._id,
                        accountType:user.accountType
              }
              // Generate JWT token
              const token = JWT.sign(payload , process.env.JWT_SECRET , {
                 expiresIn : "24hr"
              })
              user.token = token;
              user.password = undefined;
            // console.log("User details during Login: " , user );
            // Generate Cookie and send it
            const options = {
                expiresIn : new Date(Date.now() +  3*60*60*60*1000),  // 3days
                httpOnly : true 
            }
            res.cookie("token" ,token ,options).status(200).json({
                success:true,
                message : "LogIn succesully",
                data : user,
                token,
            })
         }
         else{
            return res.status(401).json({
                success: false,
                message  :"Password is not matched, pleased Try again."
            })   
         } 

    } catch (error) {
        return res.status(401).json({
            success: false,
            message  :" something went wrong during logIn. please try again"
        })
    }
}


//change password
exports.changePassword = async(req , res)=>{
    try {
        // fetch data 
        const{
            oldPassword,
            newPassword,
        } = req.body;
        // Validation
        if (!oldPassword || !newPassword   ) {
            return res.status(400).json({
                success :false,
                message: "Please fill all required fields"
            })
        }

   const userId =req.user.id;
   const user = await User.findById(userId);
   if (!user) {
    return res.status(400).json({
        success :false,
        message: "UserId is not valid"
    })
   }

//    if (oldPassword !== confirmPassword) {
//     return res.json({
//         success:false,
//         message : "NewPassword and ConfirmPassword is not matched"
//     })
// }
   console.log("User details" , user)

     if (!await bcrypt.compare(oldPassword , user.password)) {
        return res.status(400).json({
            success :false,
            message: "Old password not matched"
        })
    }  
  console.log("2")
       // update teh DB with new Password
       const hashedPass = await  bcrypt.hash(newPassword , 10);
        
       user.password = hashedPass;
       await user.save();    // it is for updaing the DB 
        // Sending a email 
        console.log("4")
        try {
            const respone = await mailSender("password Update Confirmation", user.email ,passwordUpdated(user.email, user.firstName));
            console.log("5")
        } catch (error) {
             console.error(error);
             console.log(error.message)
             return res.json({
                message : "Something happen during mail sending"
             })
        }
         // sending res
 
        return res.status(200).json({
            success:true,
            message :"Pasword Succesfully Updated"
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success :false,
            message: "something went wrong while changing password,please try again"
        })
    }
}

