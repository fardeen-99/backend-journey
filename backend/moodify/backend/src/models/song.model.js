const mongoose=require("mongoose")

const SongSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    Song_url:{
        type:String,
        required:true
    },
    album:{
        type:String,
        required:true
    },
    mood:{
        type:String,
       default:"neutral",
       enum:["happy","sad","surprised","neutral"]
        },
    image_url:{
        type:String,
        required:true
    }

},{timestamps:true})

const Song=mongoose.model("Song",SongSchema)

module.exports=Song


