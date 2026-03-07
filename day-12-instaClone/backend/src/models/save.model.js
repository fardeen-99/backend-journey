const mongoose=require("mongoose")


const saveSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId
    ,    required:true
    },
    post:{
            type:mongoose.Schema.Types.ObjectId
    ,    required:true
    }

})

saveSchema.index({user:1,post:1},{unique:true})

const savemodel=mongoose.model("save",saveSchema)


module.exports=savemodel