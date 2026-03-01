import React from 'react'
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
    const{id}=useParams()
    console.log(id)
    const{detailpostHandle,singlepost}=usePost()

    const singlepostHandle=async()=>{
        const res=await detailpostHandle(id)
      }
      useEffect(()=>{
        singlepostHandle()
      },[id])
      return (
        <div className="w-[90%] h-full flex  items-center">
      {singlepost?.post_url && (
        <>
        <div>

        <img src={singlepost.post_url} alt="detailpost" className='rounded-lg'  />
<div className='flex gap-2'>
  <span><FaRegHeart /> {singlepost.likecount}</span>
  <span><FaRegBookmark /> {singlepost.savecount}</span>
</div>

        </div>
       <div>
        <p>{singlepost.user.username}</p>
        <p>{singlepost.caption}</p>
       </div>
    </>
      )}
    </div>
  )
}

export default DetailPost