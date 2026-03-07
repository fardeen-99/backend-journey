const redis=require("../config/Cache")
const jwt=require("jsonwebtoken")

async function Identifier(req,res,next){

    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }

const IsBlacklist=await redis.get(token)

if(IsBlacklist){
    return res.status(401).json({
        message:"invalid Credentials"
    })
}

let decoded;

try {
    
decoded=jwt.verify(token,process.env.JWT_SECRET)

} catch (error) {
      return res.status(401).json({
        message:"invalid Credentials"
    })
}

req.user=decoded
next()

}

module.exports=Identifier