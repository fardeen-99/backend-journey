import { createContext, useState, useEffect } from "react";
import { getme } from "./services/auth.services";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchuser = async () => {
        try {
            const response = await getme()
            setUser(response.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {


        fetchuser()

    }, []);

    return (
        <AuthContext.Provider value={{ loading, setLoading, user, setUser, fetchuser }}>
            {children}
        </AuthContext.Provider>
    )
}

