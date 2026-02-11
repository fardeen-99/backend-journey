const mongoose=require("mongoose")


const userschema=new mongoose.Schema({
username:{
    type:String,
    unique:[true,"this username is already exist"],
    required:[true,"enter username first"]
},
email:{
    type:String,
    unique:[true,"this email is already exist"],
    required:[true,"enter the email field"]
},
password:{
    type:String,
    required:[true,"enter your password"]
},
bio:String,
profile_image:{
    type:String,
default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7GqiBKKu_loBW0mwbJw0VzhSlx7h5Oxds1g&s"
}

})

const model=mongoose.model("user",userschema)

module.exports=model