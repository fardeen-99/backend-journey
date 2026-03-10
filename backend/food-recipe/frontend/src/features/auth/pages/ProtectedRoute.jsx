import { Loading } from "../../recipe/pages/Loader"
import { useAuth } from "../hooks/auth.hook"
import { Navigate } from "react-router-dom"

const ProtectedRoute=({children})=>{

const {user,loading}=useAuth()


console.log(user)

if(loading){
return <Loading/>
}

if(!user){
    return <Navigate to="/login" />
}

    return children
}

export default ProtectedRoute