import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

const App=()=>{


const router=createBrowserRouter(
  [
    {
      path:"/login",
      element:<Login/>
    },{
      path:"/register",
      element:<Register/>
    }
  ]
)

  return(
    <RouterProvider router={router}/>
  )
}

export default App