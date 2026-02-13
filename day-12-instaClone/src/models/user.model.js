const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({

username:{
    type:String,
    unique:[true,"this user name is already Exists"]
    ,required:[true,"required the username"]
},
email:{
type:String,
required:[true,"email is required"],
unique:[true,"this e-mail is already exist"]
},
password:{
    type:String,
    required:[true,"password is required"]
},
bio:{
    type:String
},
profile_image:{
    type:String,
dafault:"https://ik.imagekit.io/bwv6opokj/default-image.jpg?updatedAt=1770895873466"
}

})

const model=mongoose.model("user",userSchema)

module.exports=model