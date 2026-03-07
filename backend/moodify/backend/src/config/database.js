const mongoose=require("mongoose")

async function ConnectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("YOUR DATABSE IS CONNECTED")
}

module.exports=ConnectDB