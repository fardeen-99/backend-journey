import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useNavigate } from "react-router-dom"

const Login=()=>{
const navigate=useNavigate()
const [form,setForm]=useState({username:"",password:""})

const {loginHandler,loading}=useAuth()

const submithandler=async(e)=>{
    e.preventDefault()
    const res=await loginHandler(form)
    console.log(res)
    setForm({username:"",password:""})
    navigate("/home")
}

if(loading){
    return(
        <>
        <h1>Loading...</h1>
        </>
    )
}

return(
<>
<main className="h-screen w-screen flex items-center justify-center bg-zinc-700">

<div className="flex items-center justify-center flex-col text-white p-4 bg-blue-300 rounded-lg min-h-60">
    <h1 className="text-2xl font-bold">Login</h1>
    <form className="flex items-center justify-center flex-col gap-2" onSubmit={(e)=>submithandler(e)}>
        <input type="text" placeholder="username" className="text-black p-2 rounded-md w-full outline-none border-none" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})}/>
        <input type="password" placeholder="password" className="text-black p-2 rounded-md w-full outline-none border-none" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button type="submit" className="bg-blue-500 p-2 rounded-md w-full">Login</button>
    </form>
    <p className="text-[11px] mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
</div>

</main>
</>



)

}

export default Login