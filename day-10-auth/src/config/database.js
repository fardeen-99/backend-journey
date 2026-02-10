const mongoose=require("mongoose")

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("your database is Connected");
        
    })
}
module.exports=ConnectDB