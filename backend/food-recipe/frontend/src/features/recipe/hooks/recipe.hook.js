import { useContext } from "react";
import { RecipeContext } from "../recipe.context";
import { addTOfvrt, fvrtdlt, getfvrt, recipepost, RecipeUpdae, singleRecipeDelete, unfvrt } from "../services/recipe.api";
import { getallRecipe } from "../services/recipe.api";
import { getSingleRecipe } from "../services/recipe.api";

export const useRecipe = () => {
    const { recipe, setRecipe, singleRecipe, setSingleRecipe, fvrt, setFvrt, loading, setloading } = useContext(RecipeContext)

    const getRecipe = async (data) => {
        try {
            setloading(true)
            const response = await recipepost(data)
            // console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }


    const getAllRecipe = async (showloader=true) => {

        try {
          if(showloading)  setloading(true)
            const response = await getallRecipe()
            setRecipe(response.recipes)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
        // console.log(response)
    }

    const GetSingleRecipe = async (id,showloader=true) => {

        try {
           if(showloader)setloading(true)
            const response = await getSingleRecipe(id)
            setSingleRecipe(response.single)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }

        // console.log(response.single)
    }

const getToknowfvrt = async () => {
    try {
        const res = await getfvrt()
        return res.favourite
    } catch (error) {
        console.log(error)
    }
}
const handleFvrt = async (id) => {
    try {
        await addTOfvrt(id)
        await GetSingleRecipe(id,false)
        await getToknowfvrt()
    } catch (error) {
        console.log(error)
    }
}

const handleUnFvrt = async (id) => {
    try {
        await unfvrt(id)
        await GetSingleRecipe(id,false)
        await getToknowfvrt()
    } catch (error) {
        console.log(error)
    }
}
const handlefvrtdlt = async (id) => {
    try {
        await fvrtdlt(id)
        await getToknowfvrt()
    } catch (error) {
        console.log(error)
    }
}
    const postdelete = async (id) => {
        try {
            setloading(true)
            const res = await singleRecipeDelete(id)
            await getAllRecipe()
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }


    const handleRecipeUpdate = async (id, form) => {
        try {
            setloading(true)
            const res = await RecipeUpdae(id, form)
            await GetSingleRecipe(id)
            await getAllRecipe()
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    return { getRecipe, setRecipe, recipe, getAllRecipe, GetSingleRecipe, singleRecipe, getToknowfvrt, handleFvrt, handleUnFvrt, handlefvrtdlt, postdelete, handleRecipeUpdate, loading }
}