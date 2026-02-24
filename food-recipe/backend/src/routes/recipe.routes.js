const express=require("express")
const Identifier=require("../middleware/auth.middleware")

const recipeController=require("../controllers/recipe.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const recipeRouter=express.Router() 


/*
@Routes: api/recipe/create
@desc --> create a new recipe
@access private
*/

recipeRouter.post("/create",upload.single("file"),Identifier,recipeController.recipePost)

/*
@Routes: api/recipe/
@desc --> get all recipes
@access private
*/

recipeRouter.get("/",Identifier,recipeController.GetRecipes)

/*
@Routes: api/recipe/single/:id
@desc --> get single recipe
@access private
*/

recipeRouter.get("/single/:id",Identifier,recipeController.GetSingleRecipe)

/*
@Routes: api/recipe/single/:id
@desc --> delete recipe
@access private
*/

recipeRouter.delete("/single/:id",Identifier,recipeController.deleteRecipe) 

/*
@Routes: api/recipe/single/:id
@desc --> update recipe
@access private
*/

recipeRouter.patch("/single/:id",Identifier,recipeController.updateRecipe)

/*
@Routes: api/recipe/fvrt/:id
@desc --> add to fvrt
@access private
*/

recipeRouter.post("/fvrt/:id",Identifier,recipeController.addTOfvrt)

/*
@Routes: api/recipe/fvrt/delete/:id
@desc --> delete fvrt
@access private
*/

recipeRouter.post("/fvrt/delete/:id",Identifier,recipeController.dltfvrt)

/*
@Routes: api/recipe/fvrt
@desc --> get fvrt
@access private
*/

recipeRouter.get("/fvrt",Identifier,recipeController.getfvrt)







module.exports=recipeRouter