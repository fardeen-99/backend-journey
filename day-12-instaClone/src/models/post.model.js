const mongoose=require("mongoose")

const postschema=new mongoose.Schema({
    caption:{
        type:String,
        dafault:""
    },
    picture_url:{
        type:String,
        required:[true,"picture is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
         required:[true,"profile_name is required"]
    }

})

const postmodel=mongoose.model("post",postschema)

module.exports=postmodel