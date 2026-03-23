import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // 465 की जगह 587 आज़माएँ, यह अक्सर खुल जाता है
  secure: false, // 587 के लिए इसे false ही रखना होगा
  auth:{
user:process.env.GOOGLE_USER,
pass:process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false 
  },
  connectionTimeout: 40000, // थोड़ा ज्यादा समय दें (40 सेकंड)
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


