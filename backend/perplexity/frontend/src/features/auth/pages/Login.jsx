import React, { useState } from 'react'
import useAuth from '../hooks/auth.hook'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handlelogin, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handlelogin(email, password)
    setEmail("")
    setPassword("")
  }

  return (
    <div className="bg-background font-body text-on-surface selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden relative ">
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-tertiary/5 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Content */}
      <main className="relative h-full z-10 flex-grow min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Branding Header */}
          <div className="text-center mb-1">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-xl bg-surface-container-high relative">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            </div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface mb-2">Aetheris AI</h1>
            <p className="text-on-surface-variant font-medium tracking-tight">Your AI-powered search assistant</p>
          </div>

          {/* Login Card */}
          <div className="glass-card rounded-2xl p-8 md:p-10 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/10"></div>
                </div>
                <span className="relative bg-transparent px-4 text-xs font-semibold text-outline tracking-widest uppercase">Login</span>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="floating-label-group relative">
                  <input
                    className="block w-full px-4 py-4 bg-surface-container-lowest/50 border-none rounded-xl text-on-surface focus:ring-2 focus:ring-secondary/50 focus:shadow-[0_0_15px_rgba(45,183,242,0.3)] transition-all peer"
                    id="email"
                    placeholder=" "
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none origin-left"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                </div>
                <div className="floating-label-group relative">
                  <input
                    className="block w-full px-4 py-4 bg-surface-container-lowest/50 border-none rounded-xl text-on-surface focus:ring-2 focus:ring-secondary/50 focus:shadow-[0_0_15px_rgba(45,183,242,0.3)] transition-all peer"
                    id="password"
                    placeholder=" "
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none origin-left"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
              </div>

              {/* Primary CTA */}
              <button
                disabled={loading}
                className="w-full py-4 px-6 bg-primary-container text-on-primary-container font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group disabled:opacity-50"
                type="submit"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-on-surface-variant text-sm font-medium">
                Don’t have an account?
                <Link className="text-secondary font-bold hover:underline underline-offset-4 ml-1" to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Cluster */}
      <footer className="relative z-10 w-full py-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto w-full gap-6">
          <p className="font-inter text-sm text-on-surface-variant">© 2024 Aetheris Intelligence. Atmospheric AI Design.</p>
          <div className="flex gap-8">
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Security</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Login
