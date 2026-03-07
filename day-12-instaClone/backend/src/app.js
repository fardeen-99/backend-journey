require("dotenv").config()
const express=require("express")
const authRouter=require("./routes/auth.routes")
const postRouter=require("./routes/post.routes")
const UserFollowRouter=require("./routes/user.routes")
const feedbackRouter=require("./routes/feedback.routes")
const cookie=require("cookie-parser")

const cors=require("cors")

const app=express()

app.use(cors({
credentials:true,
origin:"http://localhost:5173"
}))
app.use(cookie())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/user",UserFollowRouter)
app.use("/api/feedback",feedbackRouter)


module.exports=app