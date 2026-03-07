const express=require("express")

const authRoute=express.Router()
const Controller=require('../controllers/auth.controller')
const Identifier=require("../Middleware/aurh.middleware")


authRoute.post("/login",Controller.Login)
authRoute.post("/register",Controller.Register)
authRoute.get("/Logout",Identifier,Controller.Logout)
authRoute.get("/getme",Identifier,Controller.Getme)





module.exports=authRoute