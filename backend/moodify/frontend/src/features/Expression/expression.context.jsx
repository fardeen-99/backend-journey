import { createContext, useState } from "react"

export const ExpressionContext=createContext()

export const ExpressionProvider=({children})=>{

    const [mood,setMood]=useState("")
    const [song,setSong]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [usersong,setusersong]=useState([])


    return(
        <ExpressionContext.Provider value={{mood,song,loading,error,setMood,setSong,setLoading,setError,usersong,setusersong}}>
            {children}
        </ExpressionContext.Provider>
    )
}