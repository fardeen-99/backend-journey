const express=require("express")

const app=express()
const cookie=require("cookie-parser")
const router=require("./routes/auth.route")

require("dotenv").config()
app.use(express.json())
app.use(cookie())
app.use("/api/auth",router)

module.exports=app