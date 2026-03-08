import { Navigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";
const Protected = ({children}) => {
    const {user,loading}=useAuth()
    if(loading){
        return <div>Loading...</div>
    }
    if(!user){
      return  <Navigate to="/login"/>
    }
    
    
    return children
};

export default Protected;