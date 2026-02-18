const mongoose=require("mongoose")

const followSchema=new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"insta-user",
        required:true
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"insta-user",
        required:true
    },
})

followSchema.index({follower:1,followee:1},{unique:true})

const followmodel=mongoose.model("follow",followSchema)

module.exports=followmodel

