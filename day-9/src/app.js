const express=require("express")

const app=express()

app.use(express.json())
require("dotenv").config()

const authrouter=require("../src/routes/auth.routes")


app.use("/api/auth",authrouter)



module.exports=app