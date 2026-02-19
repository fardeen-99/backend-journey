const express=require("express")


const authRouter=express.Router()
const {Register,Login,Logout}=require("../controllers/user.controller")

authRouter.post("/register",Register)
authRouter.post("/login",Login)
authRouter.post("/logout",Logout)




module.exports=authRouter