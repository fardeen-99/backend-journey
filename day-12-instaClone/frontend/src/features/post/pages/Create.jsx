import React, { useRef, useState } from 'react'
import { usePost } from '../hooks/post.hook'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const { uploadHandle } = usePost()
  const refu = useRef()
  const navigate = useNavigate()

  const [file, setfile] = useState(null)
  const [caption, setcaption] = useState("")
  const [preview, setpreview] = useState(null)
  const [fileType, setfileType] = useState("")

  const handleFile = (e) => {
    const selected = e.target.files[0]

    if (!selected) return

    setfile(selected)

    const url = URL.createObjectURL(selected)
    setpreview(url)

    if (selected.type.startsWith("image")) {
      setfileType("image")
    } else if (selected.type.startsWith("video")) {
      setfileType("video")
    }
  }

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

  return (
    <div className='h-full w-full flex items-center justify-center bg-[#0C1014]'>

      <form
        className='flex flex-col items-center justify-center gap-2 w-full max-w-md px-4'
        onSubmit={submitUpload}
      >

        <h2 className='text-white text-2xl font-bold tracking-widest uppercase'>
          New Post
        </h2>

        <div className='w-full rounded-2xl p-6 flex flex-col items-center gap-5 bg-[#0C1014]'>

          <label className='text-xs font-semibold tracking-widest uppercase text-blue-300'>
            Upload File
          </label>

          {/* PREVIEW */}
          {preview ? (

            <div
              onClick={clickable}
              className='w-full flex flex-col items-center gap-3 cursor-pointer active:scale-95'
            >

              {fileType === "image" && (
                <img
                  src={preview}
                  className='h-60 w-full object-contain rounded-lg'
                  alt=""
                />
              )}

              {fileType === "video" && (
                <video
                  src={preview}
                  autoPlay
                  className='h-60 w-full object-contain rounded-lg'
                />
              )}

              <span className='text-white/40 text-xs uppercase'>
                Click to change
              </span>

            </div>

          ) : (

            <div
              onClick={clickable}
              className='flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer w-full py-8 border-2 border-dashed border-blue-400/30'
            >

              <img
                src="/inbox.png"
                className='h-20'
                alt=""
              />

              <span className='text-white/40 text-xs uppercase'>
                Click to browse
              </span>

            </div>

          )}

          <input
            type="file"
            ref={refu}
            hidden
            onChange={handleFile}
            accept="image/*,video/*"
          />

          {/* CAPTION */}
          <div className='w-full flex flex-col gap-2'>
            <label className='text-xs font-semibold tracking-widest uppercase text-blue-300'>
              Caption
            </label>

            <input
              type="text"
              value={caption}
              required
              onChange={(e) => setcaption(e.target.value)}
              placeholder='Write something...'
              className='w-full px-4 py-3 rounded-xl text-white outline-none bg-[#11161b] border border-blue-400/20'
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          className='w-[90%] m-auto py-3 active:scale-95 rounded-xl font-bold text-sm tracking-widest uppercase bg-blue-600 text-white'
        >
          Upload Post
        </button>

      </form>

    </div>
  )
}

export default Create