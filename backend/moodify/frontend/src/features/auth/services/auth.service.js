import axios from 'axios'

const api=axios.create({
    baseURL:"/api",
    withCredentials:true
})


export const Register=async(form)=>{
  const res= await api.post("/auth/register",form)
  return res.data
}
export const Login=async(form)=>{
  const res= await api.post("/auth/login",form)
  return res.data
}
export const Logout=async()=>{
    const res=await api.get("/auth/logout")
    return res.data
}
export const Getme=async()=>{
    const res=await api.get("/auth/getme")
    return res.data
}