const usermodel=require("../model/auth.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const Register=async(req,res)=>{

const {username,email,password}=req.body

const userExist=await usermodel.findOne({

 $or:[
    {
username
    },
    {
email
    }
 ]

})

if(userExist){
    return res.status(409).json({
        message:"this user already exist"
    })
}

const hash=await bcrypt.hash(password,10)

const user=await usermodel.create({
    username,email,password:hash
})

const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRET,{expiresIn:"1d"})

res.cookie("token",token)

res.status(201).json({
    message:"your registeration is done"
    ,user:{
username:user.username,
email:user.email
    }
})

}

const Login=async(req,res)=>{

const {email,username,password}=req.body

const IsuserExist=await usermodel.findOne({

$or:[
    {
        username:username || null
    },{
        email:email || null

    }
]

})

if(!IsuserExist){
    return res.status(401).json({
        message:"this user not exist"
    })
}

  const checkPassword = await bcrypt.compare(
    password,
    IsuserExist.password
  );

  if (!checkPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }


  const token=jwt.sign({
    id:IsuserExist._id
  },process.env.JWT_SECRET,{expiresIn:"1d"})

  res.cookie("token",token)

  res.status(200).json({
    message:"your login successfully done"
    ,user:{
username:IsuserExist.username,
email:IsuserExist.email
    }
  })
}


    const Logout=async(req,res)=>{

    res.clearCookie("token")

    res.status(200).json({
        message:"your logout done"
    })


    }


    module.exports={Register,Login,Logout}