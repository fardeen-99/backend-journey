const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:String,
    description:String
})


const model = mongoose.model("notes",schema)


module.exports=model