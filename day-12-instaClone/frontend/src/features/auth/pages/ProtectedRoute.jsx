import React from 'react'
import { Useauth } from '../hooks/auth.hook'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {


const {loading,user}=Useauth()

if(loading)return <h1>loading....</h1>

if(!user){
    return <Navigate to="/login" />
}

  return children
}

export default ProtectedRoute