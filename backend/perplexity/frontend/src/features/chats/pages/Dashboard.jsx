import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Sparkles, ChevronRight, Menu, X, MapPin, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useChat from "../hooks/chat.hook";
import useAuth from "../../auth/hooks/auth.hook";
import ChatHistory from "../components/ChatHistory";
import ProposalCard from "../components/ProposalCard";
import AiThinkingLoader from "../components/AiThinkingLoader";

const parseAiContent = (content) => {
    if (!content) return null;

    if (typeof content === "object") {
        const hasProposalFields =
            typeof content.venueName === "string" &&
            typeof content.location === "string" &&
            typeof content.estimatedCost === "string" &&
            typeof content.whyItFits === "string";

        return hasProposalFields ? content : null;
    }

    if (content === "NOT RELEVANT") return "NOT_RELEVANT";

    try {
        const parsed = JSON.parse(content);

        if (parsed === "NOT RELEVANT") {
            return "NOT_RELEVANT";
        }

        if (
            parsed &&
            typeof parsed === "object" &&
            typeof parsed.venueName === "string" &&
            typeof parsed.location === "string" &&
            typeof parsed.estimatedCost === "string" &&
            typeof parsed.whyItFits === "string"
        ) {
            return parsed;
        }

        return null;
    } catch {
        return null;
    }
};

const MessageBubble = ({ msg }) => {
    const isUser = msg.role === "user";
    const aiContent = !isUser ? parseAiContent(msg.content) : null;

    if (isUser) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
            >
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-indigo-600 px-4 py-3 text-sm text-white shadow-lg shadow-violet-500/20 sm:max-w-md">
                    {msg.content}
                </div>
            </motion.div>
        );
    }

    if (aiContent === "NOT_RELEVANT") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
            >
                <div className="max-w-[90%] rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:max-w-md">
                    This question is not related to event planning.
                </div>
            </motion.div>
        );
    }

    if (!aiContent) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
        >
            <ProposalCard proposal={aiContent} />
        </motion.div>
    );
};

