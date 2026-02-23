const recipeModel=require("../model/recipe.model")
const jwt=require("jsonwebtoken")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const image=new ImageKit({
    privateKey:"private_8xoNZmFx5vHtoHsbTFvyTqNIdQQ="
})


const recipePost=async(req,res)=>{

const {ingredients,recipe,chef }=req.body

const id=req.user.id

const photo=await image.files.upload({
 file: await toFile(Buffer.from(req.file.buffer),'file'),
 fileName:'filename',
 folder:'recipe-photos'
})

const ing=ingredients.split(" ").join(" | ")

const final=await recipeModel.create({
ingredients:ing,recipe,chef,image:photo.url,user:id
})

res.status(201).json({
    message:"your recipe is created",
    final
})

}

const GetRecipes=async(req,res)=>{

    const recipes=await recipeModel.find({user:req.user.id})

    res.status(200).json({
        message:"your all recipes",
        recipes
    })

}
const GetSingleRecipe=async(req,res)=>{

    const single=await recipeModel.find({_id:req.params.id})

    res.status(200).json({
        message:"your all recipes",
        single
    })

}

const deleteRecipe=async(req,res)=>{

   const response= await recipeModel.findByIdAndDelete({_id:req.params.id})
res.status(200).json({
    message:"your recipe is deleted"
})

}

const updateRecipe=async(req,res)=>{
const {ingredients,recipe,chef }=req.body
   const response= await recipeModel.findByIdAndUpdate(req.params.id,{ingredients,recipe,chef})
   if(!response){
      return res.status(404).json({
           message:"recipe not found"
       })

   }
res.status(200).json({
    message:"your recipe is updated"
    ,response
})

}

module.exports={recipePost,GetRecipes,GetSingleRecipe,deleteRecipe,updateRecipe}