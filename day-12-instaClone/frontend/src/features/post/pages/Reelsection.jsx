import { Useauth } from "../../auth/hooks/auth.hook"
import { useEffect, useState } from "react"
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { usePost } from "../../post/hooks/post.hook";
import { useNavigate } from "react-router-dom";

const Reelsection = () => {

  const [expand, setexpand] = useState(null)
  const [play, setplay] = useState(null)
  const [sound, setsound] = useState(null)
  const navigate = useNavigate()

  const toggle = (id) => {
    setexpand((prev) => prev === id ? null : id)
  }

  const { user, allpost, handlegetallpost } = Useauth()
  const { likeHandle, unlikeHandle, followHandle, unfollowHandle, saveHandle, unsaveHandle } = usePost()

  useEffect(() => {
    handlegetallpost()
  }, [])
console.log(user)
console.log(allpost)
  const soundsytem = (id) => {
    if (play === id) {
      setplay(null)
      setsound(null)
    } else {
      setplay(id)
      setsound(id)
    }
  }

  return (
    <div className="w-full max-w-100 m-auto h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth flex flex-col relative">

      {
        allpost?.filter((post) => post.mediatype === "non-image").map((item) => {
          return (
            <section
              key={item._id}
              className='w-full h-screen snap-start relative text-xl capitalize font-semibold flex flex-col gap-1'
            >

              {/* User Info */}
              <div className='flex pt-3 px-2 pb-2 w-full absolute bottom-10 z-10 items-center  gap-2 text-white'>
                <div className='flex gap-2 items-center'>
                  <img className='h-8 rounded-full w-8' src={item.user.profile_image} alt="" />
                  <p>{item.user.username}</p>
                </div>

                <button
                  onClick={() => {
                    item.isfollow
                      ? unfollowHandle(item.user._id)
                      : followHandle(item.user._id)
                  }}
                  className={`${item.user.username===user.username?"hidden":""} px-3 py-1 text-sm border-2 active:scale-95 transition-all duration-200 ease-in-out capitalize border-amber-50 rounded-lg text-white`}
                >
                  {item.isfollow ? "following" : "follow"}
                </button>
              </div>

              {/* Video Section */}
              <div className='flex flex-col w-full h-full text-white relative'>

                <video
                  muted={item._id !== play}
                  onClick={() => soundsytem(item._id)}
                  autoPlay
                  loop
                  className='h-300 w-full object-cover '
                  src={item.post_url}
                />

                {/* Sound Icon */}
                <div
                  className='absolute top-2 right-2 cursor-pointer'
                  onClick={() => soundsytem(item._id)}
                >
                  {
                    item._id === sound
                      ? <img src='sound.png' className='h-6' />
                      : <img src='mute.png' className='h-7' />
                  }
                </div>

                {/* Right Side Icons */}
                <div className='flex text-2xl gap-4 px-2 flex-col absolute bottom-10 right-2 text-white'>

                  {/* Like */}
                  <div
                    className='flex flex-col gap-1 items-center cursor-pointer'
                    onClick={() => {
                      item.islike
                        ? unlikeHandle(item._id)
                        : likeHandle(item._id)
                    }}
                  >
                    {item.islike
                      ? <FaHeart className='text-red-500' />
                      : <FaRegHeart />
                    }

                    <p className='text-[12px]'>
                      {item.likecount > 0 ? item.likecount : ""}
                    </p>
                  </div>

                  {/* Comment */}
                  <div
                    className='flex flex-col gap-1 items-center cursor-pointer'
                    onClick={() => navigate(`/feed/${item._id}`)}
                  >
                    <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"></path>
                    </svg>

                    <p className='text-[12px]'>
                      {item.commentcount > 0 ? item.commentcount : ""}
                    </p>
                  </div>

                  {/* Save */}

  <div className="flex flex-col gap-5">

    <svg aria-label="Share" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
                {item.save?<FaBookmark onClick={()=>unsaveHandle(item._id)}/>:<FaRegBookmark onClick={()=>saveHandle(item._id)}/>}
                    <svg aria-label="More" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
  </div>
                </div>

              </div>

            </section>
          )
        })
      }

    </div>
  )
}

export default Reelsection