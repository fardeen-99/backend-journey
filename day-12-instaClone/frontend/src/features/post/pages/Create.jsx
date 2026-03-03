import React, { useRef, useState } from 'react'
import { usePost } from '../hooks/post.hook'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const { uploadHandle } = usePost()
  const refu = useRef()
  const navigate = useNavigate()

  const clickable = () => {
    refu.current.click()
  }

  const submitUpload = async (e) => {
    e.preventDefault()
    const formset = new FormData()
    formset.append("file", file)
    formset.append("caption", caption)
    await uploadHandle(formset)
    navigate("/")
  }

  const [file, setfile] = useState(null)
  const [caption, setcaption] = useState("")

  return (
    <div className='h-full w-full flex items-center justify-center bg-[#0C1014] relative overflow-hidden'>

      {/* Background glow effects */}
      <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none'
        style={{ background: 'radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%)' }} />
      <div className='absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none'
        style={{ background: 'radial-gradient(circle, rgba(66,153,225,0.05) 0%, transparent 70%)' }} />

      {/* Grid texture */}
      <div className='absolute inset-0 pointer-events-none opacity-30'
        style={{
          backgroundImage: 'linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

      <form
        className='relative z-10 flex flex-col items-center justify-center gap-5 w-full max-w-md px-4'
        onSubmit={submitUpload}
      >

        {/* Header */}
        <div className='text-center mb-2'>
          <h2 className='text-white text-2xl font-bold tracking-widest uppercase'
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.2em' }}>
            New Post
          </h2>
          <div className='mt-2 h-px w-24 mx-auto'
            style={{ background: 'linear-gradient(90deg, transparent, rgba(99,179,237,0.6), transparent)' }} />
        </div>

        {/* Upload Card */}
        <div className='w-full rounded-2xl p-px'
          style={{ background: 'linear-gradient(135deg, rgba(99,179,237,0.25), rgba(66,153,225,0.05), rgba(99,179,237,0.1))' }}>
          <div className='rounded-2xl p-6 flex flex-col items-center gap-5'
            style={{ background: 'rgba(12,16,20,0.95)' }}>

            {/* File Drop Zone */}
            <label htmlFor="file" className='text-xs font-semibold tracking-widest uppercase text-blue-300 mb-1'
              style={{ letterSpacing: '0.15em' }}>
              Upload File
            </label>

            <div
              onClick={clickable}
              className='relative flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer transition-all duration-300 w-full py-8 group'
              style={{
                border: '2px dashed rgba(99,179,237,0.25)',
                background: 'rgba(99,179,237,0.03)',
              }}
            >
              {/* Hover glow */}
              <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                style={{ background: 'rgba(99,179,237,0.05)' }} />

              <input
                type="file"
                id='file'
                ref={refu}
                hidden
                onChange={(e) => setfile(e.target.files[0])}
              />

              <img
                src="/inbox.png"
                className='h-24 active:scale-95 transition-all duration-200 relative z-10 group-hover:scale-105'
                style={{ filter: 'drop-shadow(0 0 12px rgba(99,179,237,0.3))' }}
                alt=""
              />

              {file ? (
                <span className='text-blue-300 text-sm font-medium relative z-10 tracking-wide'>
                  ✓ {file.name}
                </span>
              ) : (
                <span className='text-white/30 text-xs relative z-10 tracking-widest uppercase'>
                  Click to browse
                </span>
              )}
            </div>

            {/* Caption Input */}
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="caption"
                className='text-xs font-semibold tracking-widest uppercase text-blue-300'
                style={{ letterSpacing: '0.15em' }}>
                Caption
              </label>
              <input
                type="text"
                value={caption}
                id="caption"
                onChange={(e) => setcaption(e.target.value)}
                placeholder='Write something...'
                className='w-full px-4 py-3 rounded-xl text-white font-medium outline-0 capitalize transition-all duration-200'
                style={{
                  background: 'rgba(99,179,237,0.05)',
                  border: '1px solid rgba(99,179,237,0.2)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                }}
                onFocus={e => {
                  e.target.style.border = '1px solid rgba(99,179,237,0.5)'
                  e.target.style.boxShadow = '0 0 16px rgba(99,179,237,0.1)'
                }}
                onBlur={e => {
                  e.target.style.border = '1px solid rgba(99,179,237,0.2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <button
          className='w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase active:scale-95 transition-all duration-200 relative overflow-hidden group'
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: '#fff',
            letterSpacing: '0.2em',
            boxShadow: '0 0 24px rgba(59,130,246,0.3)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <span className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)' }} />
          <span className='relative z-10'>Upload Post</span>
        </button>

      </form>

      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  )
}

export default Create