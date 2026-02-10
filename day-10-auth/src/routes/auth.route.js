const express=require("express")

const router=express.Router()

const jwt=require('jsonwebtoken')

const crypto=require("crypto")

const model=require("../model/note.mode")

router.post("/register",async(req,res)=>{

    const {name,email,password}=req.body

  const IsUserAlreadyExist=await model.findOne({email})

  if(IsUserAlreadyExist){
   return res.status(409).json({
    message:"this user is already exist"
   })
  }
const hash=crypto.createHash("md5").update(password).digest("hex")
 const user= await model.create({
    name,email,password:hash
  })

const token=jwt.sign({
    id:user._id
},process.env.JWTSIGN,{expiresIn:"1h"})

res.cookie("token",token)

res.status(201).json({
    message:"registeration done"
    ,user
})


})

router.get("/get-in",async(req,res)=>{

const cookie=req.cookies.token
if(!cookie){
   return res.status(401).json({
        message:"your cookie not found login again"
    })
}
const decode=jwt.verify(cookie,process.env.JWTSIGN)

const user=await model.findById(decode.id)

res.status(200).json({
    name:user.name,
    email:user.email
})

})


router.post("/login",async(req,res)=>{

const {password,email}=req.body

const user=await model.findOne({email})

if(!user){
    return res.status(401).json({
        message:"your account not exist Register first"
    })
}
const hash=crypto.createHash("md5").update(password).digest("hex")

const passwordcheck=user.password===hash

if(!passwordcheck){
    return res.status(401).json({
        message:"your password is wrong"
    })
}

const token=jwt.sign({
id:user._id
},process.env.JWTSIGN,{expiresIn:"1h"})

res.cookie("token",token)

res.status(200).json({
    message:"login succesfully"
})


})



module.exports=router

