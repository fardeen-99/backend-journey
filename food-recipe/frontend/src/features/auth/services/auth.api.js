import axios from 'axios'

const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})



export const login=async(form)=>{
 try{       
   const res= await api.post("/login",form)
   return res.data
 }
 catch(error){
   throw error
 }

}

export const register=async(form)=>{
 
    try {
        const res= await api.post("/register",form)
        return res.data
    } catch (error) {
        throw error
    }

    
    
}
export const getme=async()=>{
    try {
        const res=await axios.get("http://localhost:3000/getme")
        return res.data
    } catch (error) {
        throw error
    }
}
