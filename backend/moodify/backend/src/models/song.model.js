const mongoose=require("mongoose")

const SongSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    song_url:{
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
       enum:["happy","sad","surprised","neutral","defaulter"]
        },
    image_url:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true})

const Song=mongoose.model("Song",SongSchema)

module.exports=Song


