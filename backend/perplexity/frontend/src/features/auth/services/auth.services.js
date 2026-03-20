import axios from "axios";

const API=axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

export const login = async (email, password) => {
    const response = await API.post(`/login`, { email, password });
    return response.data;
}

export const register = async (email, password,username) => {
    const response = await API.post(`/register`, { email, password ,username});
    return response.data;
}

export const getme = async () => {
    const response = await API.get(`/getme`);
    return response.data;
}

export const logout = async () => {
    const response = await API.post(`/logout`);
    return response.data;
}
