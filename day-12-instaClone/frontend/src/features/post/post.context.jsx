import { createContext, useState } from "react";


export const Context=createContext()


export const ProviderPost=({children})=>{

    const[singlepost,setSinglepost]=useState([])


    return(
<Context.Provider value={{singlepost,setSinglepost}} >
    {children}
</Context.Provider>
    )
}   