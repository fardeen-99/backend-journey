import { createContext } from "react";


export const Context=createContext()


export const ProviderPost=({children})=>{



    return(
<Context.Provider value={{}} >
    {children}
</Context.Provider>
    )
}