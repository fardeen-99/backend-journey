import React, { useState } from 'react'
import axios from 'axios'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'
const Login = () => {
    const [form, setform] = useState({
        username:"",
        password:""
    })
    const navigate=useNavigate()

    const {Loginhandle,loading}=Useauth()


    if(loading){
        return <h1>loading....</h1>
    }

const inputchange=(e)=>{

    const {name,value}=e.target

setform((prev)=>({...prev,[name]:value}))

}

const submitu=async(e)=>{
    e.preventDefault()

  const res= await Loginhandle(form)

 console.log(res)
 setform({
        username:"",
        password:""
    })
 
    

navigate("/")
}

const 

  return (
    <main>
        <div className="form-container">

        <h1>Login</h1>
        <form onSubmit={(e)=>submitu(e)}>
            <input type="text"
            placeholder='enter your username'
            required
            name='username'
            onChange={(e)=>inputchange(e)}
            value={form.username}
            />
               <input type="password"
            placeholder='enter your password'
            required
            name='password'
            onChange={(e)=>inputchange(e)}
            value={form.password}
            />

            <button type='submit'>Submit</button>
        </form>
        <p>Dont have any account - <Link to="/register">register</Link></p>
        </div>
    </main>
  )
}

export default Login