const express=require("express")

const authRouter=express.Router()
const {registerRoute,loginRouter}=require("../controllers/auth.controller")

authRouter.post("/register",registerRoute)


authRouter.post("/login",loginRouter)


module.exports=authRouter