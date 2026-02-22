import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'
import { Logout } from '../services/auth.api'

const Home = () => {
const navigate=useNavigate()

const {user}=Useauth()

const clear=()=>{
Logout()
navigate("/register")
}

  return (
    <>
    <div>hello {user.username}</div>
    <button onClick={clear}>logout</button>
    </>
  )
}

export default Home