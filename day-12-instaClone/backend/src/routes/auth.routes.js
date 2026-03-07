const express=require("express")
const IdentifyToken=require("../middlewares/auth.middleware")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const authRouter=express.Router()
const {Register,Login,Logout,Getme,Update}=require("../controllers/user.controller")

authRouter.post("/register",upload.single("file"),Register)
authRouter.post("/login",upload.single("file"),Login)
authRouter.post("/logout",Logout)
authRouter.get("/get-me",IdentifyToken,Getme)
authRouter.put("/update/:id",upload.single("file"),IdentifyToken,Update)




module.exports=authRouter