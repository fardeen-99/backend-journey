import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
}

export const register = async (email, password,username) => {
    const response = await axios.post(`${API_URL}/register`, { email, password ,username});
    return response.data;
}

export const getme = async () => {
    const response = await axios.get(`${API_URL}/getme`);
    return response.data;
}