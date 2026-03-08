import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';

const Login = () => {
    const navigate=useNavigate()
    const [form, setform] = useState({
        username: "",
        password: ""
    })

    const { handlelogin } = useAuth()
    const submithandler = async (e) => {
        e.preventDefault()
        console.log(form)
        await handlelogin(form)
        setform({
            username: "",
            password: ""
        })
        navigate("/")

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8 space-y-6 transform transition-all hover:scale-[1.01]">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">Welcome Back</h2>
                    <p className="text-gray-300 text-sm">Sign in to continue to Moodify</p>
                </div>
                <form onSubmit={submithandler} className="space-y-5">
                    <div>
                        <input type="text" name="username" placeholder="Username" value={form.username} onChange={(e) => setform({ ...form, username: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e) => setform({ ...form, password: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                        Sign In
                    </button>
                    <p className="text-center text-sm text-gray-300 mt-6">
                        Don't have an account? <Link to="/register" className="font-semibold text-purple-400 hover:text-cyan-400 transition-colors">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
