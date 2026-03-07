require("dotenv").config()

const express=require("express")
const authRoute=require("./routes/auth.routes")
const cookie=require("cookie-parser")
const cors=require("cors")


const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use(express.json())


app.use("/api/auth",authRoute)




module.exports=app