import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Dashboard from './features/chats/pages/Dashboard'
import Protected from './features/auth/components/Protected'
function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/",
      element: (<Protected>
        <Dashboard />
      </Protected>)
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
