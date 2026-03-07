const mongoose=require("mongoose")


const notes = new mongoose.Schema({
    title:String,
    description:String,
    photo:String
})

const model=mongoose.model("/notes",notes)

module.exports=model