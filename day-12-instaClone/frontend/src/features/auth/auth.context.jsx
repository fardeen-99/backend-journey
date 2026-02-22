import { createContext, useEffect, useState } from "react";
import { Getme, Login, Register } from "./services/auth.api";




export const Context=createContext()


export const Provider=({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await Getme();
            setuser(res.user);
        } catch (err) {
            setuser(null);
        } finally {
            setloading(false);
        }
    };

    fetchUser();
}, []);


const Loginhandle=async(form)=>{
setloading(true)
    try {
        const res=await Login(form)
      
        setuser(res.user)
        
    } catch (error) {
        console.log(error);
        
    }finally{
        setloading(false)
    }

}

const RegisterHandle=async(form)=>{
    setloading(true)
    try {
        const res=await Register(form)
      
       setuser(res.user)
      
    } catch (error) {
        console.log(error);
        
    }finally{
        setloading(false)
    }
}



return(
    <Context.Provider  value={{RegisterHandle,Loginhandle,user,loading}} >
        {children}
    </Context.Provider>
)

}