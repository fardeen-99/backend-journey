import React, { useState } from 'react'
import axios from 'axios'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'

const Register = () => {
    const [form, setform] = useState({
        username:"",
        password:"",
        email:""
    })
   
    const {loading,RegisterHandle,user}=Useauth()
    const navigate=useNavigate()
   const inputchange=(e)=>{
   
       const {name,value}=e.target
   
   setform((prev)=>({...prev,[name]:value}))
   
   }
   if(loading){
    return <h1>loading.....</h1>
   }
   const submitu=async(e)=>{
       e.preventDefault()
   
  const res=await RegisterHandle(form)
    console.log(user)
    setform({
        username:"",
        password:"",
        email:""
    })
    
    navigate("/")
   
   }
   
     return (
       <main>
           <div className="form-container">
   
           <h1>Register</h1>
           <form onSubmit={(e)=>submitu(e)}>
               <input type="text"
               placeholder='enter your username'
               name='username'
               onChange={(e)=>inputchange(e)}
               value={form.username}
               />
               
                  <input type="text"
               placeholder='enter your E-mail'
               name='email'
               onChange={(e)=>inputchange(e)}
               value={form.email}
               />
                  <input type="password"
               placeholder='enter your password'
               name='password'
               onChange={(e)=>inputchange(e)}
               value={form.password}
               />
   
               <button type='submit'>Submit</button>
           </form>
           <p>Already have an account - <Link to="/login">login</Link></p>
           </div>
       </main>
     )
}

export default Register