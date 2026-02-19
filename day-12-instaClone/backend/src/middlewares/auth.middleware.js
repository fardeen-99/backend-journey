const jwt=require("jsonwebtoken")
const IdentifyToken=async(req,res,next)=>{

const token=req.cookies.token

if(!token){
    return res.status(401).json({
        message:"UnAuthorised Access"
    })
}

let decoded;


try {
    decoded=jwt.verify(token,process.env.JWT_SECRET)
} catch (error) {
    return res.status(401).json({
        message:"invalid Token"
    })
}

req.user=decoded
next()

    

}
module.exports=IdentifyToken