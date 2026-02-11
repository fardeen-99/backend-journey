const express=require("express")

const authRouter=express.Router()
const model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")

authRouter.post("/register",async(req,res)=>{

const {username,email,password,bio,profile_image} = req.body

const IsuserAlreadyExist=await model.findOne({

    $or:[
        {
            username:username
        },
{
    email:email
}
    ]
})

if(IsuserAlreadyExist){
  return  res.status(409).json({
        message:IsuserAlreadyExist.username===username?"this username is already exist":"this email is already exist"
    })
}
const hash=crypto.createHash("md5").update(password).digest("hex")
const user=await model.create({
    username,email,password:hash,bio,profile_image
})

const token=jwt.sign({
id:user._id
},process.env.JWTSIGN,{expiresIn:"1d"})

res.cookie("token",token)
res.send({
    message:"your registeration succesfully done....",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profile_image:user.profile_image
    }
})
})


authRouter.post("/login",async(req,res)=>{

 const {username,email,password}=req.body

 const user=await model.findOne({
    $or:[{
username:username
    },{
email:email
    }]
 })
 if(!user){
 return   res.status(401).json({
        message:"this user not exist"
    })
 }


const hash=crypto.createHash("md5").update(password).digest("hex")
if(user.password!==hash){
  return  res.status(401).json({
        message:"password is not correct"
    })
}

const token=jwt.sign({
    id:user._id
},process.env.JWTSIGN,{expiresIn:"1d"})
res.cookie("token",token)

res.send({
    message:"your login succesfully done...."
})

})


module.exports=authRouter