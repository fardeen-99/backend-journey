const mongoose=require("mongoose")

async function ConnectDb(){
    
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("your database is connected")
    )

}

module.exports=ConnectDb