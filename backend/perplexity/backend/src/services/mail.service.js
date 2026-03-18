import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"oauth2",
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN, 
    }
})

export const handleSendMail=async({to,subject,html})=>{

const mailOptions={
    from:process.env.GOOGLE_USER,
    to,
    subject,
    html,

    
}
const result=await transporter.sendMail(mailOptions)
console.log("mail sent successfully",result)
return "mail sent successfully to: "+to 
}