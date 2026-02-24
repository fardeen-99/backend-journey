import { createContext, useState } from "react"
import { Getme } from "./services/auth.api"
import { useEffect } from "react"

export const Context=createContext()

export const ContextProvider=({children})=>{



    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        const getme=async()=>{
            try {
                const res=await Getme()
                setUser(res.user)
            } catch (error) {
                setUser(null)
            }finally{
                setLoading(false)
            }
        }
        getme()
    },[])
    


    return(
        <Context.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </Context.Provider>
    )
}