import axios from "axios";

const API = axios.create({
    baseURL: "/api/chat",
    withCredentials: true,
});

export const sendMessageAPI = async (message, chatId) => {
    const payload = { message };
    if (chatId) payload.chat = chatId;
    const response = await API.post("/", payload);
    return response.data;
};

export const getChatsAPI = async () => {
    const response = await API.get("/get-chats");
    return response.data;
};

export const getMessagesAPI = async (chatId) => {
    const response = await API.get(`/${chatId}/messages`);
    return response.data;
};

export const deleteChatAPI = async (chatId) => {
    const response = await API.delete(`/${chatId}/delete`);
    return response.data;
};
