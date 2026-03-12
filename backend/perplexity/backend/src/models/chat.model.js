import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    

},{timestamps:true});


export default mongoose.model("Chat", chatSchema);