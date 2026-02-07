const mongoose=require("mongoose")


function ConnectTOdb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DATBASE IS CONNECTED")
    )
}

module.exports=ConnectTOdb