const express=require("express")

require("dotenv").config()
const cookie=require("cookie-parser")
const app=express()
app.use(cookie())
const authRouter=require("./routes/auth.routes")
const PostRouter=require("./routes/post.routes")

app.use(express.json())
app.use("/api/auth",authRouter)

app.use("/api/post",PostRouter)


module.exports=app