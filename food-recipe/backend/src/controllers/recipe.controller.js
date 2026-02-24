const recipeModel=require("../model/recipe.model")

const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const fvrtmodel=require("../model/favourite.model") 
const image=new ImageKit({
    privateKey:"private_8xoNZmFx5vHtoHsbTFvyTqNIdQQ="
})


const recipePost=async(req,res)=>{

const parsedata=JSON.parse(req.body.form)

const {ingredients,recipe,chef,category,dishName }=parsedata

const id=req.user.id

const photo=await image.files.upload({
 file: await toFile(Buffer.from(req.file.buffer),'file'),
 fileName:'filename',
 folder:'recipe-photos'
})

const ing=ingredients.split(" ").join(" | ")

const final=await recipeModel.create({
ingredients:ing,recipe,chef,image:photo.url,user:id,category,dishName
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
const {ingredients,recipe,chef,dishName }=req.body
   const response= await recipeModel.findByIdAndUpdate(req.params.id,{ingredients,recipe,chef,dishName,category})
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

const addTOfvrt=async(req,res)=>{

const IsExist=await fvrtmodel.findOne({
    user:req.user.id,
    dish:req.params.id
})

if(IsExist){

await fvrtmodel.findByIdAndDelete(IsExist._id)

return res.status(200).json({
    mesaage:"unfvrt done",
    isfvrt:false
})
}


await fvrtmodel.create({

    user:req.user.id,
    dish:req.params.id
})


return res.status(201).json({
    mesaage:"fvrt done",
    isfvrt:true
})


}
const dltfvrt=async(req,res)=>{

    const isAvailable=await fvrtmodel.findById(req.params.id)

    if(!isAvailable){
        res.status(404).json({
            message:"no fvrt is found for delete"
        })
    }

await fvrtmodel.findByIdAndDelete(req.params.id)

  res.status(201).json({
      message: "Recipe deleted from favourites",
    })

}

const getfvrt=async(req,res)=>{

   const fvrt=await fvrtmodel.find({user:req.user.id}).populate("dish")

   res.status(200).json({
    message:"your fvrt data"
    ,favourite:fvrt
   })

}


module.exports={recipePost,GetRecipes,GetSingleRecipe,deleteRecipe,updateRecipe,addTOfvrt,dltfvrt,getfvrt}