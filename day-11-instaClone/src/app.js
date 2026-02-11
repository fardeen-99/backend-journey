const express=require("express")

require("dotenv").config()
const cookie=require("cookie-parser")
const app=express()
app.use(cookie())
const authRouter=require("./routes/auth.routes")

app.use(express.json())
app.use("/api/auth",authRouter)




module.exports=app