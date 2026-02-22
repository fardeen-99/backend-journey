import axios from 'axios'

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export const Login=async(form)=>{
    
  try {
   const res= await api.post("/api/auth/login",form)
   return res.data
  } catch (error) {
    throw err
  }
} 
export const Register=async(form)=>{
    
  try {
   const res= await api.post("/api/auth/register",form)
   return res.data
  } catch (error) {
    throw err
  }
} 
export const Getme=async()=>{

 const res=await api.get("/api/auth/get-me")
 console.log(res.data.user)
return res.data



}
export const Logout=async()=>{

  const res=await api.post("/api/auth/logout")
  return res.data
}