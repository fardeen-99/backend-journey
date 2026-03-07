import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [focused, setFocused] = useState('')
    const navigate = useNavigate()
    const { Loginhandle, loading } = Useauth()

    const inputChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        await Loginhandle(form)
        setForm({ username: '', password: '' })
        navigate('/')
    }

    return (
        <main className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-4">

            {/* ── Animated gradient background blobs ── */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div
                    className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #f09433, #e6683c, #dc2743)' }}
                />
                <div
                    className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #bc2a8d, #833ab4, #405de6)' }}
                />
            </div>

            <div className="w-full max-w-[350px] flex flex-col items-center gap-3">

                {/* ── Card ── */}
                <div className="w-full bg-[#000000] border border-[#262626] sm:bg-[#000000] rounded-sm px-10 pt-3 pb-6 flex flex-col items-center">

                    {/* Instagram wordmark — SVG so no image dependency */}
                 <svg
            className="px-2 ml-3 mb-3"
            width="175"
            height="68"
            viewBox="0 0 175 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="42"
              fontFamily="'Billabong', 'Grand Hotel', cursive"
              fontSize="46"
              fill="url(#instaGrad)"
              letterSpacing="-1"
            >
              DevGram
            </text>
            <defs>
              <linearGradient id="instaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f09433" />
                <stop offset="25%" stopColor="#e6683c" />
                <stop offset="50%" stopColor="#dc2743" />
                <stop offset="75%" stopColor="#cc2366" />
                <stop offset="100%" stopColor="#bc1888" />
              </linearGradient>
            </defs>
          </svg>


                    {/* ── Form ── */}
                    <form onSubmit={submitForm} className="w-full flex flex-col gap-[6px]">

                        {/* Username input */}
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={inputChange}
                                onFocus={() => setFocused('username')}
                                onBlur={() => setFocused('')}
                                required
                                className={`
                  w-full bg-[#121212] border rounded-[4px] text-[12px] text-[#f5f5f5]
                  pt-[14px] pb-[2px] px-[8px] h-[38px] outline-none placeholder-[#a8a8a8]
                  transition-all duration-150
                  ${focused === 'username' ? 'border-[#a8a8a8]' : 'border-[#363636]'}
                `}
                            />
                            <label
                                className={`
                  absolute left-[9px] pointer-events-none text-[#a8a8a8]
                  transition-all duration-150
                  ${form.username || focused === 'username'
                                        ? 'top-[4px] text-[10px]'
                                        : 'top-[50%] -translate-y-[50%] text-[12px]'}
                `}
                            >
                                username
                            </label>
                        </div>

                        {/* Password input */}
                        <div className="relative">
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                value={form.password}
                                onChange={inputChange}
                                onFocus={() => setFocused('password')}
                                onBlur={() => setFocused('')}
                                required
                                className={`
                  w-full bg-[#121212] border rounded-[4px] text-[12px] text-[#f5f5f5]
                  pt-[14px] pb-[2px] px-[8px] pr-[52px] h-[38px] outline-none placeholder-[#a8a8a8]
                  transition-all duration-150
                  ${focused === 'password' ? 'border-[#a8a8a8]' : 'border-[#363636]'}
                `}
                            />
                            <label
                                className={`
                  absolute left-[9px] pointer-events-none text-[#a8a8a8]
                  transition-all duration-150
                  ${form.password || focused === 'password'
                                        ? 'top-[4px] text-[10px]'
                                        : 'top-[50%] -translate-y-[50%] text-[12px]'}
                `}
                            >
                                Password
                            </label>
                            {form.password && (
                                <button
                                    type="button"
                                    onClick={() => setShowPass((p) => !p)}
                                    className="absolute right-[10px] top-[50%] -translate-y-[50%] text-[14px] font-semibold text-[#f5f5f5] hover:text-[#a8a8a8] transition-colors"
                                >
                                    {showPass ? 'Hide' : 'Show'}
                                </button>
                            )}
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            disabled={loading || !form.username || !form.password}
                            className={`
                mt-2 w-full h-[32px] rounded-lg text-white text-sm font-semibold
                transition-all duration-200 active:scale-[0.98]
                bg-[#0095f6] hover:bg-[#1877f2]
                ${form.username && form.password && !loading
                                    ? 'opacity-100 cursor-pointer'
                                    : 'opacity-70 cursor-not-allowed'}
              `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Logging in…
                                </span>
                            ) : 'Log in'}
                        </button>

                        {/* OR divider */}
                        <div className="flex items-center gap-3 my-2">
                            <div className="flex-1 h-px bg-[#363636]" />
                            <span className="text-[13px] font-semibold text-[#a8a8a8]">OR</span>
                            <div className="flex-1 h-px bg-[#363636]" />
                        </div>

                        {/* Facebook login */}
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 text-[#e0f1ff] text-sm font-semibold hover:text-[#ffffff] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#e0f1ff">
                                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                            </svg>
                            Log in with Facebook
                        </button>

                        {/* Forgot password */}
                        {/* <Link
              to="/forgot"
              className="text-center text-xs text-[#385185] mt-1 hover:underline"
            >
              Forgot password?
            </Link> */}
                    </form>
                </div>

                {/* ── Register CTA card ── */}
                <div className="w-full bg-[#000000] border border-[#262626] sm:bg-[#000000] rounded-sm py-4 text-center text-sm text-[#f5f5f5]">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-semibold hover:underline"
                        style={{ color: '#0095f6' }}
                    >
                        Sign up
                    </Link>
                </div>

                {/* ── App store badges ── */}
                <div className="flex flex-col items-center gap-3 mt-2">
                    <p className="text-sm text-[#f5f5f5]">Get the app.</p>
                    <div className="flex gap-2">
                        <a
                            href="https://apps.apple.com"
                            target="_blank"
                            rel="noreferrer"
                            className="border border-[#363636] rounded-lg px-3 py-1.5 bg-[#000000] hover:bg-[#121212] transition-colors"
                        >
                            <div className="flex items-center gap-1.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5f5f5">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div>
                                    <div className="text-[8px] text-[#f5f5f5] leading-none">Download on the</div>
                                    <div className="text-[11px] font-semibold text-[#f5f5f5] leading-tight">App Store</div>
                                </div>
                            </div>
                        </a>
                        <a
                            href="https://play.google.com"
                            target="_blank"
                            rel="noreferrer"
                            className="border border-[#363636] rounded-lg px-3 py-1.5 bg-[#000000] hover:bg-[#121212] transition-colors"
                        >
                            <div className="flex items-center gap-1.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5f5f5">
                                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-3.18-3.18L3.18 23.76zM20.47 10.6L17.6 9l-3.48 3.48 3.48 3.48 2.9-1.62c.83-.46.83-1.68-.03-2.14zM2.01 1.05C1.86 1.3 1.77 1.6 1.77 1.94v20.12c0 .34.09.64.24.89l.12.11 11.27-11.27v-.26L2.13.94l-.12.11zM13.43 8.07l-9.24-9.24-.13.11 12.6 12.6.13-.11L13.43 8.07z" />
                                </svg>
                                <div>
                                    <div className="text-[8px] text-[#f5f5f5] leading-none">Get it on</div>
                                    <div className="text-[11px] font-semibold text-[#f5f5f5] leading-tight">Google Play</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* ── Footer ── */}
                <footer className="mt-4 text-center text-[11px] text-[#a8a8a8] space-y-2 pb-6">
                    {/* <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {['Meta','About','Blog','Jobs','Help','API','Privacy','Terms','Locations','Instagram Lite','Threads','Contact Uploading & Non-Users'].map((l) => (
              <a key={l} href="#" className="hover:underline">{l}</a>
            ))}
          </div> */}
                    <p>© 2025 DevGram Made with Love ❤</p>
                </footer>
            </div>

            {/* Google Font for the wordmark fallback */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
      `}</style>
        </main>
    )
}

export default Login