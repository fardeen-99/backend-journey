import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Useauth } from '../hooks/auth.hook'
import { Logout } from '../services/auth.api'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { usePost } from '../../post/hooks/post.hook';
import { CiCirclePlus } from "react-icons/ci";
import StoryHub from '../../post/components/StoryHub';

import { GoPlus } from "react-icons/go";


const Home = () => {

  const [expand, setexpand] = useState(null)
  const [play, setplay] = useState(null)
  const [sound, setsound] = useState(null)
const navigate=useNavigate()

const toggle=(id)=>{
  setexpand((prev)=>prev===id?null:id)
}
const {user,allpost,handlegetallpost}=Useauth()

const{likeHandle,unlikeHandle,followHandle,unfollowHandle,saveHandle,unsaveHandle} =usePost()

// const clear=()=>{
// Logout()
// navigate("/register")
// }

useEffect(()=>{
  handlegetallpost()
},[])
const soundsytem=(id)=>{
  if(play===id){
    setplay(null)
setsound(null)
  }else{
    setplay(id)
    setsound(id)

  }
}
  return (
    <>

<nav className='flex justify-between md:hidden items-center p-2 text-white  w-full'>
  <GoPlus className='text-4xl'/>
  <img src="/devgram2.png" className='w-full h-20 object-cover' alt="" />
  <FaRegHeart className='text-2xl'/>
</nav>

<section className='text-white p-3 pt-0 md:pt-2 md:mt-2 w-full flex gap-3 overflow-y-scroll'>
  <div className='flex  flex-col gap-1 relative shrink-0'>
    <img src={user.profile_image} className=' ml-1 h-20 w-20 rounded-full ' alt="" />
    <span className='text-start w-full text-sm font-semibold'>{user.username.slice(0,10)}
      <span className='text-start w-full text-sm font-semibold'>{user.username.length>10 &&"..."}</span>
      </span>
 <CiCirclePlus className='text-xl absolute bottom-7 left-17 bg-white text-black rounded-full' />
  </div>

<StoryHub/>

</section>

<section className=' w-full max-w-100 m-auto  flex flex-col '>
{/* <div className='w-full h-full flex items-center py-3 px-3 justify-between border-b border-zinc-700'>
  <p className='text-white  '>Suggested for you</p>
  <p className='text-blue-700  cursor-pointer'>older Post</p>
  </div> */}

{
  allpost.map((item)=>{
    return(
      <section key={item._id} className='w-full text-xl capitalize font-semibold pb-6    flex flex-col gap-1'>

      <div className='flex pt-3 px-2 pb-2 w-full justify-between items-center text-white'>
        <div className='flex gap-2 '>
          <img className='h-8 rounded-full w-8' src={item.user.profile_image} alt="" />
          <p>{item.user.username}</p>
        </div>
        <button
        onClick={()=>{item.isfollow?unfollowHandle(item.user._id):followHandle(item.user._id)}}
        
        className='px-3 py-1 text-sm border-2 active:scale-95 transition-all duration-200 ease-in-out capitalize border-amber-50 rounded-lg text-white'>{item.isfollow?"following":"follow"}</button>
      </div>
      <div className='flex flex-col w-full gap-2 h-100 text-white relative'
      
      >
{
  item.mediatype==="non-image"?(
<video
muted={item._id !== play}
onClick={()=>soundsytem(item._id)}
autoPlay loop
className='h-full w-full object-cover' src={item.post_url} alt="" />

  ):(
    <img src={item.post_url} className='h-full w-full object-cover' alt="" />
  )
}
<div className='absolute top-2 right-2'
onClick={()=>soundsytem(item._id)}
>{item.mediatype==="non-image" &&( item._id===sound?<img src='sound.png' className='h-6 text-white' />:<img src='mute.png' className='h-7'/> )}</div>
      </div>
      <div className='flex text-xl px-1 pt-1 justify-between w-full text-white'>
<div className='flex   items-center'
onClick={()=>{item.islike?unlikeHandle(item._id):likeHandle(item._id)}}
>
  {item.islike?<FaHeart className='text-red-500'/>:<FaRegHeart/>}
  <p className='text-[12px] px-2'>
{item.likecount>0?item.likecount:""}
  </p>
      <svg
        onClick={()=>navigate(`/feed/${item._id}`)}
      fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
                      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"></path>
                    </svg>
  <p className='text-[12px] px-2'>
{item.commentcount>0?item.commentcount:""}
  </p>
</div>
{item.save?<FaBookmark onClick={()=>unsaveHandle(item._id)}/>:<FaRegBookmark onClick={()=>saveHandle(item._id)}/>}
      </div>
      <div>
        <span className='px-1 flex items-center gap-2 w-full'>
          <span className=''><span className='inline text-white font-normal text-lg'>{item.user.username} ...</span>{" "}
          <span className='text-zinc-500 inline text-sm self-end'>  {
              item._id===expand?item.caption:item.caption.slice(0,5)
            }</span>
          </span >
         {
            item.caption.length>5 &&(
 <span className='text-blue-400 text-[13px] inline self-end'
 onClick={()=>toggle(item._id)}
 >
  {expand===item._id?"  less":"  ...more"}
 </span>
            )}

        </span>
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