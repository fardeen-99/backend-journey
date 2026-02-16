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
    ref:"insta-users",
    required:[true,"user is required"],
    }

})

const postmodel=mongoose.model("post",postSchema)


module.exports=postmodel