import { useContext, useEffect } from "react";
import { Context } from "../auth.context";
import { Getme, Login, Logout, Register } from "../services/auth.service";

export const useAuth=()=>{
  const {user,setuser,loading,setloading}=useContext(Context)

  const handleregister=async(form)=>{
           const res= await Register(form) 
           setuser(res.user)
  }
  const handlelogin=async(form)=>{
           const res= await Login(form) 
           setuser(res.user)
          }
          const handlelogout=async()=>{
            const res= await Logout() 
            return res.data
          }
         



  useEffect(()=>{
     const handlegetme=async()=>{
              try {
                const res= await Getme() 
                setuser(res.user)
              } catch (error) {
                setuser(null)
              }finally{
                setloading(false)
              }
  }
  handlegetme()
  },[])

return ({user,setuser,handlelogin,handlelogout,handleregister,loading})
}