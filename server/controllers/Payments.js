const { instance } = require("../configs/razorPay")
const User = require("../models/User");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
// const { default: payments } = require("razorpay/dist/types/payments");
//const {mailSender}= require("../utils/mailSender");
const mailSender = require("../utils/mailSender")
const Razorpay = require('razorpay');
const crypto =require("crypto")
const { coursePaymetSuccesfullyEmail } = require("../mail/templates/coursePaymetSuccesfullyEmail");
const {courseEnrollmentEmail}  =require("../mail/templates/courseEnrollmentEmail");
const CourseProgress = require("../models/CourseProgress");
require('dotenv').config();
/** 
 ---->  req.user (meaning):-
 --------------------------
            When you use authentication middleware (like passport.js or JWT-based authentication), user data is often attached to the req object under req.user after successful authentication.
            This req.user object usually contains details of the authenticated user, such as their id, name, email, etc.
 */

exports.capturePayments = async(req ,res)=>{
          const userId  =req.user.id;
          const {courses} = req.body;
          console.log( "Cour " ,courses)
          if(courses.length === 0){
            return res.status(500).json({
                message:"Please provide Valid COureId",
                success:false
            })
          }
          let totalAmount = 0;
          console.log( "xxxx", courses)
          for (const course_id of courses) {
            // console.log( "xv",course_id)
                  let course ;
                  try {
                     course = await Course.findById(course_id);
                     // console.log( "course details ",course)
                     if(!course){
                         return res.status(500).json({
                            success:false,
                            message :"Could not find the course"
                         })
                     } 
 
                    const uid = new  mongoose.Types.ObjectId(userId);  
                     if(course.studentEnrollment.includes(uid)){
                          return res.status(200).json({success:false,message:"You are already enrolled for this course"})
                     }
                     totalAmount +=course.price;
                    
                  } catch (error) {
                     console.log("Error during calculating the Totalamt ",error);
                     return res.status(500).json({success:false ,message:error.message})
                  }
          }
          const options = {
                              amount : totalAmount*100,
                              currency : "INR",
                              receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                         } 
                      
// reciept : Math.random(Date.now()).toString(), -- It will give error bq it give "0.25487458415888" whaich may not acceptable from some Payment gateway
//If you want a more robust method of generating unique IDs, you can use a library like uuid to generate a unique identifier: 
//Like :-  receipt: `rcpt_${uuidv4()}`,  // Use a UUID for the receipt
          
//creating the Order
          const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY ,
            key_secret: process.env.key_secret,
          });  

          try {      console.log( "Course 7-- ", );
                     console.log( instance)
                    const paymentResponse = await instance.orders.create(options);
                    console.log("Pymetn response -- > ", paymentResponse)
                    res.json({
                    success:true,
                    message:paymentResponse
                   }) ;
                   console.log( "Course 8-- ", );

          } catch (error) {
             console.log( "Error during creating orders" ,error);
             console.error( error);
             return res.status(400).json({
               message: "Could not initiate the order",
               success:false,
               error: error.message})
          }
}

exports.verifyPayment = async(req ,res)=>{
        const razorPay_order_id = req.body?.razorpay_order_id;
        const razorPay_payment_id = req.body?.razorpay_payment_id;
        const razorPay_signature = req.body?.razorpay_signature;
        
        const userId = req.user.id;
        const courses = req.body?.courses;
       
        if( !razorPay_order_id ||
            !razorPay_payment_id ||
            !razorPay_signature || !courses || !userId
        ){
            return res.status(404).json({success:false,message :"Payament Failed"})
        }

        let body = razorPay_order_id + "|" + razorPay_payment_id;
        console.log( "Body is " ,body)
        const key = process.env.key_secret;
        console.log( key);
        const expectedSignature = crypto
                                        .createHmac("sha256" ,process.env.key_secret)
                                        .update(body.toString())
                                        .digest("hex");
         console.log( "Expected signature -- ", expectedSignature);
        if(expectedSignature == razorPay_signature){
               // Enrolled the student for the bought Course
                await enrolledStudent(courses,userId,res);
                console.log("Inside verification signature and ExpectedSignature ");
               //reur 
               return res.status(200).json({
                  success:true ,
                  message:"Payment Verified"})
        }
        return res.status(404).json({
         success:false,
         message:"Payment Filed"})
}

