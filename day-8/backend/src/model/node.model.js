const mongoose=require("mongoose")

const nodes=mongoose.Schema({
    title:String,
    description:String,
    photo:String
})

const model=mongoose.model("nodes",nodes)


module.exports=model