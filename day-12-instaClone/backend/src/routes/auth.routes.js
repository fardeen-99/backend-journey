const express=require("express")
const IdentifyToken=require("../middlewares/auth.middleware")

const authRouter=express.Router()
const {Register,Login,Logout,Getme}=require("../controllers/user.controller")

authRouter.post("/register",Register)
authRouter.post("/login",Login)
authRouter.post("/logout",Logout)
authRouter.get("/get-me",IdentifyToken,Getme)





module.exports=authRouter