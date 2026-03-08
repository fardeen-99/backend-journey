import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
const Register = () => {    
    const navigate=useNavigate()
    const [form, setform] = useState({
        username: "",
        password: "",
        email: ""
    })

    const { handleregister } = useAuth()
    const submithandler = async (e) => {
        e.preventDefault()
        console.log(form)
        await handleregister(form)
        setform({
            username: "",
            password: "",
            email: ""
        })
navigate("/")
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8 space-y-6 transform transition-all hover:scale-[1.01]">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">Create Account</h2>
                    <p className="text-gray-300 text-sm">Join Moodify today</p>
                </div>
                <form onSubmit={submithandler} className="space-y-4">
                    <div>
                        <input type="text" name="username" placeholder="Username" value={form.username} onChange={(e) => setform({ ...form, username: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e) => setform({ ...form, password: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
                    </div>
                    <button type="submit" className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                        Register
                    </button>
                    <p className="text-center text-sm text-gray-300 mt-6">
                        Already have an account? <Link to="/login" className="font-semibold text-cyan-400 hover:text-purple-400 transition-colors">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;