const enrolledStudent = async(courses,userId,res)=>{
          if(!courses || !userId){
            return res.status(404).json({
                success:flase,
                message:"Please provide data for course or Userid"
            })
          }
         console.log( "course is  ",courses);
          let enrolledCourseName ;

         try {
            
             //Loop for each course for payment (when multiple course is Sold )
              for (const courseObj of courses) {
                  console.log("Current courseObj:", courseObj);
                  //  let courseId = courseObj.courseId;
                   let courseId = courseObj;

               //     if (!mongoose.Types.ObjectId.isValid(courseId)) {
               //       console.log("Invalid course ID:", courseId);
               //       return { success: false, message: "Invalid Course ID" };
               //   }n

                   const enrolledCourse = await Course.findByIdAndUpdate(
                                                                           {_id:courseId},
                                                                           {$push : {studentEnrollment : userId}},
                                                                           {new : true} );
                  console.log( "enrolled Course" , enrolledCourse);
                  let newCourse= enrolledCourse.courseName;
                   enrolledCourseName = {...enrolledCourseName , newCourse};
                  if(!enrolledCourse){
                     return res.status(404).json({success:false,message:"Course not Found"})
                  }
                  
                  //Create Courseprogress
                  const courseProgress = await CourseProgress.create({
                     courseId : courseId,
                     userId:userId,
                     completedVideo:[]
                  });

                  //Find Student and add the courseid in thier bought course List
                  const enrolledStudent = await User.findByIdAndUpdate( 
                                                                        {_id:userId},
                                                                        {$push : { courses : courseId ,
                                                                                   coursesProgress :courseProgress._id
                                                                        } },
                                                                        {new:true}
                  );
                  //we can use $addToSet at $push place , it will remove the duplicate . it'll not store duplicate
                  console.log( "Enrolled student ", enrolledStudent); 
              }

            let userData = await User.findById(userId);  
           console.log( "Course Name" ,enrolledCourseName)
             // Now mail send kro Userr ko 
            //  const mailrrespone = mailSender(userData.email ,  `You enrolled into Course ${enrolledCourse.courseName}`,courseEnrollmentEmail(enrolledCourse.courseName , `${userData.firstName }${userData.lastName}`) ) 
            const mailrrespone = await  mailSender( `New Course Registration` ,userData.email , courseEnrollmentEmail(  `${enrolledCourseName.newCourse}` , `${userData.firstName + ' ' + userData.lastName}` ) ) ;

         console.log("Mailresponse " , mailrrespone);
         return res.status(200).json({
            success : true,
            message : "Hey you are succesfully Enrolled in new course  and signature verified"
         })
                      
         } catch (error) {
            console.log( "Error during enrolledStudent " ,error);
            return res.status(404).json({
                            success : false,
                            message : "Invalid request"
                        })
         }
}
    
exports.sendPaymentSuccesfullEmail = async(req,res)=>{
      const{orderId,paymentId,amount} =req.body;
      const userId = req.user.id ;
      
      if (!orderId || !paymentId || !userId || !amount) {
           return res.status(400).json({success:false,message:"Please provide all the fields"})
      }
      try {
            //Find student and send mail for succesfully buy course
            const enrolledStudent =await User.findById(userId);
            if(!enrolledStudent){
               return res.status(400).json({success:false ,message:"UserId wrong"})
            } 
            const re = await  mailSender( `Payment Recieved` ,enrolledStudent.email , coursePaymetSuccesfullyEmail( `${enrolledStudent.firstName  + ' ' + enrolledStudent.lastName}` , amount/100, paymentId,orderId));
            return res.status(200).json({
                success:true ,
                message :"Succesfully sent Email"
               })

      } catch (error) {
         console.log("Error during sending mail ",error);
         return res.status(404).json({success:false , message:"Could not sent the Email"})
      }
}

/*********This given belo code for buying single course , BUT upper vala is for buying Multiple course at atime */

// Capture the payments (In this only we will create the Order and only we are in Create state)
// exports.capturePayments = async(req ,res)=>{
//          // Get userId and CourseId
//          const userId = req.user.id;
//          const{course_id} = req.body;

