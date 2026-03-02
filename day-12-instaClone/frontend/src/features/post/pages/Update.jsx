import { useNavigate, useParams } from "react-router-dom"
import { usePost } from "../hooks/post.hook"
import { useState } from "react"

const Update = () => {
    const {id}=useParams()
    const navigate=useNavigate()
const[form,setform]=useState({
    username:"",
    bio:""
})
const [file,setfile]=useState(null)

    const {updateHandle}=usePost()
    const submitForm=async(e)=>{
        e.preventDefault()
        const formset=new FormData()
        formset.append("username",form.username)
        formset.append("bio",form.bio)
        formset.append("file",file)
        await updateHandle(id,formset)
        navigate("/profile")
    }
    return (
        <>
        <div className="h-full w-full flex relative items-center justify-center">
        <button onClick={()=>navigate(-1)} className="absolute top-5 right-5 bg-zinc-900 text-white  px-10 py-3 font-bold rounded-xl">back</button>
            <form className='flex flex-col gap-5 w-[90%] max-w-100 m-auto' onSubmit={submitForm}>
                <h1 className='text-6xl px-5 text-center md:text-start font-semibold text-white'>Update</h1>
                <div className='flex gap-2 flex-col'>

                <input type="file" placeholder='profile_image' className='w-full p-4 outline-none rounded-xl bg-zinc-900 text-white' 
                onChange={(e)=>setfile(e.target.files[0])}
                />
                <input type="text" placeholder='username' className='w-full p-4 outline-none rounded-xl bg-zinc-900 text-white' 
                value={form.username}
                onChange={(e)=>setform({...form,username:e.target.value})}
                />
                <input type="text" placeholder='bio' className='w-full p-4 outline-none rounded-xl bg-zinc-900 text-white' 
                value={form.bio}
                onChange={(e)=>setform({...form,bio:e.target.value})}
                />
                <button type="submit" className='w-full p-4 rounded-xl bg-yellow-600 font-bold text-white'>Update</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Update