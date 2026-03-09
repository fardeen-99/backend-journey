import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/auth.hook"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: "", password: "" })
    const { loginHandler, loading } = useAuth()
    const [focused, setFocused] = useState({ username: false, password: false })

    const submithandler = async (e) => {
        e.preventDefault()
        const res = await loginHandler(form)
        console.log(res)
        setForm({ username: "", password: "" })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="h-screen w-screen flex items-center justify-center bg-[#1e1e1e]">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full border-4 border-transparent animate-spin"
                        style={{
                            borderTopColor: "#ff7e5f",
                            borderRightColor: "#feb47b",
                        }}
                    />
                    <p className="text-white/60 text-sm tracking-wider uppercase">Loading...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="h-screen w-screen flex items-center justify-center bg-[#1e1e1e] relative overflow-hidden">
            {/* Background decorative elements */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl -top-40 -left-40"
                style={{ background: "linear-gradient(135deg, #ff7e5f, #feb47b)" }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-8 blur-3xl -bottom-32 -right-32"
                style={{ background: "linear-gradient(135deg, #feb47b, #ff7e5f)" }}
            />

            {/* Login Card */}
            <div
                className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl border border-white/10 shadow-2xl"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(20px)",
                }}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #ff7e5f, #feb47b)" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1
                        className="text-3xl font-bold bg-clip-text"
                        style={{
                            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Welcome Back
                    </h1>
                    <p className="text-white/40 text-sm mt-2">Sign in to continue your culinary journey</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={(e) => submithandler(e)}>
                    {/* Username Field */}
                    <div className="relative">
                        <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                            Username
                        </label>
                        <div
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.04)",
                                borderColor: focused.username ? "#ff7e5f" : "rgba(255,255,255,0.08)",
                                boxShadow: focused.username ? "0 0 0 3px rgba(255,126,95,0.15)" : "none",
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full bg-transparent text-white text-sm outline-none placeholder-white/25"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                onFocus={() => setFocused({ ...focused, username: true })}
                                onBlur={() => setFocused({ ...focused, username: false })}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                            Password
                        </label>
                        <div
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.04)",
                                borderColor: focused.password ? "#ff7e5f" : "rgba(255,255,255,0.08)",
                                boxShadow: focused.password ? "0 0 0 3px rgba(255,126,95,0.15)" : "none",
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-transparent text-white text-sm outline-none placeholder-white/25"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                onFocus={() => setFocused({ ...focused, password: true })}
                                onBlur={() => setFocused({ ...focused, password: false })}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide mt-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                            boxShadow: "0 4px 15px rgba(255,126,95,0.3)",
                        }}
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/25 text-xs uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Register Link */}
                <p className="text-center text-white/40 text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold transition-colors duration-200 hover:underline"
                        style={{ color: "#ff7e5f" }}
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login