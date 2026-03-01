const jwt=require('jsonwebtoken')
const ImageKit=require("@imagekit/nodejs")
const postModel=require("../models/post.model")
const likemodel=require("../models/like.model")
const followmodel=require("../models/follow.model")
const CommentModel=require("../models/comment.model")
const savemodel=require('../models/save.model')
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
mediatype:userpost.fileType,
user:req.user.id
})

console.log(userpost)


res.status(200).json({
    message:"post created succesfully"
,posts
})

}

const GetPost=async(req,res)=>{

const allpost=await postModel.find().populate("user","-password").lean()

const final=await Promise.all(allpost.map(async(item)=>{

 const response=await likemodel.findOne({
    post:item._id,
    user:req.user.id
 })

 item.islike = !!response

const followres=await followmodel.findOne({
    follower:req.user.id,
    followee:item.user._id
})

item.isfollow=!!followres


const save=await savemodel.findOne({

    post:item._id,
    user:req.user.id
})

item.save=!!save

const likecount=await likemodel.countDocuments({
    post:item._id
})

item.likecount=likecount


 return item




}))


// console.log(final)
res.status(200).json({
    message:"user all post",
    final
})




}

const GetDetailPost=async(req,res)=>{


const id=req.params.id

const detailpost=await postModel.findById(id).populate("user","-password").lean()

const postUserId = detailpost._id.toString()
console.log(postUserId)
// console.log(decoded.id)
const verification=await id===postUserId



if(!verification){
    return res.status(403).json({
        message:"forbidden the data"
    })
}

const likecount=await likemodel.countDocuments({
    post:id
})
detailpost.likecount=likecount


const savecount=await savemodel.countDocuments({
    post:id
})
detailpost.savecount=savecount

const commentcount=await CommentModel.countDocuments({
    post:id
})
detailpost.commentcount=commentcount

const comment=await CommentModel.find({post:id})
detailpost.comment=comment


console.log(detailpost)
res.status(200).json({
    message:"your detail post data",
    detailpost
})

}

const LikePost=async(req,res)=>{
const user=req.user.id
const post=req.params.id

if(!post){
    return res.status(404).json({
        message:"post not found"
    })
}

const islike=await likemodel.findOne({
    user,
    post
})

if(islike){
    return res.status(400).json({
        message:"you already like this post"
    })
}

const like=await likemodel.create({
    user,
    post
})

res.status(200).json({
    message:"like done successfully",
    like
})

    
}


const Comment=async(req,res)=>{

const {comment}=req.body

const user=req.user.id
const post=req.params.id


if(!post){
    return res.status(404).json({
        message:"post not found"
    })
}

const Usercoment=await CommentModel.create({
    user,post,comment
})

res.status(201).json({
    message:"your comment is registered succesfully"
    ,Usercoment
})


}

const unLikePost=async(req,res)=>{

const post=await likemodel.findOne({
    user:req.user.id,
    post:req.params.id
})
if(!post){
    return res.status(404).json({
        message:"post not found"
    })
}

const response=await likemodel.findByIdAndDelete(post._id)

res.status(200).json({
    message:"post disliked"
})




}


const saver=async(req,res)=>{

const save=await savemodel.findOne({
    post:req.params.id
    ,user:req.user.id
})

if(save){
    return res.status(409).json({
        message:"this post is already saved"
    })
}

const response=await savemodel.create({
     post:req.params.id
    ,user:req.user.id
})

res.status(200).json({
        message:"post is saved",
        response
    })
}
const unsaver=async(req,res)=>{

const save=await savemodel.findOne({
    post:req.params.id
    ,user:req.user.id
})

if(!save){
    return res.status(404).json({
        message:"this post is not found for save"
    })
}

const response=await savemodel.findByIdAndDelete(save._id)

res.status(200).json({
        message:"post is unsaved",
        response
    })
}

module.exports={PostRoute,GetPost,GetDetailPost,LikePost,Comment,unLikePost,saver,unsaver}