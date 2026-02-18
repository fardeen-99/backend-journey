const mongoose=require("mongoose")

const likeSchema=new mongoose.Schema({
    
    user:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    },
  
},{
    timestamps:true
})

likeSchema.index({user:1,post:1},{unique:true})   

const likemodel=mongoose.model("like",likeSchema)

module.exports=likemodel