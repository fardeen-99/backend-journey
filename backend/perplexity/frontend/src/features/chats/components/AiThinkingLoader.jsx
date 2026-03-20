import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AiThinkingLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="relative rounded-2xl p-px bg-gradient-to-br from-violet-500/60 via-purple-500/40 to-indigo-600/60">
                <div className="rounded-2xl bg-[#0d0d14] p-6 md:p-8">
                    <div className="flex items-center gap-4">
                        {/* Pulsing icon */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                <Sparkles size={22} className="text-white" />
                            </div>
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-violet-400 border-2 border-[#0d0d14] animate-ping" />
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-violet-400 border-2 border-[#0d0d14]" />
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-semibold text-violet-300 mb-1">AI is planning your event...</p>
                            <p className="text-xs text-gray-500">Finding the perfect venue for you</p>
                        </div>

                        {/* Bouncing dots */}
                        <div className="flex items-center gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-violet-500"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 0.7,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Animated shimmer bars */}
                    <div className="mt-6 space-y-3">
                        {[100, 80, 60].map((w, i) => (
                            <motion.div
                                key={i}
                                className="h-3 rounded-full bg-white/5 overflow-hidden"
                                style={{ width: `${w}%` }}
                            >
                                <motion.div
                                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
                                    animate={{ x: ["-100%", "400%"] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "linear",
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AiThinkingLoader;
