import { useContext } from "react";
import { Context } from "../auth.context";
import { login,register } from "../services/auth.api";





export const useAuth=()=>{
    const {user,setUser,loading,setLoading}=useContext(Context)

   const loginHandler=async(form)=>{
    setLoading(true)
try {
    const res=await login(form)
    setUser(res.user)
    console.log(res.user)
} catch (error) {
    console.log(error)
}finally{
    setLoading(false)
}

   }


   const registerHandler=async(form)=>{
    try {
        const res=await register(form)
        setUser(res.user)
        console.log(res.user)
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
   }



    return {user,setUser,loading,setLoading,loginHandler,registerHandler}
}