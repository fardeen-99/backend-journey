import { handleSendMail } from "../services/mail.service.js";

import jwt from "jsonwebtoken";
import usermodel from "../models/user.model.js";
export const register = async (req, res) => {

    const { username, email, password } = req.body;

    const user = await usermodel.findOne({
        $or: [{ email }, { username }]
    })

    if (user) {
        return res.status(400).json({
            message: "User already exists",
            success: false,
            err: "User already exists"
        })
    }

    const newUser = await usermodel.create({
        username,
        email,
        password,
        verified: true,
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token)

    // await handleSendMail({
    //     to:email,
    //     subject:"Welcome to our platform Khanplexity",
    //     html:`
    //     <h1>Welcome ${username}</h1>
    //     <p>Thank you for registering on our platform <strong>Khanplexity</strong>. You can now login to your account.</p>
    //     <a href="http://localhost:3000/api/auth/mail-verify/${email}">Click here to verify your email</a>
    //     <p>Regards,</p>
    //     <p>Khanplexity Team</p>
    //     `,
    // })

    // res.send("Registration successful")


    res.status(200).json({
        message: "Registration successful",
        user: {
            username: newUser.username,
            email: newUser.email,
            verified: newUser.verified,
        },
        success: true,
    })
}


export const mailVerify = async (req, res) => {
    const { email } = req.params;

    const user = await usermodel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "invalid credentials",
            success: false,
            err: "User not found"
        })
    }

    if (user.verified) {

        const file = `
<h1>User already verified</h1>
<p>You can login to your account</p>
<a href="http://localhost:3000/api/auth/login">Click here to login</a>
<p>Regards,</p>
<p>Khanplexity Team</p>
`
        res.set("Content-Type", "text/html");
        res.send(file);

        return res.status(400).json({
            message: "User already verified",
            success: false,
            err: "User already verified"
        })
    }

    user.verified = true;
    await user.save();

    const file = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verified</title>
<style>
body{
    margin:0;
    padding:0;
    background:#f4f6fb;
    font-family: Arial, Helvetica, sans-serif;
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
}

.container{
    background:white;
    padding:40px;
    border-radius:12px;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,0.1);
    max-width:420px;
    width:100%;
}

.icon{
    font-size:60px;
    margin-bottom:15px;
}

h1{
    margin-bottom:10px;
    color:#333;
}

p{
    color:#666;
    margin-bottom:25px;
}

.btn{
    text-decoration:none;
    background:#4f46e5;
    color:white;
    padding:12px 25px;
    border-radius:8px;
    font-weight:bold;
    display:inline-block;
}

.btn:hover{
    background:#4338ca;
}
</style>
</head>

<body>

<div class="container">

<div class="icon">✅</div>

<h1>Email Verified Successfully</h1>

<p>Your account has been verified. You can now login to your account.</p>

<a class="btn" href="http://localhost:5173/login">
Login to your account
</a>

</div>

</body>
</html>
`
    res.set("Content-Type", "text/html");
    res.send(file);

}

export const login = async (req, res) => {
    const { email, password } = req.body;
console.log(email,password)
    const user = await usermodel.findOne({email})

    if (!user) {
        return res.status(400).json({
            message: "invalid credentials",
            success: false,
            err: "User not found"
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            message: "User not verified",
            success: false,
            err: "User not verified"
        })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(400).json({
            message: "invalid credentials",
            success: false,
            err: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token)

    res.json({
        message: "Login successful",
        success: true,
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified,
        }
    })
}

export const logout = async (req, res) => {
    res.clearCookie("token");

    res.json({
        message: "Logout successful",
        success: true,
    });
}

export const Getme = async (req, res) => {

    const user = await usermodel.findById(req.user.id).select("-password")

    if (!user) {
        return res.status(400).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.json({
        message: "User found",
        success: true,
        user
    })

}

export const resendMail = async (req, res) => {
    const { email } = req.body
    const user = await usermodel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }
    if (user.verified) {
        return res.status(400).json({
            message: "User already verified",
            success: false,
            err: "User already verified"
        })
    }
    await handleSendMail({
        to: email,
        subject: "Welcome to our platform Khanplexity",
        html: `
        <h1>Welcome ${user.username}</h1>
        <p>Thank you for registering on our platform <strong>Khanplexity</strong>. You can now login to your account.</p>
        <a href="http://localhost:3000/api/auth/mail-verify/${email}">Click here to verify your email</a>
        <p>Regards,</p>
        <p>Khanplexity Team</p>
        `,
    })
    res.json({
        message: "Mail sent successfully",
        success: true,
    })

}
