const mongoose=require("mongoose")


function ConnectTOdb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Database is Connected")
    )
}


module.exports=ConnectTOdb