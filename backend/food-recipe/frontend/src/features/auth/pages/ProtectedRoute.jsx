import { useAuth } from "../hooks/auth.hook"
import { Navigate } from "react-router-dom"

const ProtectedRoute=({children})=>{

const {user,loading}=useAuth()


console.log(user)

if(loading){
    return <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
}

if(!user){
    return <Navigate to="/login" />
}

    return children
}

export default ProtectedRoute