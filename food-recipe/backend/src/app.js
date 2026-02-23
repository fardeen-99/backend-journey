const express=require("express")
const authRouter=require("./routes/auth.routes")
const recipeRouter=require("./routes/recipe.routes")
const cookieparser=require("cookie-parser")


const app=express()
require("dotenv").config()
app.use(cookieparser())
app.use(express.json())


app.use("/api/auth",authRouter)
app.use("/api/recipe",recipeRouter)




module.exports=app