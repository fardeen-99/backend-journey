import axios from 'axios'

const api=axios.create({
    baseURL:"https://food-recipe-web.onrender.com/api/auth",
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
export const Getme=async()=>{
    try {
        const res=await axios.get("https://food-recipe-web.onrender.com/getme",{withCredentials:true})
        console.log(res)
        return res.data
    } catch (error) {
        throw error
    }
}
