const express =require("express");
const router = express.Router();
//Import the required controllers and  middleware functions
const {sendOTP , signUp , logIn ,changePassword} = require("../controllers/Auth");

const {resetPasswordToken ,resetPassword} = require("../controllers/resetPassword") ;
const{authN} = require("../middleware/auth");
//Routes for Login, Signup, and Authentication

//*******************************************************************************
//                          Authentication Routes
//*******************************************************************************

router.post("/signUp" , signUp);
router.post("/logIn" , logIn);
router.post("/changePassword" ,authN, changePassword);
router.post("/sendOTP" , sendOTP);


//**********************************************************************************
//                          Reset Password
//**********************************************************************************4
//Route for generating a reset password token
router.post('/reset-password-token', resetPasswordToken);

//Route for resetting user's password after verification
router.post('/reset-password', resetPassword);


module.exports = router;