import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { usePost } from '../hooks/post.hook'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
const DetailPost = () => {

  const [sound,setSound]=useState(null)
  const [comment,setComment]=useState("")
    const{id}=useParams()
    console.log(id)
    const{detailpostHandle,singlepost,commentHandle}=usePost()

    const singlepostHandle=async()=>{
        const res=await detailpostHandle(id)
      }
      useEffect(()=>{
        singlepostHandle()
      },[id])

const soundHandle=(id)=>{
  setSound(prev=>prev===id?null:id)
}

      const submitcomment=async(e)=>{
        e.preventDefault()
        console.log(comment)
        const res=await commentHandle(id,comment)
        setComment("")
      }
      return (
        <section className="w-full h-dvh flex flex-col md:flex-row items-center ">
      {singlepost?.post_url && (
        <>
        <div className=' w-full h-full flex flex-col md:w-[60%] bg-[#0C1014] ' key={singlepost._id}  >

<div className='flex gap-4 items-start p-3 shrink-0'>
  <img src={singlepost.user.profile_image} className='h-10 w-10 rounded-full' alt="" />
  <p className='text-white text-2xl' >{singlepost.user.username}</p>
</div>
<div className='flex-1 min-h-0'>
{
  singlepost.mediatype==="image" ? (
    <img src={singlepost.post_url} alt="detailpost" className='rounded-lg  h-full w-full object-cover '  />
  ) : (
    <video src={singlepost.post_url} autoPlay loop muted={sound!==singlepost._id} alt="detailpost" className='rounded-lg  h-full w-full object-cover ' 
    onClick={()=>soundHandle(singlepost._id)}
    />
  )
}
</div>
{/* <div className='flex gap-2 text-white text-3xl'>
  <span><FaRegHeart /> {singlepost.likecount}</span>
  <span><FaRegBookmark /> {singlepost.savecount}</span>
</div> */}

        </div>
       <div className='h-full flex-1 flex flex-col bg-[#0C1014] relative overflow-y-scroll '>
<h1 className='text-white h-10 font-bold text-center text-2xl p-3'>Comments Section</h1>

<div className='flex flex-col gap-2 p-3 flex-1 overflow-y-scroll'>
    {
      singlepost.comment?.map((item)=>{

        return(
          <>
          <section className='flex gap-2 items-center p-3'>

          <div>
            <img src={item.user.profile_image} className='h-10 w-10 rounded-full' alt="" />
          </div>
          <div className='flex flex-col self-start'>
<p className='text-zinc-700 text-xl'>{item.user.username}</p>
<p className='text-white text-lg'>{item.comment}</p>
          </div>
          </section>

          </>
        )
      })
    }
</div>
<div className='h-20'>

        <form
        onSubmit={submitcomment}
        className='absolute bottom-2 right-2 flex gap-2 items-center capitalize  w-[90%] m-auto text-white text-lg font-semibold '>
          <input type="text" placeholder='Add comment' className='w-full border px-3 border-gray-300 outline-none py-3  rounded-xl' value={comment} onChange={(e)=>setComment(e.target.value)} />
          <button className='rounded-xl bg-yellow-600 px-6 py-3'>Post</button>
        </form>
</div>
       </div>
    </>
      )}
    </section>
  )
}

export default DetailPost