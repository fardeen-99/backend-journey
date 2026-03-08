require("dotenv").config()

const express=require("express")
const authRoute=require("./routes/auth.routes")
const cookie=require("cookie-parser")
const cors=require("cors")
const songRoute=require("./routes/song.routes")

const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookie())
app.use(express.json())


app.use("/api/auth",authRoute)
app.use("/api/song",songRoute)




module.exports=app