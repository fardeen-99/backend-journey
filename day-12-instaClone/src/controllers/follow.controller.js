const followmodel=require("../models/follow.model")
const usermodel=require("../models/user.model")

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

const request=await followmodel.findOne({
    follower:myid,
    followee,
})

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


module.exports={FollowRoute,AcceptRoute,Reject,UnfollowRoute}