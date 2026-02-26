import { useState } from "react"
import { useAuth } from "../hooks/auth.hook"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const Register=()=>{

    const [form,setForm]=useState({username:"",email:"",password:""})
    const {registerHandler,loading}=useAuth()

    const navigate=useNavigate()
    const submithandler=async(e)=>{
        e.preventDefault()
        await registerHandler(form)
        setForm({username:"",email:"",password:""})
        navigate("/")
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

<div className="flex items-center justify-center flex-col text-white p-4 bg-blue-300 rounded-lg min-h-70">
    <h1 className="text-2xl font-bold">Register</h1>
    <form className="flex items-center justify-center flex-col gap-2" onSubmit={(e)=>submithandler(e)}>
        <input type="text" placeholder="username" className="text-black p-2 rounded-md w-full outline-none border-none" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})}/>
        <input type="password" placeholder="password" className="text-black p-2 rounded-md w-full outline-none border-none" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <input type="email" placeholder="email" className="text-black p-2 rounded-md w-full outline-none border-none" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <button type="submit" className="bg-blue-500 p-2 rounded-md w-full">Register</button>
    </form>
    <p className="text-[11px] mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
</div>

</main>
        </>
    )
}

export default Register