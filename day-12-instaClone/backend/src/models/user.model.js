const mongoose=require("mongoose")



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"this username is already exists"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"this email is already exists"]

    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    bio:String,
    
    profile_image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3wkBh42q4A0io62WEJtwLmWIrGpBmdV2ddw&s",
    }
})

const usermodel=mongoose.model("insta-user",userSchema)


module.exports=usermodel