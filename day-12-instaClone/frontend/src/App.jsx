import React from 'react'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import "./style.scss"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/auth/pages/Home'
import ProtectedRoute from './features/auth/pages/ProtectedRoute'
const App = () => {

const router=createBrowserRouter([
  {
    path:"/",
    element:(<ProtectedRoute>
      <Home/>
    </ProtectedRoute>)
  },
{
  path:"/login",
  element:<Login />
},
{
  path:"/register",
  element:<Register />
}

])


  return (
    <RouterProvider router={router} />
  )
}

export default App