import React, { useRef, useState } from 'react'
import { usePost } from '../hooks/post.hook'
import { useNavigate } from 'react-router-dom'

const Create = () => {

const {uploadHandle}=usePost()

const refu=useRef()
const navigate=useNavigate()
const clickable=()=>{
    refu.current.click()
}

const submitUpload=async(e)=>{
    e.preventDefault()
    const formset=new FormData()

    formset.append("file",file)
    formset.append("caption",caption)
     await uploadHandle(formset)
     navigate("/")
}

    const [file, setfile] = useState(null)
    const [caption, setcaption] = useState("")
  return (
    <div className='h-full w-full flex items-center justify-center'>

<form className='flex flex-col items-center justify-center gap-4'
onSubmit={submitUpload}
>
    <div className='flex flex-col items-center justify-center gap-2 border-2 border-dotted border-amber-100 p-8 rounded-xl'>
<label htmlFor="file" className='text-white font-semibold'>upload File</label>
        <div className='flex flex-col  items-center justify-center gap-2'>
            
<input type="file" id='file' ref={refu} hidden onChange={(e)=>setfile(e.target.files[0])} />

    <img src="/inbox.png" onClick={clickable} className='h-49 active:scale-95' alt="" />
        </div>
        <div>
<label htmlFor="caption" className='text-white font-semibold px-1'>Caption</label>
<input type="text" value={caption} id="caption" onChange={(e)=>setcaption(e.target.value)} className='px-2 w-full py-3 rounded-xl border-2 border-amber-100 mt-2 text-white font-medium outline-0 capitalize ' />
        </div>
    </div>
<button className='bg-yellow-500 w-full py-2 text-center font-bold rounded-xl text-white capitalize text-2xl active:scale-95'>
    Upload
</button>
</form>

    </div>
  )
}

export default Create