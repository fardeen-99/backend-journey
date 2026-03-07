import { createContext, useEffect, useState } from "react";
import { getallpost, Getme, Login, Register } from "./services/auth.api";




export const Context=createContext()


export const Provider=({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const [allpost,setallpost]=useState([])
const [savepost,setsavepost]=useState([])

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
 const handlegetallpost=async()=>{

const res =await getallpost()
console.log(res.final)
setallpost(res.final)

}

useEffect(() => {


    fetchUser();
    
}, []);


const Loginhandle=async(form)=>{
    try {
        const res=await Login(form)
      
        setuser(res.user)
 console.log(res.user)
        
    } catch (error) {
        console.log(error);
        
    }finally{
        setloading(false)
    }

}

const RegisterHandle=async(form)=>{
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
    <Context.Provider  value={{RegisterHandle,Loginhandle,user,loading,allpost,setallpost,handlegetallpost,fetchUser,savepost,setsavepost}} >
        {children}
    </Context.Provider>
)

}