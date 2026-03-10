const express=require("express")
const Usermodel=require("./model/auth.model")
const Identifier=require("./middleware/auth.middleware")
const authRouter=require("./routes/auth.routes")
const recipeRouter=require("./routes/recipe.routes")
const cookieparser=require("cookie-parser")
const cors=require("cors")

const app=express()
require("dotenv").config()
app.use(cookieparser())
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:"https://food-recipe-web.onrender.com"
}))
app.use(express.static("public"))
app.use("/api/auth",authRouter)
app.use("/api/recipe",recipeRouter)

app.get("/getme",Identifier,async(req,res)=>{
    
    const user=await Usermodel.findById(req.user.id)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


})

const path=require("path")

app.get("*Name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})



module.exports=app