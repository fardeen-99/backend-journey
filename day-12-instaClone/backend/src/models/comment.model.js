const mongoose=require("mongoose")


const CommentSchema=new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"insta-user"
},
post:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"post"
},
comment:{
type:String,
required:true
}


},{timestamps:true})


CommentSchema.index({post:1})

const commentModel=mongoose.model("comment",CommentSchema)


module.exports=commentModel