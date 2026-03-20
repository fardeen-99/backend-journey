import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../services/auth.services";

const useAuth = () => {
    const { user, loading, setLoading, setUser, fetchuser } = useContext(AuthContext);


    const handleregister = async (email, password, username) => {
      
        try {
            const response = await register(email, password, username);
            console.log("hi");
            setUser(response.user);
            setLoading(false);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handlelogin = async (email, password) => {
     
        try {
            const response = await login(email, password);
            setUser(response.user);
            setLoading(false);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handlelogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, setLoading, setUser, fetchuser, handleregister, handlelogin, handlelogout }
}

export default useAuth
