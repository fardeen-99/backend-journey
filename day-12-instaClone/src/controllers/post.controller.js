const jwt=require('jsonwebtoken')
const ImageKit=require("@imagekit/nodejs")
const postModel=require("../models/post.model")
const {toFile}=require("@imagekit/nodejs")
const image=new ImageKit({
    privateKey:"private_8xoNZmFx5vHtoHsbTFvyTqNIdQQ="
})

const PostRoute=async(req,res)=>{

// const token=req.cookies.token

// if(!token){
//     return res.status(404).json({
//         message:"token inValid"
//     })
// }

// const decoded=jwt.verify(token,process.env.JWT_SECRET)
console.log(req.file,req.body)

const userpost=await image.files.upload({
   file: await toFile(Buffer.from(req.file.buffer),'file'),
   fileName:req.body.caption,
   folder:"insta-clone-final"
})

const posts=await postModel.create({
caption:req.body.caption,
post_url:userpost.url,
user:req.user.id
})


res.status(200).json({
    message:"post created succesfully"
,posts
})

}

const GetPost=async(req,res)=>{

const allpost=await postModel.find({user:req.user.id})


res.status(200).json({
    message:"user all post",
    allpost
})





}

const GetDetailPost=async(req,res)=>{


const id=req.params.id

const detailpost=await postModel.findById(id)

const postUserId = detailpost._id.toString()
console.log(postUserId)
// console.log(decoded.id)
const verification=await id===postUserId

if(!verification){
    return res.status(403).json({
        message:"forbidden the data"
    })
}

res.status(200).json({
    message:"your detail post data",
    detailpost
})

}

module.exports={PostRoute,GetPost,GetDetailPost}