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
import Profile from './features/post/pages/Profile'
import DetailPost from './features/post/pages/DetailPost'
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
},{
  path:"/profile",
  element:<Profile/>
}
  ]
},{
  path:"/feed/:id",
  element:<DetailPost/>
}

])


  return (
    <RouterProvider router={router} />
  )
}

export default App