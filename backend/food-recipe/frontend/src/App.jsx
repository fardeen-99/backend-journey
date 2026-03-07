import { createBrowserRouter, Form, RouterProvider } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Applayout from "./features/recipe/pages/Applayout"
import Home from "./features/recipe/pages/Home"
import About from "./features/recipe/pages/About"
import ProtectedRoute from "./features/auth/pages/ProtectedRoute"
import CreateRecipe from "./features/recipe/pages/CreateRecipe"
import Collection from "./features/recipe/pages/Collection"
import SingleRecipe from "./features/recipe/pages/SingleRecipe"
import Fvrt from "./features/recipe/pages/fvrt"
import FormEdit from "./features/recipe/pages/FormEdit"
const App=()=>{


const router=createBrowserRouter(
  [
    {
      path:"/login",
      element:<Login/>
    },{
      path:"/register",
      element:<Register/>
    },{
      path:"/",
      element:(
      <ProtectedRoute>
        <Applayout/>
      </ProtectedRoute>),
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/about",
          element:(
          <ProtectedRoute>
          <About/>
          </ProtectedRoute>)
        },{
          path:"/create",
          element:<CreateRecipe/>
        },{
          path:"/collection",
          element:<Collection/>
        },{
          path:"/collection/:id",
          element:<SingleRecipe/>
        },{
          path:"/fvrt",
          element:<Fvrt/>
        },{
          path:"/edit/:id",
          element:<FormEdit/>
        }
      ]
    }
  ]
)

  return(
    <RouterProvider router={router}/>
  )
}

export default App