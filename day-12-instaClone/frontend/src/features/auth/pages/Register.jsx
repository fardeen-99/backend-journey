import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'

// ── Reusable floating label input ─────────────────────────────────────────
const FloatingInput = ({ name, label, type, value, focused, onChange, onFocus, onBlur }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      required
      className={`
        w-full bg-[#121212] border rounded-[4px] text-[12px] text-[#f5f5f5]
        pt-[14px] pb-[2px] px-[8px] h-[38px] outline-none
        transition-all duration-150
        ${focused === name ? 'border-[#a8a8a8]' : 'border-[#363636]'}
      `}
    />
    <label className={`
      absolute left-[9px] pointer-events-none text-[#a8a8a8]
      transition-all duration-150
      ${value || focused === name
        ? 'top-[4px] text-[10px]'
        : 'top-[50%] -translate-y-[50%] text-[12px]'}
    `}>
      {label}
    </label>
  </div>
)

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()
  const { loading, RegisterHandle } = Useauth()

  const inputChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    if (selected) setPreview(URL.createObjectURL(selected))
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('username', form.username)
    formdata.append('email', form.email)
    formdata.append('password', form.password)
    formdata.append('file', file)
    await RegisterHandle(formdata)
    setForm({ username: '', email: '', password: '' })
    navigate('/')
  }

  const isReady = form.username && form.email && form.password && !loading

  return (
    <main className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-4">

      {/* ── Background blobs — identical to Login ── */}
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
        <div className="w-full bg-[#000000] border border-[#262626] rounded-sm px-10 pt-3 pb-3 flex flex-col items-center">

          {/* Wordmark — identical SVG to Login */}
          <svg className="px-2 ml-10 mb-1" width="175" height="68" viewBox="0 0 175 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="42" fontFamily="'Billabong', 'Grand Hotel', cursive" fontSize="46" fill="url(#instaGradR)" letterSpacing="-1">
              DevGram
            </text>
            <defs>
              <linearGradient id="instaGradR" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f09433" />
                <stop offset="25%" stopColor="#e6683c" />
                <stop offset="50%" stopColor="#dc2743" />
                <stop offset="75%" stopColor="#cc2366" />
                <stop offset="100%" stopColor="#bc1888" />
              </linearGradient>
            </defs>
          </svg>

          {/* Tagline */}
          <p className="text-[#a8a8a8] text-sm font-semibold text-center leading-snug mb-4 px-2">
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={submitForm} className="w-full flex flex-col gap-[6px]">

            {/* ── Profile photo upload ── */}
            <div className="flex flex-col items-center mb-3">
              <label htmlFor="fileInput" className="cursor-pointer group flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-2 border-dashed border-[#363636] group-hover:border-[#a8a8a8] transition-colors duration-150 overflow-hidden flex items-center justify-center bg-[#121212]">
                    {preview ? (
                      <img src={preview} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a8a8a8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  {/* Blue plus badge */}
                  <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-[#0095f6] flex items-center justify-center border-2 border-black">
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <span className="text-[#0095f6] text-[12px] font-semibold group-hover:text-white transition-colors">
                  {preview ? 'Change photo' : 'Add profile photo'}
                </span>
              </label>
              <input id="fileInput" type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>

            {/* Username */}
            <FloatingInput
              name="username" label="Username" type="text"
              value={form.username} focused={focused}
              onChange={inputChange}
              onFocus={() => setFocused('username')}
              onBlur={() => setFocused('')}
            />

            {/* Email */}
            <FloatingInput
              name="email" label="Email" type="text"
              value={form.email} focused={focused}
              onChange={inputChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
            />

            {/* Password — with Show/Hide */}
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
                  pt-[14px] pb-[2px] px-[8px] pr-[52px] h-[38px] outline-none
                  transition-all duration-150
                  ${focused === 'password' ? 'border-[#a8a8a8]' : 'border-[#363636]'}
                `}
              />
              <label className={`
                absolute left-[9px] pointer-events-none text-[#a8a8a8]
                transition-all duration-150
                ${form.password || focused === 'password'
                  ? 'top-[4px] text-[10px]'
                  : 'top-[50%] -translate-y-[50%] text-[12px]'}
              `}>
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

            {/* Terms */}
            <p className="text-[11px] text-[#a8a8a8] text-center leading-[1.5] mt-2 px-1">
              By signing up, you agree to our{' '}
              <span className="font-semibold text-[#f5f5f5] cursor-pointer hover:underline">Terms</span>,{' '}
              <span className="font-semibold text-[#f5f5f5] cursor-pointer hover:underline">Privacy Policy</span> and{' '}
              <span className="font-semibold text-[#f5f5f5] cursor-pointer hover:underline">Cookies Policy</span>.
            </p>

            {/* Sign up button — same style as Login's Log in button */}
            <button
              type="submit"
              disabled={!isReady}
              className={`
                mt-2 w-full h-[32px] rounded-lg text-white text-sm font-semibold
                transition-all duration-200 active:scale-[0.98]
                bg-[#0095f6] hover:bg-[#1877f2]
                ${isReady ? 'opacity-100 cursor-pointer' : 'opacity-70 cursor-not-allowed'}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing up…
                </span>
              ) : 'Sign up'}
            </button>
          </form>
        </div>

        {/* ── Login CTA — mirrors Login's Register CTA ── */}
        <div className="w-full bg-[#000000] border border-[#262626] rounded-sm py-4 text-center text-sm text-[#f5f5f5]">
          Have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: '#0095f6' }}>
            Log in
          </Link>
        </div>

        {/* ── App store badges — identical to Login ── */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="flex gap-2">
            <a href="https://apps.apple.com" target="_blank" rel="noreferrer"
              className="border border-[#363636] rounded-lg px-3 py-1.5 bg-[#000000] hover:bg-[#121212] transition-colors">
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
            <a href="https://play.google.com" target="_blank" rel="noreferrer"
              className="border border-[#363636] rounded-lg px-3 py-1.5 bg-[#000000] hover:bg-[#121212] transition-colors">
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

        {/* ── Footer — identical to Login ── */}
        <footer className="mt-2 text-center text-[11px] text-[#a8a8a8] pb-6">
          <p>© 2025 DevGram Made with Love ❤</p>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
      `}</style>
    </main>
  )
}

export default Register