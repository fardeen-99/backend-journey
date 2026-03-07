const mongoose=require("mongoose")

const feedbackSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId
        ,ref:"insta-user",
        required:true
    },
    name:{
type:String,
required:true
    },
    feedback:{
type:String,
required:true
    }
})

const feedbackmodel= mongoose.model("feedback",feedbackSchema)

module.exports=feedbackmodel
