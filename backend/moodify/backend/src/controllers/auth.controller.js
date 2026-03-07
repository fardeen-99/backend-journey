const usermodel=require("../models/auth.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const redis=require("../config/Cache")


async function Login(req,res) {
    
const {username,email,password}=req.body

const isexist=await usermodel.findOne({
    $or:[{
        username:username || null
    },{
        email:email || null
    }]
})

if(!isexist){
return res.status(400).json({
    message:"invalid credentialssssssssssssss"
})

}
const hash=await bcrypt.compare(password,isexist.password)

if(!hash){
    
    return res.status(400).json({
        message:"invalid credentials"
    })
}


const token=jwt.sign({
    id:isexist._id
},process.env.JWT_SECRET,{expiresIn:"3d"})


res.cookie("token",token)
isexist.password = undefined
res.status(200).json({
    message:"Your login successfully done",
    user:isexist
})


}


const Register=async(req,res)=>{

const {username,password,email}=req.body


const isexist=await usermodel.findOne({
    $or:[
        {
            username
        },
        {
            email
        }
    ]
})


if(isexist){
    return res.status(409).json({
        message:"This User already Exist"
    })
}

const hash=await bcrypt.hash(password,10)

const user=await usermodel.create({
    email,username,password:hash
})

const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRET,{expiresIn:"3d"})


res.cookie("token",token)

user.password = undefined
res.status(201).json({
    message:"your registeration is done",
    user
})



}


async function Logout(req,res){
    
const token=req.cookies.token

    res.clearCookie("token")
    
    await redis.set(token,Date.now(),"EX",60*60)
    
    res.status(200).json({
    message:"Logout successful"
})
}


const Getme=async(req,res)=>{

    const user=await usermodel.findById(req.user.id)
    if(!user){
        return res.status(401).json({
            message:"invalid access"
        })
    }

  res.status(200).json({
    message:"your get me fetched succesfully",
    user
  })


    
}






module.exports={Login,Register,Logout,Getme}