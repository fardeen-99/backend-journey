import { createContext, useState } from "react";


export const RecipeContext=createContext()



export const RecipeProvider=({children})=>{


    const [recipe,setRecipe]=useState([])
    const [singleRecipe,setSingleRecipe]=useState([])
    return(
        <RecipeContext.Provider value={{recipe,setRecipe,singleRecipe,setSingleRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}