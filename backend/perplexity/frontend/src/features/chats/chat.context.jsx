import { createContext, useState, useEffect, useCallback } from "react";
import { initializeSocketConnection } from "./services/chat.socket";
import { getChatsAPI, sendMessageAPI, getMessagesAPI, deleteChatAPI } from "./services/chat.services";

export const chatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [chatsLoading, setChatsLoading] = useState(true);

    // Initialize Socket.IO on mount
    useEffect(() => {
        const socket = initializeSocketConnection();
        // Listen for real-time events if backend emits them
        socket.on("new_message", (data) => {
            console.log("Socket event received:", data);
        });

        return () => {
            socket.off("new_message");
        };
    }, []);

    // Load chat list on mount
    const fetchChats = useCallback(async () => {
        try {
            setChatsLoading(true);
            const data = await getChatsAPI();
            setChats(data.chats || []);
        } catch (err) {
            console.error("Failed to fetch chats:", err);
        } finally {
            setChatsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    // Load messages when active chat changes
    const loadMessages = useCallback(async (chatId) => {
        if (!chatId) {
            setMessages([]);
            return;
        }
        try {
            const data = await getMessagesAPI(chatId);
            setMessages(data.messages || []);
        } catch (err) {
            console.error("Failed to fetch messages:", err);
            setMessages([]);
        }
    }, []);

    useEffect(() => {
        loadMessages(activeChatId);
    }, [activeChatId, loadMessages]);

    // Send a message
    const sendMessage = useCallback(async (messageText) => {
        if (!messageText.trim() || isSending) return;

        setIsSending(true);
        try {
            const data = await sendMessageAPI(messageText, activeChatId);

            // If a new chat was created, add it to the list and set it active
            if (!activeChatId && data.success) {
                const newChat = { _id: data.ai.chat, title: data.title };
                setChats((prev) => [newChat, ...prev]);
                setActiveChatId(data.ai.chat);
            }

            // Append both user and AI messages to local state
            setMessages((prev) => [
                ...prev,
                data.user,
                data.ai,
            ]);

            return data;
        } catch (err) {
            console.error("Failed to send message:", err);
            throw err;
        } finally {
            setIsSending(false);
        }
    }, [activeChatId, isSending]);

    // Start a new chat
    const startNewChat = useCallback(() => {
        setActiveChatId(null);
        setMessages([]);
    }, []);

    // Delete a chat
    const deleteChat = useCallback(async (chatId) => {
        try {
            await deleteChatAPI(chatId);
            setChats((prev) => prev.filter((c) => c._id !== chatId));
            if (activeChatId === chatId) {
                startNewChat();
            }
        } catch (err) {
            console.error("Failed to delete chat:", err);
        }
    }, [activeChatId, startNewChat]);

    const value = {
        chats,
        activeChatId,
        setActiveChatId,
        messages,
        isSending,
        chatsLoading,
        sendMessage,
        startNewChat,
        deleteChat,
        fetchChats,
    };

    return (
        <chatContext.Provider value={value}>
            {children}
        </chatContext.Provider>
    );
};