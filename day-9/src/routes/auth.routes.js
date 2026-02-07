const express=require("express")

const jwt=require("jsonwebtoken")
const model=require("../models/note.model")
    const authrouter=express.Router()

    require("cookie-parser")

    const crypto=require("crypto")

authrouter.post("/register",async(req,res)=>{

const{name,email,password}=req.body    

const isAlreadyExist=await model.findOne({email})

if(isAlreadyExist){
    return res.status(409).json({
        message:"this email is already exist"
    })
}
const hash=crypto.createHash("md5").update(password).digest("hex")

const user=await model.create({
    name,email,password:hash
})

const token=jwt.sign({
    id:user._id,
    email:user.email
},
process.env.JWT_SIGN
)

res.cookie("JWT_TOKEN",token)

res.status(201).json({
    message:"registeration Done"
,user,
token
})

})


//hash har baar same aayega agar hum same sentance dalenge tou but kabhi decode nhi hojeyga kis or se hash dalenge tou dusra hash ayega decode krkr abb hacker ke hath passwoord bhi lag jayegatou wo decode nahikr payega

authrouter.post("/login",async(req,res)=>{

const {email,password}=req.body


const user=await model.findOne({email})

if(!user){
    return res.status(404).json({
        message:"this email not exist register first"
    })
}

const hashpassword = crypto
  .createHash("md5")   // algorithm
  .update(password)    // data to hash
  .digest("hex");      // output format

const passwordcheck=user.password===hashpassword    //hash one sided hota hai usko decrypt nhi krskte

// 401 usehoti ai login fail/ auth fail/ password fail/

if(!passwordcheck){
    return res.send(401).json({
        message:"invalid try again"
    })
}
const token=jwt.sign({
id:user._id
},process.env.JWT_SIGN)

res.cookie("JWT_LOGIN",token)

res.status(200).json({
    message:"login succesfully",
    token
})


})



module.exports=authrouter