//          //Validate 
//          const userDetails = await User.findById(userId);
//          if (!userDetails) {
//              return res.status(400).json({
//                 success : false,
//                 message : "Given UserId is not vald"
//              })
//          }
//          let courseDetails;
//          try {
//                courseDetails = await Course.findById(course_id);
//              if (!courseDetails) {
//                 return res.status(400).json({
//                     success : false,
//                     message : "Could not find the course"
//                  })
//              }

//              // Check  if User is already Pay for this course
//              const uId = new mongoose.Types.ObjectId(userId) ; // Converting the string UserId into ObjectId
//              if (Course.studentEnrollment.includes(uId)) {
//                  return res.status(200).json({
//                          success :false,
//                          message : "student already enrolled for this course"
//                  })
//              }
//          } catch (error) {
//              console.log(error);
//              console.error(error);
//              res.status(500).json({
//                 success :false,
//                 message : error.message
//              })
//          }

//          // creation of  order
//           const amount = Course.price;
//           const currency = "INR"
//           const options = {
//             amount : amount*100,
//             currency ,
//             reciept : Math.random(Date.now()).toString(),
//             notes : {
//                 userId ,
//                 courseId : course_id
//             }
//           }

//           try {
//              // Initiate payments By RazorPay (Order created)
//              const paymentResponse = await instance.orders.create(options);
//              console.log(paymentResponse);
//              res.status(200).json({
//                  success : true ,
//                  courseName : Course.courseName,
//                  description : Course.description,
//                  thumbnail : Course.thumbnail,
//                  orderId : paymentResponse.id,
//                  amount : paymentResponse.amount,
//                  currency : paymentResponse.currency,
//              })
//           } catch (error) {
//              console.log(error);
//              res.status(400).json({
//                   success : false,
//                   message : "Something went  wrong while creating Payment"
//              })
//           }
// }

// Verify signature ,   as verify the course will bought
// exports.verifySignature= async(req, res)=>{
//     const webhookSecret = "12345678";   // BE vala secret key
//     const signature = req.headers["x-razorpay-signature"];    // Signature/key from razorPay

//     // converting the wehook into (encrypted) signature
//     const shasum = crypto.createHmac("sha256" , webhookSecret); //HMAC-> hashed based message authentication code. createHmac() function return the HMAC object and it is the method for convereeting the i/p into Secure formate
//     shasum.update(JSON.stringify(req.body));  // It will convert the shashum Hmac objejt into string
//     const digest = shasum.digest("hex") ;  // Digest is a function that convert the i/p into headecimal key . When we aplly the hash function on any text or input , then ise es specific term se identify kiya jata hai i.e, known as "Digest"

//     // Matching the signature
//     if (digest === signature) {
//          console.log("Payment is authorized");
//          const{course_id , userId} = req.body.payload.payment.entity.notes;
//         // Now we have to give the courese to User and adding the userId into studentEnrolled array of Course
        
//         try {
//             // Make action

//             // find the course and enrolled init
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                                                             {_id : course_id},
//                                                             {
//                                                                 $push :{
//                                                                     studentEnrollment:userId 
//                                                                 }
//                                                             },{new : true}
//             );
//             if (!enrolledCourse) {
//                 return res.status(400).json({
//                     success:false,
//                     message :"Course not found"
//                 })
//             }

//             //Find the Student and addd the course into their courses list
//             const enrolledStuden = await User.findByIdAndUpdate({_id : userId },
//                                                                 {$push:{
//                                                                      courses : course_id
//                                                                 }},{new :true}
//             );
//          console.log(enrolledStuden);

//          // Now mail send kro Userr ko , PENDING HAI...
//          const mailrrespone = mailSender( enrolledStuden.email , "Conrajulation from codeHelp" , "You are enrolled in new student" ) // Yaha hume mail send krana hai PENDING HAI

//          return res.status(200).json({
//             success : true,
//             message : "Hey you are succesfully Enrolled in new course  and signature verified"
//          })

//         } catch (error) {
//              return res.status(400).json({
//                  success:false,
//                  message :"Signature is not verified"
//              })

//         }
//     }
//     else{
//         return res.status(404).jaon({
//             success : false,
//             message : "Invalid request"
//         })
//     }

// }
 