const followmodel=require("../models/follow.model")
const usermodel=require("../models/user.model")
const postmodel=require("../models/post.model")

const FollowRoute=async(req,res)=>{

const myId=req.user.id
const followee=req.params.id

const isExist=await usermodel.findById(followee)
if(!isExist){
    return res.status(404).json({
        message:"this user is not found"
    })
}


if(myId===followee){//400 --> bad request
    return res.status(400).json({
        message:"you cannot follow yourself"
    })
}

const IsAlreadyFollow=await followmodel.findOne({
    follower:myId,
    followee
})
if(IsAlreadyFollow){
    return res.status(200).json({
        message:`you already follow ${followee}`
    })
}


const userFollow=await followmodel.create({
    follower:myId,
    followee,
   
})

res.status(201).json({
    message:"you follow"+followee,
    userFollow
})

}

const AcceptRoute=async(req,res)=>{

    const myId=req.user.id
    const follower=req.params.id  // samne wala jo req bhejra hai

const request=await followmodel.findOne({
    follower:follower,
    followee:myId,
    status:"pending"
})
if(!request){
    return res.status(404).json({
        message:"request not found"
    })
}
let status="accepted"

request.status=status
await request.save()

res.status(200).json({
message:"your request is accepted",
request
})

}
const Reject=async(req,res)=>{

const myid=req.user.id
const follower=req.params.id

const request=await followmodel.findOne({
    follower,
    followee:myid
})

if(!request){
    res.status(404).json({
        message:"request not found"
    })
}

const final=await followmodel.findByIdAndDelete(request._id)

res.status(200).json({
    message:"reqest rejected"
    ,final
})


}

const UnfollowRoute=async(req,res)=>{

const myid=req.user.id
const followee=req.params.id

console.log(myid,followee)
const request=await followmodel.findOne({
    follower:myid,
    followee,
})
// console.log(request.follower,request.followee)

if(!request){

    return res.status(404).json({
        message:"this follower not found"
    })
}

const final=await followmodel.findByIdAndDelete(request._id)

res.status(200).json({
    message:"unfollowed "+followee
    ,final
})


}

const StoryRoute=async(req,res)=>{

const userFound=await usermodel.find().lean()


const user=await Promise.all(userFound.map(async(item)=>{
    const isfollow=await followmodel.findOne({
        follower:req.user.id,
        followee:item._id
    })

    item.isfollowing=!!isfollow
    return item
}    )
)


res.status(200).json({
    message:"story",
    user
})

}

const PersonProfile=async(req,res)=>{
    const id=req.params.id

    const post=await postmodel.find({
        user:id
    })

    const user=await usermodel.findById(id)
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
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

    const userfollow=await followmodel.findOne({
        follower:req.user.id,
        followee:id
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
            postcount,
            post,
            userfollow: !! userfollow
        }
    })
}



module.exports={FollowRoute,AcceptRoute,Reject,UnfollowRoute,StoryRoute,PersonProfile}