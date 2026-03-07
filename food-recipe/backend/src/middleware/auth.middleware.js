const jwt=require("jsonwebtoken")

const Identifier=async(req,res,next)=>{
    const token=req.cookies.token

if(!token){
    return res.status(401).json({
        message:"unAuthorize access"
    })
}

let decode;

try {
   decode=jwt.verify(token,process.env.JWT_SECRET)
    
} catch (error) {
        return res.status(401).json({
        message:"invalid token"
    })
}

req.user=decode
next()

}


module.exports=Identifier