import { createContext, useState } from "react";


export const RecipeContext=createContext()



export const RecipeProvider=({children})=>{


    const [recipe,setRecipe]=useState([])
    const [singleRecipe,setSingleRecipe]=useState([])
    const [fvrt,setFvrt]=useState([])
    const [loading,setloading]=useState(true)
    return(
        <RecipeContext.Provider value={{recipe,setRecipe,singleRecipe,setSingleRecipe,fvrt,setFvrt,loading,setloading}}>
            {children}
        </RecipeContext.Provider>
    )
}