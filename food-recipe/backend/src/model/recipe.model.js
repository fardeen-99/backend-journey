const mongoose=require("mongoose")


const recipeSchema=new mongoose.Schema({

image:{
    type:String,
    required:true
},
ingredients:{
    type:String,
    required:true
},
recipe:{
    type:String,
    required:true
},
chef:{
    type:String,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId
    ,ref:"user"
    ,required:true
}

})

const model=mongoose.model("recipe",recipeSchema)

module.exports=model


