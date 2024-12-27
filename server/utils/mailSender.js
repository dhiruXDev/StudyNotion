// In thsi we will create a  pre-middleware for sending the OTP before creating a entry in Database (means storing the I/F of User in DB), Here their Defination is defined for Pre-Middleware  
const nodemailer = require("nodemailer");
async function mailSender(title , email , body){
          try {
             let trnasporter  = nodemailer.createTransport({
                 host : process.env.MAIL_HOST,
                 port: 587, // Typically 587 for TLS or 465 for SSL
                 secure: false, // true for 465, false for other ports
                 auth:{
                     user : process.env.MAIL_USER,
                     pass :process.env.MAIL_PASS
                 }
             });

             let response = await trnasporter.sendMail({
               from :`"StudyNotion"<dhirajk22410@gmail.com>`,
               to :`${email}`,
               subject : `${title}`,
               html : body 
             })
              console.log(response);
              return response;

          } catch (error) {
             console.log(error);
             throw error;
          }
}
module.exports =mailSender;