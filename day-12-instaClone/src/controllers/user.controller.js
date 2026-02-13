const model=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const Register=async(req,res)=>{

    

const {username,email,password,bio,profile_image}=req.body

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

const hash=await bcrypt.hash(password,10)
    const user=await model.create({
username,email,password:hash,bio,profile_image
    })


const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRET,{expiresIn:"1d"})

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


}


const Login=async(req,res)=>{

    const{username,email,password}=req.body

const user= await model.findOne({
        $or:[
            {
                username
            },
            {
                email
            }
        ]
    })
    if(!user){
 return   res.status(401).json({
        message:"this user not exist"
    })
    }

    const hash=await bcrypt.compare(password,user.password)
    if(!hash){
        return res.status(401).json({
            message:"password is not valid"
        }
        )
    }

   const token= jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})

res.cookie("token",token)

res.status(200).json({
    message:"your login done successfully......"
})

}

module.exports={Register,Login}