import { createContext, useState } from "react";


export const Context=createContext()


export const ProviderPost=({children})=>{

    const[singlepost,setSinglepost]=useState([])
    const[story,setStory]=useState([])
    const [userpersonalprofile,setuserpersonalprofile]=useState([])


    return(
<Context.Provider value={{singlepost,setSinglepost,story,setStory,userpersonalprofile,setuserpersonalprofile}} >
    {children}
</Context.Provider>
    )
}   