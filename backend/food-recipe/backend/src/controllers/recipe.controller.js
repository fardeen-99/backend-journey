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

  const item = await recipeModel
  .findById(req.params.id)
  .populate("user")
  .lean()

const isfvrt = await fvrtmodel.findOne({
   user:req.user.id,
   dish:item._id
})

item.isfvrt = !!isfvrt

res.status(200).json({
   single:[item]
})

}

const deleteRecipe=async(req,res)=>{

   const response= await recipeModel.findByIdAndDelete(req.params.id)
res.status(200).json({
    message:"your recipe is deleted"
})

}

const updateRecipe=async(req,res)=>{
const {ingredients,recipe,chef,dishName,category }=req.body   


let cleaned = ingredients.replace(/\|/g, " ").replace(/\s+/g, " ").trim();

cleaned=cleaned.split(" ").join(" | ")

   const response= await recipeModel.findByIdAndUpdate(req.params.id,{ingredients:cleaned,recipe,chef,dishName,category})
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

    console.log("USER:", req.user)
    console.log("PARAM ID:", req.params.id)
await fvrtmodel.create({
    user:req.user.id,
    dish:req.params.id
})


return res.status(201).json({
    mesaage:"fvrt done"
})


}

const unfvrt=async(req,res)=>{

const IsExist=await fvrtmodel.findOne({
    user:req.user.id,
    dish:req.params.id
})

if(!IsExist){
    return res.status(404).json({
        message:"no fvrt is found for delete"
    })
}

await fvrtmodel.findByIdAndDelete(IsExist._id)

return res.status(200).json({
    message:"unfvrt done"
})


}

const dltfvrt=async(req,res)=>{

    const isAvailable=await fvrtmodel.findOne({dish:req.params.id})

    if(!isAvailable){
        res.status(404).json({
            message:"no fvrt is found for delete"
        })
    }

await fvrtmodel.findByIdAndDelete(isAvailable._id)

  res.status(201).json({
      message: "Recipe deleted from favourites",
    })

}

const getfvrt=async(req,res)=>{

   const ans=await recipeModel.find().lean()
   
   
   
   const fvrt=await Promise.all(ans.map(async(item)=>{
    
    const isfvrt=await fvrtmodel.findOne({
        user:req.user.id,
        dish:item._id
    })

   item.isfvrt= !!isfvrt
   return item

   }))
// console.log(fvrt)
   res.status(200).json({
    favourite:fvrt
   })

}


module.exports={recipePost,GetRecipes,GetSingleRecipe,deleteRecipe,updateRecipe,addTOfvrt,dltfvrt,getfvrt,unfvrt}