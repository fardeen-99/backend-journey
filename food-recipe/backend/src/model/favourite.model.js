const mongoose=require("mongoose")



const fvrtSchema=new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
dish:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"recipe",
    required:true
}


},{timestamps:true})

// fvrtSchema.index({user:1,dish:1},{unique:true})


const fvrtmodel= mongoose.model("fvrt",fvrtSchema)

module.exports=fvrtmodel