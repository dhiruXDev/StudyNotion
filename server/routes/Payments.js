const express =require("express");
const router = express.Router();
 
const {capturePayments ,verifyPayment,sendPaymentSuccesfullEmail} =require("../controllers/Payments");
const{authN ,  isStudent , isInstructor , isAdmin} = require("../middleware/auth") ; 
// Api routes
router.post("/capturePayments" , authN , isStudent , capturePayments);
router.post("/verifyPayment" , authN , isStudent  ,verifyPayment);
router.post("/sendPaymentSuccesfullEmail"  , authN , isStudent , sendPaymentSuccesfullEmail);

// Extract the user's ID from the authenticated request
module.exports = router;