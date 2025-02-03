const mongoose =require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/EmailVerificationTemplate")
const OTPSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    }, 
    otp:{ 
        type : String,
        required :true ,
        trim: true
    },
    createdAt:{
        type : Date,
        default : Date.now(),
        expires : 5*60         // expire in 5 min.
    }

});
//263544 263544

// A function for sending a mail before creating a entry in DB
    async function sendVerificationEmail(email, otp){
        try {
                // Calling mailSender funcion 
            const mailResponse = await mailSender("verification Email from StudyNotation" ,email ,otpTemplate(otp));

            console.log("email sent succesfully " , mailResponse);
        } catch (error) {
             console.log("Error during sending email : " , error);
             throw error;
        }
    }
// Pre-middleware --> Before saving the docs , The email will send for verification
OTPSchema.pre("save" , async function(next){
     await sendVerificationEmail(this.email , this.otp);
     next();  // For executing next middleware, if exists
})
module.exports = mongoose.model("OTP" ,OTPSchema);