import useAuth from "../hooks/auth.hook"
import { Navigate } from "react-router-dom"

const Protected = ({children}) => {
const {loading,user} = useAuth()

if(loading){
    return <div>Loading...</div>
}

if(!user){
    return <Navigate to="/login" />
}

    return children
}

export default Protected