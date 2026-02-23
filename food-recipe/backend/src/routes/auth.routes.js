const express=require("express")
const authController=require("../controllers/user.controller")
const authRouter=express.Router()

authRouter.post("/register",authController.Register)
authRouter.post("/login",authController.Login)
authRouter.get("/logout",authController.Logout)






module.exports=authRouter