const mongoose=require("mongoose")

const usernote=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"already exist"],
    },
    password:String
})

const model=mongoose.model("note",usernote)

module.exports=model