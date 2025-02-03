
exports.chatResponser = async(req,res)=>{
    console.log("Welcome to chat ")
      try {
           let {question} = req.body;
           console.log("Woestion ",question)
           question = question ? question.trim() : "";
           if(!question || question.trim() === ""){
             return res.status(404).json({
                   success:false,
                   message : "Question is required"
             })
           }  
               
            let answer = [];
            if (question == "I am a Student" || question === "I am a Parent") {
                answer = [{
                    heading: "How may I help you today?",
                    option: ["Buy a Course&", "Product Demo&", "Course FAQ's&", "Ask a Doubt&"]
                }];
            } else if (question === "Buy a Course") {
                answer = [{
                    heading: "Become lifelong learners with India’s best teachers, engaging video lessons and personalised learning journeys...",
                    option: [
                        "Web Development&",
                        "AI/ML&",
                        "DevOps&",
                        "Python&",
                        "App Development&"
                    ]
                }];
            } else if (question === "Product Demo") {
                answer = [{
                    heading: "Please select your Class/Course from the options below.",
                    option: [
                        "Web Development &https://www.youtube.com/watch?v=F4Yn1S7TFmk",
                        "AI/ML &https://www.youtube.com/watch?v=F4Yn1S7TFmk",
                        "DevOps &https://www.youtube.com/watch?v=F4Yn1S7TFmk",
                        "Python &https://www.youtube.com/watch?v=F4Yn1S7TFmk"
                    ]
                }];
                
            } else if (question == "Course FAQ's" || question == "Ask a Doubt") {
                answer = [{
                    heading: "Our agents are currently away. But we’d love to catch-up.",
                    option: ["Our agents are currently away. But we’d love to catch-up. Please leave a message with your name and contact number. We’ll follow-up at the earliest.&"]
                }];
            } else if(question == "Default_Question" ){
                answer = [{
                    heading: "Thanks for being here today👍",
                    option: [""] 
                }];
            } 
            else {    
                answer = [{
                    heading: "Are you a student or a parent?",
                    option: ["I am a Student&", "I am a Parent&"]
                }];
            }
             return res.status(200).json({
                success :true,
                answer
             });

      } catch (error) {
        console.log("error during responsing chat" ,error);
        return res.status(400).json({
            success :false,
            message :error.message
         });

      }
}


// exports.chatResponser = async (req, res) => {
//     try {
//         const { question } = req.body;

//         if (!question || question.trim() === "") {
//             return res.status(404).json({
//                 success: false,
//                 message: "Question is required",
//             });
//         }

//         let answer = [];

//         if (question === "I am a Student" || question === "I am a Parent") {
//             answer = [
//                 "How may I help you today?",
//                 "Option 1: Buy a Course",
//                 "Option 2: Product Demo",
//                 "Option 3: Course FAQ's",
//                 "Option 4: Ask a Doubt",
//             ];
//         } else if (question === "Buy a Course") {
//             answer = [
//                 "Become lifelong learners with India’s best teachers...",
//                 "Option 1: Web Development",
//                 "Option 2: AI/ML",
//                 "Option 3: DevOps",
//             ];
//         } else {
//             answer = ["I'm sorry, I didn't understand your question. Please try again."];
//         }

//         return res.status(200).json({ success: true, answer });
//     } catch (error) {
//         console.error("Error responding to chat:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

