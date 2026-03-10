require("dotenv").config()

const express=require("express")
const authRoute=require("./routes/auth.routes")
const cookie=require("cookie-parser")
const cors=require("cors")
const songRoute=require("./routes/song.routes")

const app=express()
app.use(cors())

app.use(cookie())
app.use(express.json())

app.use(express.static("public"))

app.use("/api/auth",authRoute)
app.use("/api/song",songRoute)


const path=require("path")

app.get("*Name",(req,res)=>{
    res.sendFile(path(__dirname,"..","/public/index.html"))
})

module.exports=app