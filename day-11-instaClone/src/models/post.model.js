const mongoose=require("mongoose")

const postschema = new mongoose.Schema({

caption:{
    type:String,
    default:"",
},
post_url:{
    type:String,
    required:[true,"profile picture is required"]
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:[true,"profile_name is required"]
}

})

const postmodel=mongoose.model("post",postschema)