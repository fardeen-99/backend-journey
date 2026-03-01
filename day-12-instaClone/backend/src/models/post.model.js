const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
  default:""
    }
    ,
    post_url:{
type:String,
required:[true,"post is required"]
}
,
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"insta-user",
    required:[true,"user is required"],
    },
    mediatype:{
        type:String,
required:[true,"file is required"]
    }

})

const postmodel=mongoose.model("post",postSchema)


module.exports=postmodel