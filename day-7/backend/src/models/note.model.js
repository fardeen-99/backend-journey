const mongoose=require("mongoose")


const notes = new mongoose.Schema({
    title:String,
    description:String
})

const model=mongoose.model("/notes",notes)

module.exports=model