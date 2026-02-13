const express=require("express")
  const jwt=require("jsonwebtoken")
const postRouter=express.Router()
const model=require("../models/post.model")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")

const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})


const image = new ImageKit({
  privateKey:"private_8xoNZmFx5vHtoHsbTFvyTqNIdQQ="
  
})

postRouter.post("/",upload.single("file"),async(req,res)=>{

const token=req.cookies.token

if(!token){
 return res.status(401).json({
    message:"token not found"
  })
}

let decode=null

try {
  decode=jwt.verify(token,process.env.JWT_SECRET)
} catch (error) {
 return res.status(401).json({
    message:"your token is not verified"
  })
}


const file=await image.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName: req.file.originalname,
    folder:"insta-clone"
   
})

console.log(req.body,req.file)

const post=await model.create({
  caption:req.body.caption,
  picture_url:file.url,
  user:decode.id
})

res.status(200).json({
  message:"file uploaded successfully",
  post
})

})



module.exports=postRouter