const Dashboard = () => {
    const { messages, isSending, sendMessage, startNewChat, activeChatId, fetchChats } = useChat();
    const { user, handlelogout } = useAuth();
    const [input, setInput] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isSending]);

    const isFirstMessage = !activeChatId && messages.length === 0;
    const displayName = user?.username?.trim() || "Guest";

    const handleLogoutClick = async () => {
        await handlelogout();
        setSidebarOpen(false);
        navigate("/login");
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || isSending) return;
        setInput("");

        try {
            await sendMessage(trimmed);
        } catch (e) {
            console.error(e);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const examples = [
        "A 10-person leadership retreat in the mountains for 3 days with a $4k budget",
        "50-person product launch event in Mumbai with AV setup and catering",
        "Team offsite for 20 engineers in Goa for 2 days under Rs 2 lakh",
    ];

    return (
        <div className="flex h-dvh w-full overflow-hidden bg-[#080810] font-sans">
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-72 flex-col border-r border-white/5 bg-[#0d0d1a] transition-transform duration-300 ease-in-out lg:relative lg:z-auto ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex items-center justify-between border-b border-white/5 p-4">
                    <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                            <Sparkles size={14} className="text-white" />
                        </div>
                        <span className="truncate text-sm font-semibold tracking-wide text-white">Louder EventAI</span>
                    </div>
                    <button
                        className="text-gray-500 transition-colors hover:text-white lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-3">
                    <button
                        onClick={() => {
                            startNewChat();
                            setSidebarOpen(false);
                        }}
                        className="group flex w-full items-center gap-2 rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 px-3 py-2.5 text-sm font-medium text-violet-300 transition-all duration-200 hover:border-violet-500/40 hover:from-violet-600/30 hover:to-indigo-600/30"
                    >
                        <Plus size={15} className="transition-transform duration-200 group-hover:rotate-90" />
                        New Plan
                    </button>
                </div>

                <div className="px-4 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Previous Plans</p>
                </div>

                <div className="flex-1 overflow-y-auto pb-4">
                    <ChatHistory />
                </div>

                <div className="border-t border-white/5 p-4">
                    <div className="flex items-center gap-2 rounded-xl bg-white/3 px-3 py-2">
                        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-3 py-2">
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
                                <UserRound size={16} className="text-violet-300" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[7px] font-semibold uppercase tracking-widest text-gray-600">Signed in as</p>
                                <p className="truncate text-[12px] font-medium capitalize text-white">{displayName}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogoutClick}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-4 text-xs font-medium text-red-300 transition-colors hover:border-red-500/40 hover:bg-red-500/15"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="flex flex-shrink-0 items-center gap-3 border-b border-white/5 bg-[#080810]/80 px-3 py-3 backdrop-blur-xl sm:px-4">
                    <button
                        className="rounded-lg p-1.5 text-gray-500 transition-all hover:bg-white/5 hover:text-white lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex min-w-0 items-center gap-2">
                        <MapPin size={16} className="flex-shrink-0 text-violet-400" />
                        <h1 className="truncate text-xs font-semibold text-white sm:text-sm">
                            {activeChatId ? "Event Plan" : "AI Event Concierge"}
                        </h1>
                    </div>
                    {activeChatId && (
                        <button
                            onClick={startNewChat}
                            className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-violet-400"
                        >
                            <Plus size={13} /> New
                        </button>
                    )}
                </header>

                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {isFirstMessage ? (
                        <div className="flex min-h-full flex-col items-center justify-start px-4 py-8 sm:justify-center sm:py-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full max-w-xl text-center"
                            >
                                <div className="relative mx-auto mb-6 h-20 w-20">
                                    <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 opacity-30 blur-xl" />
                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                                        <Sparkles size={32} className="text-white" />
                                    </div>
                                </div>

                                <h1 className="mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
                                    Plan Your Event with Louder AI
                                </h1>
                                <p className="mb-6 text-sm leading-relaxed text-gray-500 sm:mb-8 md:text-base">
                                    Describe your corporate event in plain English. Our AI will find the perfect venue, location, and budget breakdown instantly.
                                </p>

                                <div className="space-y-2">
                                    <p className="mb-3 text-xs uppercase tracking-widest text-gray-600">Try an example</p>
                                    {examples.map((ex, i) => (
                                        <motion.button
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            onClick={() => setInput(ex)}
                                            className="group flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3 py-3 text-left text-xs text-gray-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-white/6 hover:text-gray-200 sm:px-4 sm:text-sm"
                                        >
                                            <ChevronRight size={14} className="flex-shrink-0 text-violet-500 transition-transform group-hover:translate-x-0.5" />
                                            <span className="block min-w-0 truncate">{ex}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="mx-auto w-full max-w-3xl space-y-6 px-3 py-4 sm:px-4 sm:py-6">
                            {messages.map((msg, i) => (
                                <MessageBubble key={msg._id || i} msg={msg} />
                            ))}

                            <AnimatePresence>{isSending && <AiThinkingLoader />}</AnimatePresence>

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 border-t border-white/5 bg-[#080810] px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
                    <div className="mx-auto w-full max-w-3xl">
                        <div
                            className={`relative flex items-end gap-2 rounded-2xl border transition-all duration-300 ${
                                isSending
                                    ? "border-violet-500/30 bg-[#0d0d1a]"
                                    : "border-white/10 bg-[#0d0d1a] hover:border-white/20 focus-within:border-violet-500/50"
                            }`}
                        >
                            <input
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your event... (e.g. 10-person retreat in mountains, $4k budget)"
                                
                                disabled={isSending}
                                className="max-h-40 flex-1 resize-none overflow-y-auto bg-transparent px-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none disabled:opacity-50 sm:px-4 sm:py-3.5"
                                style={{ minHeight: "52px" }}
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                                }}
                            />
                            <div className="flex-shrink-0 pb-2 pr-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    disabled={!input.trim() || isSending}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Send size={15} className="text-white" />
                                </motion.button>
                            </div>
                        </div>
                        <p className="mt-2 text-center text-[10px] text-gray-700">
                            Press Enter to send · Shift+Enter for new line
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
