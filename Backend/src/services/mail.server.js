import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
service:"gmail",
  auth:{
user:process.env.GOOGLE_USER,
pass:process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false 
  },
})

transporter.verify()
.then(()=>{console.log("Password transpoter is ready to send email")})
.catch((err)=>{console.log("Password transporter verification failed",err)})


export async function sendMail({to,subject,html,text}){
  const mailOption = {
    from: process.env.GOOGLE_USER,
to,subject,html,text
  }

  const details = await transporter.sendMail(mailOption);
  console.log("Email sent successfully:", details.messageId);
  return details;
} 


