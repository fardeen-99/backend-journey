import { createContext, useState } from "react";


export const Context=createContext()




export const ContextProvider=({children})=>{

const [user,setuser]=useState(null)
const [loading,setloading]=useState(true)

    return(
        <Context.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </Context.Provider>
    )
}