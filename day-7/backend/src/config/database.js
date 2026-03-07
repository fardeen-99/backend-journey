    const mongoose = require("mongoose")


    const ConnectTodb=async()=>{

    await mongoose.connect(process.env.MONGO_URI)

    console.log("DB is connected")
    }

    module.exports=ConnectTodb