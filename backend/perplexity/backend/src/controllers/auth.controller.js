import { handleSendMail } from "../services/mail.service.js";

export const register = async (req, res) => {

const {username, email, password} = req.body;

await handleSendMail({
    to:email,
    subject:"Welcome to our platform Khanplexity",
    html:`
    <h1>Welcome ${username}</h1>
    <p>Thank you for registering on our platform <strong>Khanplexity</strong>. You can now login to your account.</p>
    <p>Regards,</p>
    <p>Khanplexity Team</p>
    `,
})

res.send("Registration successful")
}