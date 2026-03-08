  import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from  "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/pages/Protected";
import Moodify from "./features/Expression/components/Moodify";

function App() {



 const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected>
            <Moodify/>
        </Protected>
    }
])

return(
    <RouterProvider router={router}/>
)
}

export default App
