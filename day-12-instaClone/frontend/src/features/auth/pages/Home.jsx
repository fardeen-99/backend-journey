import React, { useEffect, useRef, useState } from 'react'
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
import Caption from '../../post/components/Caption';


const Home = () => {

  const [expand, setexpand] = useState(null)
  const [play, setplay] = useState(null)
  const [sound, setsound] = useState(null)
  const navigate = useNavigate()

  const toggle = (id) => {
    setexpand((prev) => prev === id ? null : id)
  }
  const { user, allpost, handlegetallpost } = Useauth()

  const { likeHandle, unlikeHandle, followHandle, unfollowHandle, saveHandle, unsaveHandle } = usePost()

  console.log(user)
  console.log(allpost)

  // const clear=()=>{
  // Logout()
  // navigate("/register")
  // }

  useEffect(() => {
    handlegetallpost()
  }, [])
  const soundsytem = (id) => {
    if (play === id) {
      setplay(null)
      setsound(null)
    } else {
      setplay(id)
      setsound(id)

    }
  }
  const scrollRef = useRef(null)

const scrollRight = () => {
  scrollRef.current.scrollBy({
    left: 200,
    behavior: "smooth"
  })
}

const scrollLeft = () => {
  scrollRef.current.scrollBy({
    left: -200,
    behavior: "smooth"
  })
}
  return (
    <>

      <nav className='flex justify-between md:hidden items-center mt-1 p-2 text-white  w-full'>
        <GoPlus className='text-4xl'
          onClick={() => navigate("/create")}
        />
        <img src="/devgram2.png" className='w-full h-15 object-cover devgram' alt="" />
        <FaRegHeart className='text-2xl mr-1' 
        onClick={()=>navigate("/buy_A_coffee")}
        />
      </nav>

      <section 
        ref={scrollRef}
      className='text-white p-3 mt-2  
      transform relative
      pt-0 md:pt-2 md:mt-2 w-full flex gap-3 overflow-x-scroll'>
        <div className='flex  flex-col gap-1 relative shrink-0 '
        onClick={()=>navigate(`/profile`)}
        >
          <img src={user.profile_image} className='shrink-0 ml-1 h-20 w-20 object-cover rounded-full ' alt="" />
          <span className='text-center w-full text-sm font-semibold'>{user.username.slice(0, 10)}
            <span className='text-center w-full text-sm font-semibold'>{user.username.length > 10 && "..."}</span>
          </span>
          <CiCirclePlus className='text-xl absolute bottom-7 left-17 bg-white text-black rounded-full' />
        </div>

        <StoryHub />
      </section>
        <button
  onClick={scrollLeft}
  className="text-white absolute md:block hidden left-0 top-10  bg-gray-800/50 px-1 rounded shrink-0"
>
←
</button>

<button
  onClick={scrollRight}
  className="text-white absolute md:block hidden right-0 top-10  bg-gray-800/50 px-3 rounded shrink-0"
>
  →
</button>

      <section className=' w-full max-w-120 md:max-w-100 m-auto  flex flex-col '>
        {/* <div className='w-full h-full flex items-center py-3 px-3 justify-between border-b border-zinc-700'>
  <p className='text-white  '>Suggested for you</p>
  <p className='text-blue-700  cursor-pointer'>older Post</p>
  </div> */}

        {
          allpost.map((item) => {
            return (
              <section key={item._id} className='w-full text-xl capitalize font-semibold pb-6    flex flex-col gap-1'>

                <div className='flex pt-3 px-2 pb-2 w-full justify-between items-center text-white'>
                  <div className='flex gap-2 items-center '
                  onClick={()=>navigate(`/personprofile/${item.user._id}`)}
                  >
                    <img className='h-8 rounded-full w-8 shrink-0' src={item.user.profile_image} alt="" />
                    <p>{item.user.username}</p>
                  </div>
                  <button
                    onClick={() => { item.isfollow ? unfollowHandle(item.user._id) : followHandle(item.user._id) }}

                    className='px-3 py-1 text-sm border-2 active:scale-95 transition-all duration-200 ease-in-out capitalize border-amber-50 rounded-lg text-white'
                    style={{ display: user.id === item.user._id ? "none" : "block" }}
                  >{item.isfollow ? "following" : "follow"}</button>
                </div>
                <div className='flex flex-col w-full gap-2 h-100 text-white relative'

                >
                  {
                    item.mediatype === "non-image" ? (
                      <video
                        muted={item._id !== play}
                        onClick={() => soundsytem(item._id)}
                        autoPlay loop
                        className='h-full w-full object-cover' src={item.post_url} alt="" />

                    ) : (
                      <img src={item.post_url} className='h-full w-full object-cover' alt="" />
                    )
                  }
                  <div className='absolute top-2 right-2'
                    onClick={() => soundsytem(item._id)}
                  >{item.mediatype === "non-image" && (item._id === sound ? <img src='sound.png' className='h-6 text-white' /> : <img src='mute.png' className='h-7' />)}</div>
                </div>
                <div className='flex text-xl px-1 pt-1 justify-between w-full text-white'>
                  <div className='flex items-center gap-1'>

                    {/* Like Button */}
                    <div className='flex items-center cursor-pointer active:scale-95 transition-all'
                      onClick={(e) => {
                        e.stopPropagation()
                        item.islike ? unlikeHandle(item._id) : likeHandle(item._id)
                      }}
                    >
                      {item.islike ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
                      <p className='text-[12px] px-2'>
                        {item.likecount > 0 ? item.likecount : ""}
                      </p>
                    </div>

                    {/* Comment Button */}
                    <div className='flex items-center cursor-pointer active:scale-95 transition-all'
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/feed/${item._id}`)
                      }}
                    >
                      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                      <p className='text-[12px] px-2'>
                        {item.commentcount > 0 ? item.commentcount : ""}
                      </p>
                    </div>

                  </div>
                  {item.save ? <FaBookmark onClick={() => unsaveHandle(item._id)} /> : <FaRegBookmark onClick={() => saveHandle(item._id)} />}
                </div>

                <Caption item={item} expand={expand} toggle={toggle} />

              </section>
            )
          })
        }
      </section>


    </>
  )
}

export default Home