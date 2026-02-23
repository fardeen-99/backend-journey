const express=require("express")
const Identifier=require("../middleware/auth.middleware")
const recipeController=require("../controllers/recipe.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const recipeRouter=express.Router() 




recipeRouter.post("/create",upload.single("file"),Identifier,recipeController.recipePost)
recipeRouter.get("/",Identifier,recipeController.GetRecipes)
recipeRouter.get("/:id",Identifier,recipeController.GetSingleRecipe)
recipeRouter.delete("/:id",Identifier,recipeController.deleteRecipe)
recipeRouter.patch("/:id",Identifier,recipeController.updateRecipe)






module.exports=recipeRouter