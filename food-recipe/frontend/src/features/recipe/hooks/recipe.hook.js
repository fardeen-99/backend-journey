import { useContext } from "react";
import { RecipeContext } from "../recipe.context";
import { addTOfvrt, fvrtdlt, getfvrt, recipepost, singleRecipeDelete, unfvrt } from "../services/recipe.api";
import { getallRecipe } from "../services/recipe.api";
import { getSingleRecipe } from "../services/recipe.api";

export const useRecipe=()=>{
    const {recipe,setRecipe,singleRecipe,setSingleRecipe,fvrt,setFvrt}=useContext(RecipeContext)
    
const getRecipe=async(data)=>{
    const response=await recipepost(data)
    // console.log(response)
}


const getAllRecipe=async()=>{
    const response=await getallRecipe()
    setRecipe(response.recipes)
    // console.log(response)
}

const GetSingleRecipe=async(id)=>{
    const response=await getSingleRecipe(id)
    setSingleRecipe(response.single)
    // console.log(response.single)
}

const getToknowfvrt=async()=>{
    const res=await getfvrt()
    // setFvrt(res.favourite)
    // console.log(res.favourite)
    return res.favourite
}

const handleFvrt=async(id)=>{
    // console.log("pelo");

    const res=await addTOfvrt(id)
   await GetSingleRecipe(id)
 
    await getToknowfvrt()
    // console.log(res)
}

const handleUnFvrt=async(id)=>{
    console.log("hello");
    
    const res=await unfvrt(id)
   await GetSingleRecipe(id)
    await getToknowfvrt()
    // console.log(res)
}

const handlefvrtdlt=async(id)=>{

    await fvrtdlt(id)
    await getToknowfvrt()
}

const postdelete=async(id)=>{
    const res=await singleRecipeDelete(id)
    await getAllRecipe()
}

return{getRecipe,setRecipe,recipe,getAllRecipe,GetSingleRecipe,singleRecipe,getToknowfvrt,handleFvrt,handleUnFvrt,handlefvrtdlt,postdelete}
}