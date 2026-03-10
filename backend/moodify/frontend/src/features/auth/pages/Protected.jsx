import { Navigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";
import {Atom} from "react-loading-indicators"
const Protected = ({children}) => {
    const {user,loading}=useAuth()
    if(loading){
        return <div
        className="h-dvh w-full flex items-center justify-center"
        ><Atom color="#217cb2" size="medium" text="" textColor="" /></div>
    }
    if(!user){
      return  <Navigate to="/login"/>
    }
    
    
    return children
};

export default Protected;