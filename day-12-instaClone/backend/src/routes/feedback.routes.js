const express=require("express")
const identify=require("../middlewares/auth.middleware")
const feedbackmodel=require("../models/Feedback.model")
const feedbackRouter=express.Router()


feedbackRouter.post("/",identify,async(req,res)=>{
    const{name,feedback}=req.body

const id=req.user.id

 await feedbackmodel.create({
name,feedback,user:id
})

res.status(200).json({
    message:"feedback registered"
})


})


module.exports=feedbackRouter