import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'
import { Logout } from '../services/auth.api'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { usePost } from '../../post/hooks/post.hook';
import { FaBookmark } from "react-icons/fa";


const Home = () => {

  const [expand, setexpand] = useState(null)
const navigate=useNavigate()

const toggle=(id)=>{
  setexpand((prev)=>prev===id?null:id)
}
const {user,allpost}=Useauth()

const{likeHandle,unlikeHandle,followHandle,unfollowHandle,saveHandle,unsaveHandle} =usePost()

// const clear=()=>{
// Logout()
// navigate("/register")
// }

  return (
    <>

<section className='h-full w-full max-w-80 m-auto  flex flex-col'>
{
  allpost.map((item)=>{
    return(
      <section className='w-full text-xl capitalize font-semibold pb-6    flex flex-col gap-1'>

      <div className='flex p-3 w-full justify-between items-center text-white'>
        <div className='flex gap-2 items-center'>
          <img className='h-8 rounded-full w-8' src={item.user.profile_image} alt="" />
          <p>{item.user.username}</p>
        </div>
        <button
        onClick={()=>{item.isfollow?unfollowHandle(item.user._id):followHandle(item.user._id)}}
        
        className='px-3 py-1 border-2 border-amber-50 rounded-lg text-white'>{item.isfollow?"following":"follow"}</button>
      </div>
      <div className='flex flex-col w-full gap-2 h-80 text-white'>
<img className='h-full w-full' src={item.post_url} alt="" />
      </div>
      <div className='flex text-xl px-1 pt-1 justify-between w-full text-white'>
<div className='flex gap-3  items-center'
onClick={()=>{item.islike?unlikeHandle(item._id):likeHandle(item._id)}}
>
  {item.islike?<FaHeart className='text-red-500'/>:<FaRegHeart/>}
  <FaRegComment/>
</div>
{item.save?<FaBookmark onClick={()=>unsaveHandle(item._id)}/>:<FaRegBookmark onClick={()=>saveHandle(item._id)}/>}
      </div>
      <div>
        <p className='px-1 flex items-center gap-2 w-full'>
          <span className=''><p className='inline text-white font-normal text-lg'>{item.user.username} ...</p>{" "}
          <p className='text-zinc-500 inline text-sm self-end'>  {
              item._id===expand?item.caption:item.caption.slice(0,5)
            }</p>
          </span >
         {
            item.caption.length>5 &&(
 <span className='text-blue-400 text-[13px] inline self-end'
 onClick={()=>toggle(item._id)}
 >
  {expand===item._id?"  less":"  ...more"}
 </span>
            )}

        </p>
      </div>
      </section>
    )
  })
}
</section>


    </>
  )
}

export default Home