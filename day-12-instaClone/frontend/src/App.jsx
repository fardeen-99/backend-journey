import React from 'react'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import "./style.scss"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/auth/pages/Home'
import ProtectedRoute from './features/auth/pages/ProtectedRoute'
import Applayout from './features/post/pages/Applayout'
import Create from './features/post/pages/Create'
import Save from './features/post/pages/save'
const App = () => {

const router=createBrowserRouter([
{
  path:"/login",
  element:<Login />
},
{
  path:"/register",
  element:<Register />
},{
  path:"/",
  element:<Applayout/>,
  children:[
    {
      path:"/",
      element:(
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
)    },{
  path:"/create",
  element:<Create/>
},{
  path:"/save",
  element:<Save/>
}
  ]
}

])


  return (
    <RouterProvider router={router} />
  )
}

export default App