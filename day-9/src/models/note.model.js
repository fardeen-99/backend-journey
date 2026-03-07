const mongoose=require("mongoose")

const registernote=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"this email is Already registered"]
    },
    password:String

})


const model=mongoose.model("register",registernote)

module.exports=model


