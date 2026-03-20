import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Trash2 } from "lucide-react";
import useChat from "../hooks/chat.hook";

const ChatHistory = () => {
    const { chats, activeChatId, setActiveChatId, deleteChat, chatsLoading } = useChat();

    if (chatsLoading) {
        return (
            <div className="space-y-2 px-2">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-10 rounded-lg bg-white/5 animate-pulse"
                        style={{ opacity: 1 - i * 0.2 }}
                    />
                ))}
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div className="px-2 text-center py-8">
                <MessageSquare size={28} className="text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">No previous plans yet.</p>
                <p className="text-xs text-gray-700">Start planning below!</p>
            </div>
        );
    }

    return (
        <div className="space-y-1 px-2">
            <AnimatePresence>
                {chats.map((chat, index) => (
                    <motion.div
                        key={chat._id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16, height: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.04 }}
                        className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                            activeChatId === chat._id
                                ? "bg-gradient-to-r from-violet-600/30 to-indigo-600/20 border border-violet-500/30"
                                : "hover:bg-white/5 border border-transparent"
                        }`}
                        onClick={() => setActiveChatId(chat._id)}
                    >
                        <MessageSquare
                            size={14}
                            className={activeChatId === chat._id ? "text-violet-400 flex-shrink-0" : "text-gray-600 flex-shrink-0"}
                        />
                        <span
                            className={`flex-1 text-sm truncate ${
                                activeChatId === chat._id ? "text-white font-medium" : "text-gray-400"
                            }`}
                        >
                            {chat.title || "Untitled Plan"}
                        </span>

                        {/* Delete button - shows on hover */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-gray-600 hover:text-red-400 transition-all duration-150 p-1 rounded-md hover:bg-red-500/10"
                        >
                            <Trash2 size={13} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ChatHistory;
