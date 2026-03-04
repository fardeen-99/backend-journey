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
import Update from './features/post/pages/Update'
import Usersprofile from './features/post/pages/Usersprofile'
import Reelsection from './features/post/pages/Reelsection'
import Search from './features/post/pages/Search'
import { Error } from './features/post/pages/error'
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
  errorElement:<Error/>,
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
},{
  path:"/personprofile/:id",
  element:<Usersprofile/>
},{
  path:"/reel",
  element:<Reelsection/>
},
{
  path:"/search",
  element:<Search/>
}
  ]
},{
  path:"/feed/:id",
  element:<DetailPost/>
},{
  path:"/profileUpdate/:id",
  element:<Update/>
}

])


  return (
    <RouterProvider router={router} />
  )
}

export default App