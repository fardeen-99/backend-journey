const usermodel=require("../models/user.model")
const followmodel=require("../models/follow.model")
const postmodel=require("../models/post.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Register=async(req,res)=>{
    const {username,email,password,bio,profile_image}=req.body

   const ISUSERALREADYEXIST = await usermodel.findOne({
        $or:[
            {
                username
            },{
                email
            }
        ]
    })


if(ISUSERALREADYEXIST){
    return res.status(409).json({
        message:"this user already exist"
    })
}

const hash=await bcrypt.hash(password,10)
const user=await usermodel.create({
    username,email,bio,profile_image,password:hash
})

const token= jwt.sign({
    id:user._id,username:user.username
},process.env.JWT_SECRET,{expiresIn:"1d"})

res.cookie("token",token,{
 httpOnly: true,
  sameSite: "lax",   // strict mat rakho abhi
  secure: false    
})

res.status(201).json({
    message:"your registeration successfully done...",
    user:{
email:user.email,
username:user.username,
bio:user.bio,
profile_image:user.profile_image,
id:user._id
    }
})
} 



const Login=async(req,res)=>{

const {email,username,password}=req.body


const user=await usermodel.findOne({
    $or:[{

        username:username || null
    },{
email:email || null
    }]
})

if(!user){
    return res.status(401).json({
        message:"this user not exist"
    })
}

const hash=await bcrypt.compare(password,user.password)

if(!hash){
    return res.status(401).json({
        message:"your password is incorrect"
    })
}

const token=jwt.sign({
    id:user._id,username:user.username
},process.env.JWT_SECRET,{expiresIn:"1d"})


res.cookie("token",token,{
 httpOnly: true,
  sameSite: "lax",   // strict mat rakho abhi
  secure: false    
})

res.status(200).json({
    message:"your login done succesfully"
    , user:{
email:user.email,
username:user.username,
bio:user.bio,
profile_image:user.profile_image,
id:user._id
    }
})

}

const Logout=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"logout successfully"
    })

}
const Getme=async(req,res)=>{

  const id=req.user.id

 const user= await usermodel.findById(id)

 if(!user){
    return res.status(401).json(
        {message:"unAuthorized access"}
    )
 }

const follower=await followmodel.countDocuments({
    followee:id
})
const following=await followmodel.countDocuments({
    follower:id
})

const postcount=await postmodel.countDocuments({
    user:id
})
 res.status(200).json({
    user:{
email:user.email,
username:user.username,
bio:user.bio,
profile_image:user.profile_image,
id:user._id,
follower,
following,
postcount
    }
 })



}

module.exports={Register,Login,Logout,Getme}
