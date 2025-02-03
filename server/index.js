const express = require("express");
const app = express();
require("dotenv").config();

const cookieParser =require("cookie-parser");
const cors =require("cors");
const FileUpload = require("express-fileupload");

const {cloudinaryConnect} = require("./configs/Cloudinary");
const {connection} = require("./configs/database");

const UserRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentsRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/course");
const chatRoutes = require("./routes/chat");

const PORT = process.env.PORT || 4000;

// middlreware
app.use(express());
app.use(express.json());
app.use(cookieParser());
app.use( cors({
         origin : "http://localhost:3000",
         credentials:true
}))
   
app.use(
    FileUpload({
        useTempFiles : true,
        tempFileDir : "/temp"
    })
)
// Cloudinary connection
cloudinaryConnect();
// DB connection
connection();

// Mounting 
app.use("/api/V1/profile" , profileRoutes );
app.use("/api/V1/auth" , UserRoutes );
app.use("/api/V1/Course" ,courseRoutes );
app.use("/api/V1/Payments" ,paymentsRoutes );
app.use("/api/V1/chat", chatRoutes);

app.listen(PORT,()=>{
    console.log(`Server is activaated at ${PORT}`);
} )

///Default routes
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running..."
    });
});
  


// Make a logic for creating the course in diff diff state means , approved state , pending state ,pblished state me ahi
// And  course will go in published state when user has  atleast one Admin approval










/*
-----------------------------
Named Export and Import:-
---------------------------

            export const otpTemplate = (otp) => {
                // Function implementation
            };

            // AnotherFile.js
            import { otpTemplate } from './otpTemplate';

-----------------------------
Default Export and Import:-
-------------------------------
          
            // otpTemplate.js
            const otpTemplate = (otp) => {
                // Function implementation
            };
            export default otpTemplate;

            // AnotherFile.js
            import otpTemplate from './otpTemplate';
*/