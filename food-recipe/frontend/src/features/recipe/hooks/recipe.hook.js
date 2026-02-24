import { useContext } from "react";
import { RecipeContext } from "../recipe.context";
import { recipepost } from "../services/recipe.api";
import { getallRecipe } from "../services/recipe.api";
import { getSingleRecipe } from "../services/recipe.api";

export const useRecipe=()=>{
    const {recipe,setRecipe,singleRecipe,setSingleRecipe}=useContext(RecipeContext)
    
const getRecipe=async(data)=>{
    const response=await recipepost(data)
    console.log(response)
}


const getAllRecipe=async()=>{
    const response=await getallRecipe()
    setRecipe(response.recipes)
    console.log(response)
}

const GetSingleRecipe=async(id)=>{
    const response=await getSingleRecipe(id)
    setSingleRecipe(response.single)
    console.log(response.single)
}

return{getRecipe,setRecipe,recipe,getAllRecipe,GetSingleRecipe,singleRecipe}
}